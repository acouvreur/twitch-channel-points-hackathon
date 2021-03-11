const customRewardsConfigurationService = require('../channel-points/custom-rewards-configuration.service');
const { getApiClient, getTokenInfo } = require('../helpers/utils');

const previous = {
  /** @type {import('twitch').HelixChannel} */
  channelInfo: undefined,
};

/**
 * @param {*} io Socket.io server
 * @param {string} gameName
 */
const onChannelGameNameChanged = async (io, gameName) => {
  await customRewardsConfigurationService.applyGamesConfiguration(gameName);
  if (previous.channelInfo) {
    console.log('[SOCKET] emit GAME_CHANGED');
    io.emit('GAME_CHANGED', { previous: previous.channelInfo.gameName, current: gameName });
  }
};

/**
 * @param {*} io Socket.io server
 */
const poll = async (io) => {
  const tokenInfo = await getTokenInfo();

  /** @type {import('twitch').HelixChannel} */
  const channelInfo = await getApiClient().helix.channels.getChannelInfo(tokenInfo.userId);

  if (!previous.channelInfo || previous.channelInfo.gameName !== channelInfo.gameName) {
    await onChannelGameNameChanged(io, channelInfo.gameName);
  }
  previous.channelInfo = channelInfo;
};

module.exports = {
  poll,
};
