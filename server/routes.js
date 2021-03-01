const router = require('express').Router();
const twitchAuthController = require('../authentication/twitch-auth.controller');
const channelPointsController = require('../channel-points/channel-points.controller');

router.get('/', (_, res) => {
  res.status(200).send(`The app is running on port ${process.env.SERVER_PORT}! If not already, navigate to <a href="/auth">auth</a> to generate app credentials`);
});

router.use('/auth', twitchAuthController);
router.use('/channel-points', channelPointsController);

module.exports = router;
