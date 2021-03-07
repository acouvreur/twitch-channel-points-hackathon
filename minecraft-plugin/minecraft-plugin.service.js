const got = require('got');

const minecraftPluginServerUrl = process.env.PLUGIN_MINECRAFT_SERVER_URL;

/**
 * @param {object} params
 */
const applyPotionEffect = async (params) => {
  console.log('[INFO] apply minecraft potion effect');
  await got.post(`${minecraftPluginServerUrl}/potions`, {
    json: params,
    responseType: 'json',
  });
};

module.exports = {
  applyPotionEffect,
};
