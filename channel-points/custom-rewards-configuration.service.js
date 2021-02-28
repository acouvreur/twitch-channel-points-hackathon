const fs = require('fs');
const { ApiClient } = require('twitch');

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
  console.log(`[LOG] Saving configuration with updated ids into ${CUSTOM_REWARDS_CONF_PATH}`);
  fs.writeFileSync(CUSTOM_REWARDS_CONF_PATH, JSON.stringify(customRewardsConf, null, 2));
};

/**
 * Updates all Custom Rewards on a channel with expected configuration for current game.
 */
const applyCustomRewardsConfiguration = async () => {
  const apiClient = getApiClient();
  const customRewardsConf = JSON.parse(fs.readFileSync(CUSTOM_REWARDS_CONF_PATH));

  /** @type {import('twitch-auth').TokenInfo'} */
  const tokenInfo = await apiClient.getTokenInfo();
  /** @type {import('twitch').HelixChannel'} */
  const channelInfo = await apiClient.helix.channels.getChannelInfo(tokenInfo.userId);

  console.log(`[LOG] Configuring Custom Rewards for game [${channelInfo.gameName}]`);
  const promises = customRewardsConf.map(async (customRewardConf) => {
    if (customRewardConf.reward.id && customRewardConf.games) {
      if (customRewardConf.games.includes(channelInfo.gameName)) {
        console.log(`[LOG] Enabling Custom Reward [${customRewardConf.reward.id}]`);
        await customRewardsService.updateCustomReward(customRewardConf.reward.id, {
          isEnabled: true,
        });
      } else {
        console.log(`[LOG] Disabling Custom Reward [${customRewardConf.reward.id}]`);
        await customRewardsService.updateCustomReward(customRewardConf.reward.id, {
          isEnabled: false,
        });
      }
    }
  });

  return Promise.all(promises);
};

module.exports = {
  loadCustomRewards,
  applyCustomRewardsConfiguration,
};
