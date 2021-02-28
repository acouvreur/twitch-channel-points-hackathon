const pubSubService = require('./pub-sub.service');

/**
 * @type {{onRedemptionListener: import('twitch-pubsub-client').PubSubListener<never>}}
 */
const cache = {
  onRedemptionListener: undefined,
};

/**
 * @param {import('twitch-pubsub-client').PubSubRedemptionMessage} message
 */
const onRedemptionEventReceived = async (message) => {
  console.log(`${message.userDisplayName} redeemed ${message.rewardName}`);
};

const unsubscribe = async () => {
  if (cache.onRedemptionListener) {
    await cache.onRedemptionListener.remove();
    cache.onRedemptionListener = undefined;
  }
};

const subscribe = async () => {
  if (cache.onRedemptionListener) {
    await unsubscribe();
  }

  const pubSubClient = await pubSubService.getPubSubClient();

  cache.onRedemptionListener = await pubSubClient.onRedemption(
    await pubSubService.getUserId(),
    onRedemptionEventReceived,
  );
};

module.exports = {
  subscribe,
  unsubscribe,
};
