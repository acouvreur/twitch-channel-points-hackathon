const router = require('express').Router();
const _ = require('lodash');

const customRewardsService = require('./custom-rewards.service');
const redemptionsService = require('./redemptions.service');
const customRewardsConfigurationService = require('./custom-rewards-configuration.service');

const REDEMPTION_STATUSES = ['FULFILLED', 'UNFULFILLED', 'CANCELED'];

router.get('/custom-rewards', async (req, res) => {
  console.log('[HTTP] GET /channel-points/custom-rewards');
  const customRewards = await customRewardsService.getCustomRewards();
  // eslint-disable-next-line no-underscore-dangle
  res.status(200).json(customRewards.map((r) => r._data));
});

router.put('/custom-rewards/:customRewardId', async (req, res) => {
  /** @type {import('twitch').HelixUpdateCustomRewardData} */
  const customRewardData = req.body;
  const customReward = await customRewardsService.updateCustomReward(
    req.params.customRewardId,
    customRewardData,
  );
  // eslint-disable-next-line no-underscore-dangle
  return res.status(200).json(customReward._data);
});

router.get('/custom-rewards/:customRewardId/redemptions', async (req, res) => {
  console.log('[HTTP] GET /channel-points/custom-rewards/:customRewardId/redemptions');

  const status = _.get(req.query, 'status', 'UNFULFILLED');
  if (!REDEMPTION_STATUSES.includes(status)) {
    return res.status(400).send(`Bad status query parameter: value must be among ${REDEMPTION_STATUSES}`);
  }

  const redemptions = await redemptionsService.getRedemptions(req.params.customRewardId, status);
  return res.status(200).send(redemptions);
});

router.get('/custom-rewards-configuration', async (req, res) => {
  console.log('[HTTP] GET /channel-points/custom-rewards-configuration');
  res.status(200).json(customRewardsConfigurationService.getCustomRewardsConf());
});

router.put('/custom-rewards-configuration', async (req, res) => {
  console.log('[HTTP] PUT /channel-points/custom-rewards-configuration');
  customRewardsConfigurationService.updateCustomRewardsConf(req.body);
  res.status(200).send('Custom Rewards Configuration updated!');
});

router.post('/custom-rewards-configuration/load', async (req, res) => {
  console.log('[HTTP] POST /channel-points/custom-rewards-configuration/load');
  await customRewardsConfigurationService.loadCustomRewards();
  res.status(200).send('All Custom Rewards were deleted and created again following custom-rewards.json configuration!');
});

router.post('/custom-rewards-configuration/apply-groups', async (req, res) => {
  console.log('[HTTP] POST /channel-points/custom-rewards-configuration/apply-groups');
  await customRewardsConfigurationService.applyActionsConfiguration();
  res.status(200).send('Custom Rewards updated!');
});

router.post('/custom-rewards-configuration/apply-games', async (req, res) => {
  console.log('[HTTP] POST /channel-points/custom-rewards-configuration/apply-games');
  await customRewardsConfigurationService.applyGamesConfiguration(req.query.gameName);
  res.status(200).send('Custom Rewards updated!');
});

module.exports = router;
