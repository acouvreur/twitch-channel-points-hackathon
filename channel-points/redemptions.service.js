const apiClient = require('../helpers/utils').getApiClient();
const { getTokenInfo } = require('../helpers/utils');

/**
 * @param {string} rewardId
 * @param {import('twitch').HelixCustomRewardRedemptionStatus} status
 */
const getRedemptions = async (rewardId, status) => {
  const tokenInfo = await getTokenInfo();
  apiClient.helix.channelPoints.getRedemptionsForBroadcaster(
    tokenInfo.userId,
    rewardId,
    status,
    {},
  );
};

/**
 * @param {string} rewardId
 */
const getUnfulfilledRedemptions = async (rewardId) => getRedemptions(rewardId, 'UNFULFILLED');

/**
 * @param {string} rewardId
 */
const getFulfilledRedemptions = async (rewardId) => getRedemptions(rewardId, 'FULFILLED');

/**
 * @param {string} rewardId
 */
const getCanceledRedemptions = async (rewardId) => getRedemptions(rewardId, 'CANCELED');

/**
 *
 * @param {string} rewardId
 * @param {string[]} redemptionIds
 */
const fulfillRedemptions = async (rewardId, redemptionIds) => {
  const tokenInfo = await getTokenInfo();
  apiClient.helix.channelPoints.updateRedemptionStatusByIds(tokenInfo.userId, rewardId, redemptionIds, 'FULFILLED');
};

/**
 *
 * @param {string} rewardId
 * @param {string[]} redemptionIds
 */
const cancelRedemptions = async (rewardId, redemptionIds) => {
  const tokenInfo = await getTokenInfo();
  apiClient.helix.channelPoints.updateRedemptionStatusByIds(tokenInfo.userId, rewardId, redemptionIds, 'CANCELED');
};

module.exports = {
  getRedemptions,
  getUnfulfilledRedemptions,
  getFulfilledRedemptions,
  getCanceledRedemptions,
  fulfillRedemptions,
  cancelRedemptions,
};
