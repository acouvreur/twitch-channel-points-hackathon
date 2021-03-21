const fs = require('fs');
const _ = require('lodash');

const { getApiClient, getTokenInfo } = require('../helpers/utils');
const customRewardsService = require('./custom-rewards.service');
const { BadRequestError } = require('../errors');

const path = require('path');
const CUSTOM_REWARDS_CONF_PATH = path.join(__dirname, '../conf/custom-rewards.json');
const GROUPS_CONF_PATH = path.join(__dirname, '../conf/groups.json');

/**
 * @typedef IsEnabledConf
 * @property {string[]} games
 * @property {string[]} groups
 */

/**
 * @typedef OnRedemptionConf
 * @property {string} plugin
 * @property {Object} params
 */

/**
 * @typedef CustomRewardConf
 * @property {import('twitch').HelixCustomReward} reward
 * @property {IsEnabledConf} isEnabled
 * @property {OnRedemptionConf[]} onRedemption
 */

/**
 * @typedef GroupConf
 * @property {string} group
 * @property {string} description
 * @property {boolean} isEnabled
 */

/**
 * Returns the custom-rewards configuration
 *
 * @returns {CustomRewardConf[]}
 */
const getCustomRewardsConf = () => JSON.parse(fs.readFileSync(CUSTOM_REWARDS_CONF_PATH));

/**
 * Updates the custom-rewards configuration
 *
 * @param {CustomRewardConf[]} customRewardsConf
 */
const updateCustomRewardsConf = (customRewardsConf) => {
  fs.writeFileSync(CUSTOM_REWARDS_CONF_PATH, JSON.stringify(customRewardsConf, null, 2));
};

/**
 * Convert HelixCustomReward to HelixUpdateCustomReward
 *
 * @param {HelixCustomReward} helixCustomReward
 */
const getHelixUpdateCustomRewardData = (helixCustomReward) => ({
  id: helixCustomReward.id,
  title: helixCustomReward.title,
  cost: helixCustomReward.cost,
  autoFulfill: helixCustomReward.autoApproved,
  backgroundColor: helixCustomReward.backgroundColor,
  globalCooldown: helixCustomReward.globalCooldown,
  isEnabled: helixCustomReward.isEnabled,
  maxRedemptionsPerStream: helixCustomReward.maxRedemptionsPerStream,
  maxRedemptionsPerUserPerStream: helixCustomReward.maxRedemptionsPerUserPerStream,
  prompt: helixCustomReward.prompt,
  userInputRequired: helixCustomReward.userInputRequired,
});

/**
 * Updates a given reward conf the custom-rewards configuration
 *
 * @param {import('twitch').HelixUpdateCustomRewardData} customRewardData
 */
const updateCustomRewardConfData = (customRewardData) => {
  if (!customRewardData || !customRewardData.id || !customRewardData.title) {
    throw new BadRequestError('Invalid custom reward data');
  }
  const customRewardsConf = getCustomRewardsConf();
  const existingCrConf = customRewardsConf.find(
    (crConf) => crConf.reward.id === customRewardData.id,
  );

  existingCrConf.reward = customRewardData;

  updateCustomRewardsConf(customRewardsConf);
};

/**
 * @returns {GroupConf[]}
 */
const getGroupsConf = () => JSON.parse(fs.readFileSync(GROUPS_CONF_PATH));

/**
 * Deletes all Custom Rewards on a channel and creates all Custom Rewards based on JSON configuration.
 */
const loadCustomRewards = async () => {
  await customRewardsService.deleteAllCustomRewards();

  const customRewardsConf = getCustomRewardsConf();

  const promises = customRewardsConf.map(async (customRewardConf) => {
    const customReward = await customRewardsService.createCustomReward(customRewardConf.reward);
    console.log(`[LOG] Custom Reward created [${customReward.id}]`);
    // eslint-disable-next-line no-param-reassign
    customRewardConf.reward.id = customReward.id;
  });

  await Promise.all(promises);
  console.log(`[LOG] Saving configuration with updated ids into ${CUSTOM_REWARDS_CONF_PATH}`);
  updateCustomRewardsConf(customRewardsConf);
};

/**
 * Enables or Disables rewards based on isEnabled.groups
 */
const applyGroupsConfiguration = async () => {
  const customRewardsConf = getCustomRewardsConf();
  const groupsConfMap = _.groupBy(getGroupsConf(), 'group');

  const promises = customRewardsConf.map(async (crConf) => {
    let isEnabled = false;

    /** @type {string[]} */
    const customRewardGroups = _.get(crConf, 'isEnabled.groups', []);

    // eslint-disable-next-line no-restricted-syntax
    for (const crGroup of customRewardGroups) {
      if (groupsConfMap[crGroup].isEnabled) {
        isEnabled = true;
        break;
      }
    }

    console.log(`[LOG] Updating Custom Reward [${crConf.reward.id}]: isEnabled=${isEnabled}`);
    const customReward = await customRewardsService.updateCustomReward(crConf.reward.id, {
      isEnabled,
    });
    updateCustomRewardConfData(getHelixUpdateCustomRewardData(customReward));
  });

  return Promise.all(promises);
};

/**
 * Enables or Disables rewards based on isEnabled.games
 *
 * @param {string} [currentGameName]
 */
const applyGamesConfiguration = async (currentGameName) => {
  let gameName = currentGameName;

  if (!gameName) {
    const tokenInfo = await getTokenInfo();
    /** @type {import('twitch').HelixChannel} */
    const channelInfo = await getApiClient().helix.channels.getChannelInfo(tokenInfo.userId);
    gameName = channelInfo.gameName;
  }

  const customRewardsConf = getCustomRewardsConf();

  console.log(`[LOG] Configuring Custom Rewards for game [${gameName}]`);
  const promises = customRewardsConf.map(async (crConf) => {
    /** @type {string[]} */
    const customRewardGames = _.get(crConf, 'isEnabled.games', []);

    if (crConf.reward.id && customRewardGames.length) {
      const isEnabled = customRewardGames.includes(gameName);
      console.log(`[LOG] Updating Custom Reward [${crConf.reward.id}]: isEnabled=${isEnabled}`);
      const customReward = await customRewardsService.updateCustomReward(crConf.reward.id, {
        isEnabled,
      });
      updateCustomRewardConfData(getHelixUpdateCustomRewardData(customReward));
    }
  });

  return Promise.all(promises);
};

/**
 * Gets all custom rewards from Twitch and updates the custom
 * rewards configuration according to actual list from Twitch.
 *
 * This method should be called at server startup
 */
const synchronize = async () => {
  const customRewardsConf = getCustomRewardsConf();
  const customRewards = await customRewardsService.getCustomRewards();

  /** @type CustomRewardConf[] */
  const newCustomRewardsConf = [];

  customRewards.forEach((customReward) => {
    const crConf = customRewardsConf.find((cr) => cr.reward.id === customReward.id);
    newCustomRewardsConf.push({
      reward: getHelixUpdateCustomRewardData(customReward),
      isEnabled: _.get(crConf, 'isEnabled', { games: [], groups: [] }),
      onRedemption: _.get(crConf, 'onRedemption', []),
    });
  });

  updateCustomRewardsConf(newCustomRewardsConf);
};

module.exports = {
  synchronize,
  getHelixUpdateCustomRewardData,
  getCustomRewardsConf,
  updateCustomRewardsConf,
  updateCustomRewardConfData,
  getGroupsConf,
  loadCustomRewards,
  applyGroupsConfiguration,
  applyGamesConfiguration,
};
