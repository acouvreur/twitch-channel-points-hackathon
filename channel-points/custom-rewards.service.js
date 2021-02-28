const { ApiClient } = require('twitch');
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
 * @param {import('twitch').HelixCreateCustomRewardData} customRewardData The reward data
 * @returns {Promise<import('twitch').HelixCustomReward>}
 */
const createCustomReward = async (customRewardData) => {
  const apiClient = getApiClient();

  /** @type {import('twitch-auth').TokenInfo'} */
  const tokenInfo = await apiClient.getTokenInfo();

  return apiClient.helix.channelPoints.createCustomReward(
    tokenInfo.userId,
    customRewardData,
  );
};

/**
 * Updates a Custom Reward on a channel.
 *
 * @param {string} customRewardId The ID of the reward
 * @param {import('twitch').HelixUpdateCustomRewardData} customRewardData The reward data
 * @returns {Promise<import('twitch').HelixCustomReward>}
 */
const updateCustomReward = async (customRewardId, customRewardData) => {
  const apiClient = getApiClient();

  /** @type {import('twitch-auth').TokenInfo'} */
  const tokenInfo = await apiClient.getTokenInfo();

  return apiClient.helix.channelPoints.updateCustomReward(
    tokenInfo.userId,
    customRewardId,
    customRewardData,
  );
};

/**
 * Deletes a Custom Reward on a channel.
 *
 * @param {string} customRewardId The ID of the reward.
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
 * Deletes all Custom Rewards on a channel.
 *
 * @param {string} customRewardId The ID of the reward.
 */
const deleteAllCustomRewards = async () => {
  const customRewards = await getCustomRewards();
  await Promise.all(customRewards.map(async (customReward) => {
    console.log(`[LOG] deleting custom reward [${customReward.id}]`);
    await deleteCustomReward(customReward.id);
  }));
};

module.exports = {
  getCustomRewards,
  createCustomReward,
  updateCustomReward,
  deleteCustomReward,
  deleteAllCustomRewards,
};
