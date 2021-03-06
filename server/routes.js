const express = require('express');
const path = require('path');
const twitchAuthController = require('../authentication/twitch-auth.controller');
const channelPointsController = require('../channel-points/channel-points.controller');

const router = express.Router();

router.use('/', express.static(path.join(process.cwd(), 'client', 'build')));
router.use('/auth', twitchAuthController);
router.use('/channel-points', channelPointsController);

module.exports = router;
