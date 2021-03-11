const got = require('got');
const { MinecraftError } = require('../errors');

const minecraftPluginServerUrl = process.env.PLUGIN_MINECRAFT_SERVER_URL;

const applyPotionEffect = async (redemptionMessage, params) => {
  console.log(`[Minecraft Plugin] Applying effects for redemption [${redemptionMessage.rewardName}] (${redemptionMessage.rewardCost} channel points) redeemed by [${redemptionMessage.userDisplayName}]`);

  console.log('[Minecraft Plugin] Applying Minecraft potion effect');
  try {
    await got.post(`${minecraftPluginServerUrl}/potions`, {
      json: {
        redeemedBy: redemptionMessage.userDisplayName,
        rewardCost: redemptionMessage.rewardCost,
        ...params,
      },
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

const applyWeatherEffect = async (redemptionMessage, params) => {
  console.log(`[Minecraft Plugin] Applying effects for redemption [${redemptionMessage.rewardName}] (${redemptionMessage.rewardCost} channel points) redeemed by [${redemptionMessage.userDisplayName}]`);

  console.log('[Minecraft Plugin] Applying Minecraft weather effect');
  try {
    await got.post(`${minecraftPluginServerUrl}/weather`, {
      json: {
        redeemedBy: redemptionMessage.userDisplayName,
        rewardCost: redemptionMessage.rewardCost,
        ...params,
      },
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

/**
 * @param {import('twitch-pubsub-client').PubSubRedemptionMessage} redemptionMessage
 * @param {object} params
 */
const applyEffect = async (redemptionMessage, params) => {
  if (params.type === 'potion') {
    applyPotionEffect(redemptionMessage, params);
  } else if (params.type === 'weather') {
    applyWeatherEffect(redemptionMessage, params);
  }
};

module.exports = {
  applyEffect,
};
