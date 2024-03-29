const pubSubService = require('./pub-sub.service');
const { getCustomRewardsConf } = require('../channel-points/custom-rewards-configuration.service');

const redemptionService = require('../channel-points/redemptions.service');

const { generateMidi } = require('../midi-plugin/midi.plugin.service');
const { applyEffect } = require('../minecraft-plugin/minecraft-plugin.service');
/**
 * @type {{onRedemptionListener: import('twitch-pubsub-client').PubSubListener<never>}}
 */
const cache = {
  onRedemptionListener: undefined,
};

/**
 * @param {import('twitch-pubsub-client').PubSubRedemptionMessage} redemptionMessage
 * @param {import('../channel-points/custom-rewards-configuration.service').CustomRewardConf} rewardConf
 * @param {import('../channel-points/custom-rewards-configuration.service').OnRedemptionConf} onRedemptionConf
 */
const handleRedemption = async (redemptionMessage, rewardConf, onRedemptionConf) => {
  if (onRedemptionConf.plugin === 'midi') {
    try {
      await generateMidi(redemptionMessage, onRedemptionConf.params);
    } catch (error) {
      console.error(`[ERROR] [MIDI Plugin] ${error}`);
    }
  } else if (onRedemptionConf.plugin === 'minecraft') {
    await applyEffect(redemptionMessage, onRedemptionConf.params);
  } else {
    console.log(`${redemptionMessage.userDisplayName} redeemed ${redemptionMessage.rewardName}`);
  }
};

/**
 * @param {import('twitch-pubsub-client').PubSubRedemptionMessage} message
 */
const onRedemptionEventReceived = async (message) => {
  const reward = getCustomRewardsConf().find((r) => r.reward.id === message.rewardId);

  const promises = reward.onRedemption.map(async (onRedemptionConf) => {
    await handleRedemption(message, reward, onRedemptionConf);
  });
  try {
    await Promise.all(promises);
    await redemptionService.fulfillRedemptions(message.rewardId, [message.id]);
  } catch (error) {
    await redemptionService.cancelRedemptions(message.rewardId, [message.id]);
  }
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
  handleRedemption,
  subscribe,
  unsubscribe,
};
