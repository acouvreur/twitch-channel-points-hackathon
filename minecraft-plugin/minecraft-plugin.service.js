const got = require('got');

const minecraftPluginServerUrl = process.env.PLUGIN_MINECRAFT_SERVER_URL;

/**
 * @param {import('twitch-pubsub-client').PubSubRedemptionMessage} redemptionMessage
 * @param {object} params
 */
const applyEffect = async (redemptionMessage, params) => {
  console.log(`[Minecraft Plugin] Applying effects for redemption [${redemptionMessage.rewardName}] (${redemptionMessage.rewardCost} channel points) redeemed by [${redemptionMessage.userDisplayName}]`);

  console.log('[Minecraft Plugin] Applying Minecraft potion effect');
  await got.post(`${minecraftPluginServerUrl}/potions`, {
    json: params,
    responseType: 'json',
  });
};

module.exports = {
  applyEffect,
};
