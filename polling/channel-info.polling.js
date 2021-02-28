const { last } = require('lodash');
const { ApiClient } = require('twitch');

const twitchAuthService = require('../authentication/twitch-auth.service');
const customRewardsConfigurationService = require('../channel-points/custom-rewards-configuration.service');

const cache = {
  apiClient: undefined,
};

/** @type {import('twitch').HelixChannel'} */
const previous = {
  channelInfo: undefined,
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

const onChannelGameNameChanged = async () => {
  // TODO pass channelInfo as parameter to this function
  customRewardsConfigurationService.applyCustomRewardsConfiguration();
};

const poll = async () => {
  const apiClient = getApiClient();

  /** @type {import('twitch-auth').TokenInfo'} */
  const tokenInfo = await apiClient.getTokenInfo();

  /** @type {import('twitch').HelixChannel'} */
  const channelInfo = await apiClient.helix.channels.getChannelInfo(tokenInfo.userId);

  if (!previous.channelInfo || previous.channelInfo.gameName !== channelInfo.gameName) {
    await onChannelGameNameChanged();
  }
  previous.channelInfo = channelInfo;
};

module.exports = {
  poll,
};
