const router = require('express').Router();
const twitchAuthService = require('./twitch-auth.service');

router.get('/', async (req, res) => {
  console.log('[HTTP] GET /auth redirecting to twitch authorization URL...');
  res.redirect(twitchAuthService.TWITCH_AUTHORIZE_URL);
});

router.get('/callback', async (req, res, next) => {
  console.log('[HTTP] GET /auth/callback');
  console.log('[LOG] generating token.json (DO NOT SHARE IT)...');

  try {
    await twitchAuthService.generateTokenFile(req.query.code);
  } catch (err) {
    return next(err);
  }

  console.log('[LOG] Success!');
  return res.status(200).send('<h1>Success!</h1><p>You can close this tab now.</p>');
});

module.exports = router;
