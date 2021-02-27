const router = require('express').Router();
const twitchAuthController = require('../authentication/twitch-auth.controller');

router.get('/', (req, res) => {
  res.status(200).send('The app is running! If not already, navigate to <a href="/auth">auth</a> to generate app credentials.');
});

router.use('/auth', twitchAuthController);

module.exports = router;
