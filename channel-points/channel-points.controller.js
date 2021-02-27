const router = require('express').Router();
const channelPointsService = require('./channel-points.service');

router.get('/', async (_, res) => {
  console.log('[HTTP] GET /channel-points');

  const customRewards = await channelPointsService.getCustomRewards();

  res.status(200).json(customRewards.map((r) => r._data));
});

module.exports = router;
