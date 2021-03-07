const easymidi = require('easymidi');

const midiOutputName = process.env.PLUGIN_MIDI_OUTPUT;

const cache = {
  midiOutput: undefined,
};

/**
 * @typedef MidiPluginParams
 * @property {MidiPluginParamOutput[]} outputs
 */

/**
 * @typedef MidiPluginParamOutput
 * @property {string} type
 * @property {object} value
 */

/**
 * @typedef Note
 * @property {number} note
 * @property {number} velocity
 * @property {number} channel 0 to 15
 */

/**
 * @typedef ControlChange
 * @property {number} controller
 * @property {number} value
 * @property {number} channel 0 to 15
 */

/**
 * @returns {import('easymidi').Output}
 */
const getMidiOutput = () => {
  const isWindows = process.platform === 'win32';

  if (!cache.midiOutput) {
    if (isWindows) {
      // Search for LoopMidi output
      const name = easymidi.getOutputs().find((o) => o.startsWith(midiOutputName));
      cache.midiOutput = new easymidi.Output(name);
    } else {
      cache.midiOutput = new easymidi.Output(midiOutputName, true);
    }
  }
  return cache.midiOutput;
};

/**
 * @param {Note} value
 */
const sendMidiNoteon = async (value) => {
  const midiOutput = getMidiOutput();
  midiOutput.send('noteon', value);
};

/**
 * @param {ControlChange} value
 */
const sendMidiCC = async (value) => {
  const midiOutput = getMidiOutput();
  midiOutput.send('cc', value);
};

/**
 * @param {import('twitch-pubsub-client').PubSubRedemptionMessage} redemptionMessage
 * @param {MidiPluginParams} params
 */
const generateMidi = async (redemptionMessage, params) => {
  console.log(`[MIDI Plugin] Generating MIDI signals for redemption [${redemptionMessage.rewardName}] (${redemptionMessage.rewardCost} channel points) redeemed by [${redemptionMessage.userDisplayName}]`);
  const promises = params.outputs.map(async (output) => {
    if (output.type === 'noteon') {
      sendMidiNoteon(output.value);
    } else if (output.type === 'cc') {
      sendMidiCC(output.value);
    }
  });
  return Promise.all(promises);
};

module.exports = {
  generateMidi,
};
