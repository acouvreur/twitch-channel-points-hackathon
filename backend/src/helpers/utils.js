const { ApiClient } = require('twitch');
const twitchAuthService = require('../authentication/twitch-auth.service');

const cache = {
  apiClient: undefined,
  tokenInfo: undefined,
};

/**
 * @returns {import('twitch').ApiClient}
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
 * @param {import('twitch').ApiClient} apiClient
 * @returns {Promise<import('twitch-auth').TokenInfo>}
 */
const getTokenInfo = async () => {
  if (!cache.tokenInfo) {
    cache.tokenInfo = await getApiClient().getTokenInfo();
  }
  return cache.tokenInfo;
};

module.exports = {
  cache,
  getApiClient,
  getTokenInfo,
};
