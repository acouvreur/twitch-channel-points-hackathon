const pubSubService = require('./pub-sub.service');
const { getCustomRewardsConf } = require('../channel-points/custom-rewards-configuration.service');
const { handleMinecraftReward } = require('../handlers/minecraft-plugin.handler');
/**
 * @type {{onRedemptionListener: import('twitch-pubsub-client').PubSubListener<never>}}
 */
const cache = {
  onRedemptionListener: undefined,
};

/**
 * @param {import('../channel-points/custom-rewards-configuration.service').CustomRewardConf} reward
 * @param {import('../channel-points/custom-rewards-configuration.service').OnRedemptionConf} onRedemption
 */
const handleRedemption = (reward, onRedemption) => {
  if (onRedemption.plugin === 'minecraft') {
    handleMinecraftReward(reward);
  } else {
    console.log(`${reward.userDisplayName} redeemed ${reward.rewardName}`);
  }
};

/**
 * @param {import('twitch-pubsub-client').PubSubRedemptionMessage} message
 */
const onRedemptionEventReceived = async (message) => {
  const reward = getCustomRewardsConf().find((r) => r.reward.title === message.rewardName);

  reward.onRedemption.forEach((onRedemption) => {
    handleRedemption(reward, onRedemption);
  });
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
