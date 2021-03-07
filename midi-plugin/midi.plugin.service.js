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

// TODO handle windows and UNIX
/**
 * @returns {import('easymidi').Output}
 */
const getMidiOutput = () => {
  if (!cache.midiOutput) {
    const name = easymidi.getOutputs().find((o) => o.startsWith(midiOutputName));
    cache.midiOutput = new easymidi.Output(name);
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
