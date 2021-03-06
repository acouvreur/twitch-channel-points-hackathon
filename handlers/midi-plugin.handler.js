const easymidi = require('easymidi');

const midiOutput = process.env.PLUGIN_MIDI_OUTPUT;

const cache = {
  midiOutput: undefined,
};

const getMidiOutput = () => {
  if (!cache.midiOutput) {
    const midiOutputName = easymidi.getOutputs().find((o) => o.startsWith(midiOutput));
    cache.midiOutput = new easymidi.Output(midiOutputName);
  }
  return cache.midiOutput;
};

/**
 * @param {import('../channel-points/custom-rewards-configuration.service').CustomRewardConf} rewardConf
 */
const handleMidiReward = (rewardConf) => {
  const output = getMidiOutput();
  output.send('noteon', {
    note: 64,
    velocity: 127,
    channel: 0,
  });
};

module.exports = {
  handleMidiReward,
};
