const fs = require('fs');
const { ApiClient } = require('twitch');
const _ = require('lodash');

const customRewardsService = require('./custom-rewards.service');
const twitchAuthService = require('../authentication/twitch-auth.service');

const CUSTOM_REWARDS_CONF_PATH = 'conf/custom-rewards.json';

const cache = {
  apiClient: undefined,
};

/**
 * @returns {ApiClient}
 */
const getApiClient = () => {
  if (!cache.apiClient) {
    cache.apiClient = new ApiClient({
      authProvider: twitchAuthService.getRefreshableAuthProvider(),
    });
  }
  return cache.apiClient;
};

/**
 * Deletes all Custom Rewards on a channel and creates all Custom Rewards based on JSON configuration.
 */
const loadCustomRewards = async () => {
  await customRewardsService.deleteAllCustomRewards();

  // eslint-disable-next-line max-len
  const customRewardsConf = JSON.parse(fs.readFileSync(CUSTOM_REWARDS_CONF_PATH));

  const promises = customRewardsConf.map(async (customRewardConf) => {
    const customReward = await customRewardsService.createCustomReward(customRewardConf.reward);
    console.log(`[LOG] Custom Reward created [${customReward.id}]`);
    // eslint-disable-next-line no-param-reassign
    customRewardConf.reward.id = customReward.id;
  });

  await Promise.all(promises);
  console.log(`[LOG] Saving configuration with updated ids into ${CUSTOM_REWARDS_CONF_PATH}...`);
  fs.writeFileSync(CUSTOM_REWARDS_CONF_PATH, JSON.stringify(customRewardsConf, null, 2));
  console.log('[LOG] Configuration saved');
};

/**
 * Updates all Custom Rewards on a channel with expected configuration for current game.
 */
const applyCustomRewardsConfiguration = async () => {
  const apiClient = getApiClient();
  const customRewardsConf = JSON.parse(fs.readFileSync(CUSTOM_REWARDS_CONF_PATH));

  // TODO update custom rewards with current game
  /** @type {import('twitch-auth').TokenInfo'} */
  const tokenInfo = await apiClient.getTokenInfo();
  /** @type {import('twitch').HelixChannel'} */
  const channelInfo = await apiClient.helix.channels.getChannelInfo(
    tokenInfo.userId,
  );
  customRewardsConf.forEach((customRewardConf) => {
    if (customRewardConf.games.includes(channelInfo.gameName)) {
      // updateCustomReward()
    }
  });
};

module.exports = {
  loadCustomRewards,
  applyCustomRewardsConfiguration,
};
