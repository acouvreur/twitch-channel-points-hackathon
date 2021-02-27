const {
  ApiClient,
  HelixCreateCustomRewardData,
} = require('twitch');
const twitchAuthService = require('../authentication/twitch-auth.service');

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
 * Returns a list of Custom Reward objects for the Custom Rewards on a channel.
 *
 * @returns {Promise<import('twitch').HelixCustomReward[]>}
 */
const getCustomRewards = async () => {
  const apiClient = getApiClient();

  /** @type {import('twitch-auth').TokenInfo'} */
  const tokenInfo = await apiClient.getTokenInfo();

  return apiClient.helix.channelPoints.getCustomRewards(tokenInfo.userId);
};

/**
 * Creates a Custom Reward on a channel.
 *
 * @param {import('twitch').HelixCreateCustomRewardData} customReward
 */
const createCustomReward = async (customReward) => {
  const apiClient = getApiClient();

  /** @type {import('twitch-auth').TokenInfo'} */
  const tokenInfo = await apiClient.getTokenInfo();

  return apiClient.helix.channelPoints.createCustomReward(
    tokenInfo.userId,
    customReward,
  );
};

/**
 * Deletes a Custom Reward on a channel.
 *
 * @param {string} customRewardId
 */
const deleteCustomReward = async (customRewardId) => {
  const apiClient = getApiClient();

  /** @type {import('twitch-auth').TokenInfo'} */
  const tokenInfo = await apiClient.getTokenInfo();

  apiClient.helix.channelPoints.deleteCustomReward(
    tokenInfo.userId,
    customRewardId,
  );
};

/**
 * Do Magic
 *
 */
const magic = async () => {
  // const apiClient = getApiClient();

  /** @type {HelixCreateCustomRewardData} */
  const customReward = {
    title: 'This is a test',
    cost: 100,
    autoFulfill: false,
    backgroundColor: '#e71cf5',
    globalCooldown: 5,
    isEnabled: true,
    maxRedemptionsPerStream: 0,
    maxRedemptionsPerUserPerStream: 0,
    prompt: 'Bravo guy!',
    userInputRequired: false,
  };

  return createCustomReward(customReward);
};

module.exports = {
  getCustomRewards,
  createCustomReward,
  deleteCustomReward,
  magic,
};
