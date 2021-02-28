const router = require('express').Router();
const customRewardsService = require('./custom-rewards.service');
const customRewardsConfiguration = require('./custom-rewards-configuration.service');

router.get('/custom-rewards', async (_, res) => {
  console.log('[HTTP] GET /channel-points/custom-rewards');

  const customRewards = await customRewardsService.getCustomRewards();

  // eslint-disable-next-line no-underscore-dangle
  res.status(200).json(customRewards.map((r) => r._data));
});

router.get('/configuration', async (_, res) => {
  customRewardsConfiguration.loadCustomRewards();
  res.status(200).send('All Custom Rewards were deleted and created again following custom-rewards.json configuration.');
});

module.exports = router;
