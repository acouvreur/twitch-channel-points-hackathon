const customRewardsConfigurationService = require('../channel-points/custom-rewards-configuration.service');
const apiClient = require('../helpers/utils').getApiClient();
const { getTokenInfo } = require('../helpers/utils');

const previous = {
  /** @type {import('twitch').HelixChannel} */
  channelInfo: undefined,
};

/**
 * @param {string} gameName
 */
const onChannelGameNameChanged = async (gameName) => {
  customRewardsConfigurationService.applyGamesConfiguration(gameName);
};

const poll = async () => {
  const tokenInfo = await getTokenInfo();

  /** @type {import('twitch').HelixChannel} */
  const channelInfo = await apiClient.helix.channels.getChannelInfo(tokenInfo.userId);

  if (!previous.channelInfo || previous.channelInfo.gameName !== channelInfo.gameName) {
    await onChannelGameNameChanged(channelInfo.gameName);
  }
  previous.channelInfo = channelInfo;
};

module.exports = {
  poll,
};
