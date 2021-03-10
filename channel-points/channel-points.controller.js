const router = require('express').Router();
const _ = require('lodash');

const customRewardsService = require('./custom-rewards.service');
const redemptionsService = require('./redemptions.service');
const customRewardsConfigurationService = require('./custom-rewards-configuration.service');

const REDEMPTION_STATUSES = ['FULFILLED', 'UNFULFILLED', 'CANCELED'];

router.get('/custom-rewards', async (req, res, next) => {
  console.log('[HTTP] GET /channel-points/custom-rewards');
  let customRewards = [];
  try {
    customRewards = await customRewardsService.getCustomRewards();
  } catch (err) {
    return next(err);
  }
  // eslint-disable-next-line no-underscore-dangle
  return res.status(200).json(customRewards.map((r) => r._data));
});

router.put('/custom-rewards/:customRewardId', async (req, res, next) => {
  console.log(`[HTTP] PUT /channel-points/custom-rewards/${req.params.customRewardId}`);
  /** @type {import('twitch').HelixUpdateCustomRewardData} */
  const customRewardData = req.body;
  let customReward = null;
  try {
    customReward = await customRewardsService.updateCustomReward(
      req.params.customRewardId,
      customRewardData,
    );
  } catch (err) {
    return next(err);
  }
  // eslint-disable-next-line no-underscore-dangle
  return res.status(200).json(customReward._data);
});

router.get('/custom-rewards/:customRewardId/redemptions', async (req, res, next) => {
  console.log('[HTTP] GET /channel-points/custom-rewards/:customRewardId/redemptions');

  const status = _.get(req.query, 'status', 'UNFULFILLED');
  if (!REDEMPTION_STATUSES.includes(status)) {
    return res.status(400).send(`Bad status query parameter: value must be among ${REDEMPTION_STATUSES}`);
  }
  let redemptions = [];
  try {
    redemptions = await redemptionsService.getRedemptions(req.params.customRewardId, status);
  } catch (err) {
    return next(err);
  }
  return res.status(200).send(redemptions);
});

router.get('/custom-rewards-configuration', async (req, res, next) => {
  console.log('[HTTP] GET /channel-points/custom-rewards-configuration');
  let customRewardsConf = [];
  try {
    customRewardsConf = customRewardsConfigurationService.getCustomRewardsConf();
  } catch (err) {
    return next(err);
  }
  return res.status(200).json(customRewardsConf);
});

router.put('/custom-rewards-configuration', async (req, res, next) => {
  console.log('[HTTP] PUT /channel-points/custom-rewards-configuration');
  try {
    customRewardsConfigurationService.updateCustomRewardsConf(req.body);
  } catch (err) {
    return next(err);
  }
  return res.status(200).send('Custom Rewards Configuration updated!');
});

router.post('/custom-rewards-configuration/load', async (req, res, next) => {
  console.log('[HTTP] POST /channel-points/custom-rewards-configuration/load');
  try {
    await customRewardsConfigurationService.loadCustomRewards();
  } catch (err) {
    return next(err);
  }
  return res.status(200).send('All Custom Rewards were deleted and created again following custom-rewards.json configuration!');
});

router.post('/custom-rewards-configuration/apply-groups', async (req, res, next) => {
  console.log('[HTTP] POST /channel-points/custom-rewards-configuration/apply-groups');
  try {
    await customRewardsConfigurationService.applyGroupsConfiguration();
  } catch (err) {
    return next(err);
  }
  return res.status(200).send('Custom Rewards updated!');
});

router.post('/custom-rewards-configuration/apply-games', async (req, res, next) => {
  console.log('[HTTP] POST /channel-points/custom-rewards-configuration/apply-games');
  try {
    await customRewardsConfigurationService.applyGamesConfiguration(req.query.gameName);
  } catch (err) {
    return next(err);
  }
  return res.status(200).send('Custom Rewards updated!');
});

module.exports = router;
