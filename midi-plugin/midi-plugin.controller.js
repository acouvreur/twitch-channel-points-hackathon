const router = require('express').Router();
const midiPluginService = require('./midi.plugin.service');

router.post('/midi', async (req, res) => {
  console.log('[HTTP] POST /plugins/midi');
  // TODO get rewardId
  midiPluginService.sendMidiSignal();
  res.status(200).send('All Custom Rewards were deleted and created again following custom-rewards.json configuration!');
});

module.exports = router;
