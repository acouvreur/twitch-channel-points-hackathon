const { ApiClient } = require('twitch');
const { PubSubClient } = require('twitch-pubsub-client');
const twitchAuthService = require('../authentication/twitch-auth.service');

/**
 * @type {{apiClient: ApiClient, pubSubClient: PubSubClient}}
 */
const cache = {
  apiClient: undefined,
  pubSubClient: undefined,
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
 * @returns {Promise<PubSubClient>}
 */
const getPubSubClient = async () => {
  if (!cache.pubSubClient) {
    cache.pubSubClient = new PubSubClient();
    await cache.pubSubClient.registerUserListener(getApiClient());
  }
  return cache.pubSubClient;
};

/**
 * @returns {Promise<string>}
 */
const getUserId = async () => {
  const apiClient = getApiClient();

  /** @type {import('twitch-auth').TokenInfo} */
  const tokenInfo = await apiClient.getTokenInfo();

  return tokenInfo.userId;
};

module.exports = {
  getPubSubClient,
  getUserId,
};
