const got = require('got');

/**
 * @param {import('../channel-points/custom-rewards-configuration.service').CustomRewardConf} reward
 */
const handleMinecraftReward = async (reward) => {
  console.log('[INFO] apply minecraft potion effect');
  await got.post('http://localhost:8001/potions', {
    json: reward.onRedemption.params,
    responseType: 'json',
  });
};

module.exports = {
  handleMinecraftReward,
};
