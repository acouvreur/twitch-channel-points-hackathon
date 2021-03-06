const { PubSubClient } = require('twitch-pubsub-client');

const apiClient = require('../helpers/utils').getApiClient();
const { getTokenInfo } = require('../helpers/utils');

/**
 * @type {{apiClient: ApiClient, pubSubClient: PubSubClient}}
 */
const cache = {
  pubSubClient: undefined,
};

/**
 * @returns {Promise<PubSubClient>}
 */
const getPubSubClient = async () => {
  if (!cache.pubSubClient) {
    cache.pubSubClient = new PubSubClient();
    await cache.pubSubClient.registerUserListener(apiClient);
  }
  return cache.pubSubClient;
};

/**
 * @returns {Promise<string>}
 */
const getUserId = async () => {
  const tokenInfo = await getTokenInfo();

  return tokenInfo.userId;
};

module.exports = {
  getPubSubClient,
  getUserId,
};
