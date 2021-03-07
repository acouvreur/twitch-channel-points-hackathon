const { getApiClient, getTokenInfo } = require('../helpers/utils');

/**
 * Returns a list of Custom Reward objects for the Custom Rewards on a channel.
 *
 * @returns {Promise<import('twitch').HelixCustomReward[]>}
 */
const getCustomRewards = async () => {
  const tokenInfo = await getTokenInfo();

  return getApiClient().helix.channelPoints.getCustomRewards(tokenInfo.userId);
};

/**
 * Creates a Custom Reward on a channel.
 *
 * @param {import('twitch').HelixCreateCustomRewardData} customRewardData The reward data
 * @returns {Promise<import('twitch').HelixCustomReward>}
 */
const createCustomReward = async (customRewardData) => {
  const tokenInfo = await getTokenInfo();

  return getApiClient().helix.channelPoints.createCustomReward(
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
  /** @type {import('twitch-auth').TokenInfo'} */
  const tokenInfo = await getTokenInfo();

  return getApiClient().helix.channelPoints.updateCustomReward(
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
  const tokenInfo = await getTokenInfo();

  return getApiClient().helix.channelPoints.deleteCustomReward(
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
  return Promise.all(customRewards.map(async (customReward) => {
    console.log(`[LOG] deleting custom reward [${customReward.id}]`);
    await deleteCustomReward(customReward.id);
  }));
};

/**
 * Disables all rewards on a channel.
 */
const disableAllRewards = async () => {
  const customRewards = await getCustomRewards();
  return Promise.all(customRewards.map(async (customReward) => {
    console.log(`[LOG] deleting custom reward [${customReward.id}]`);
    await updateCustomReward(customReward.id, {
      isEnabled: false,
    });
  }));
};

module.exports = {
  getCustomRewards,
  createCustomReward,
  updateCustomReward,
  deleteCustomReward,
  deleteAllCustomRewards,
  disableAllRewards,
};
