const got = require('got');

const minecraftPluginServerUrl = process.env.PLUGIN_MINECRAFT_SERVER_URL;

/**
 * @param {import('../channel-points/custom-rewards-configuration.service').CustomRewardConf} rewardConf
 */
const handleMinecraftReward = async (rewardConf) => {
  console.log('[INFO] apply minecraft potion effect');
  await got.post(`${minecraftPluginServerUrl}/potions`, {
    json: rewardConf.onRedemption.params,
    responseType: 'json',
  });
};

module.exports = {
  handleMinecraftReward,
};
