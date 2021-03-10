const got = require('got');
const { MinecraftError } = require('../errors');

const minecraftPluginServerUrl = process.env.PLUGIN_MINECRAFT_SERVER_URL;

/**
 * @param {import('twitch-pubsub-client').PubSubRedemptionMessage} redemptionMessage
 * @param {object} params
 */
const applyEffect = async (redemptionMessage, params) => {
  console.log(`[Minecraft Plugin] Applying effects for redemption [${redemptionMessage.rewardName}] (${redemptionMessage.rewardCost} channel points) redeemed by [${redemptionMessage.userDisplayName}]`);

  console.log('[Minecraft Plugin] Applying Minecraft potion effect');
  try {
    await got.post(`${minecraftPluginServerUrl}/potions`, {
      json: params,
      responseType: 'json',
    });
  } catch (err) {
    console.error(`[Minecraft Plugin] ${err.message}`);
    let { message } = err;
    if (err.code === 'ECONNREFUSED') {
      message = 'Could not contact Minecraft client.';
    }
    throw new MinecraftError(message);
  }
};

module.exports = {
  applyEffect,
};
