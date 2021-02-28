const router = require('express').Router();
const customRewardsService = require('./custom-rewards.service');
const customRewardsConfiguration = require('./custom-rewards-configuration.service');

router.get('/custom-rewards', async (_, res) => {
  console.log('[HTTP] GET /channel-points/custom-rewards');

  const customRewards = await customRewardsService.getCustomRewards();

  // eslint-disable-next-line no-underscore-dangle
  res.status(200).json(customRewards.map((r) => r._data));
});

router.get('/custom-rewards-configuration/load', async (_, res) => {
  console.log('[HTTP] GET /channel-points/custom-rewards-configuration/load');
  await customRewardsConfiguration.loadCustomRewards();
  res.status(200).send('All Custom Rewards were deleted and created again following custom-rewards.json configuration!');
});

router.get('/custom-rewards-configuration/apply', async (_, res) => {
  console.log('[HTTP] GET /channel-points/custom-rewards-configuration/apply');
  await customRewardsConfiguration.applyCustomRewardsConfiguration();
  res.status(200).send('Custom Rewards updated!');
});

module.exports = router;
