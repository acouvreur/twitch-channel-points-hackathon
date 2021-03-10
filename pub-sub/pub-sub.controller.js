const router = require('express').Router();
const redemptionEventHandler = require('./redemption-event.handler');

/**
 * POST body is of type CustomRewardConf
 */
router.post('/test/redemption', async (req, res, next) => {
  console.log('[HTTP] POST /pub-sub/test/redemption');

  const rewardConf = req.body;
  const { reward } = rewardConf;

  /** @type {import('twitch-pubsub-client').PubSubRedemptionMessage} */
  const redemptionMessage = {
    channelId: 'test',
    rewardId: reward.id,
    rewardCost: reward.cost,
    id: 'test',
    rewardName: 'test',
    rewardPrompt: 'test',
    message: 'test',
    redemptionDate: new Date(),
    userId: 'test',
    userName: 'test',
    userDisplayName: 'test',
    status: 'UNFULFILLED',
  };

  const promises = rewardConf.onRedemption.map(async (onRedemptionConf) => {
    console.log(`[LOG] Simulating onRedemption for rewardId=${reward.id} plugin=${onRedemptionConf.plugin}`);
    return redemptionEventHandler.handleRedemption(redemptionMessage, rewardConf, onRedemptionConf);
  });

  try {
    await Promise.all(promises);
    return res.status(200).send('All onRedemption effect were applied!');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
