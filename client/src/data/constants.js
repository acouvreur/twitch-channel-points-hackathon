/**
 * @type {Object.<string, {displayName: string, params: string[]}}
 */
const MIDI_MESSAGE_TYPES = {
  noteon: {
    displayName: 'Note On',
    params: [
      'note',
      'velocity',
      'channel',
    ],
  },
  noteoff: {
    displayName: 'Note Off',
    params: [
      'note',
      'velocity',
      'channel',
    ],
  },
  'poly aftertouch': {
    displayName: 'Polyphonic Key Pressure (Aftertouch)',
    params: [
      'note',
      'velocity',
      'channel',
    ],
  },
  cc: {
    displayName: 'Control Change',
    params: [
      'controller',
      'value',
      'channel',
    ],
  },
  program: {
    displayName: 'Program Change',
    params: [
      'number',
      'channel',
    ],
  },
  'channel aftertouch': {
    displayName: 'Channel Pressure (Aftertouch)',
    params: [
      'pressure',
      'channel',
    ],
  },
  pitch: {
    displayName: 'Pitch Bend Change',
    params: [
      'value',
      'channel',
    ],
  },
  position: {
    displayName: 'Song Position Pointer',
    params: [
      'value',
    ],
  },
  mtc: {
    displayName: 'MIDI Time Code Quarter Frame',
    params: [
      'type',
      'value',
    ],
  },
  select: {
    displayName: 'Song Select',
    params: [
      'song',
    ],
  },
  clock: {
    displayName: 'Timing Clock',
    params: [],
  },
  start: {
    displayName: 'Start',
    params: [],
  },
  continue: {
    displayName: 'Continue',
    params: [],
  },
  stop: {
    displayName: 'Stop',
    params: [],
  },
  activesense: {
    displayName: 'Active Sensing',
    params: [],
  },
  reset: {
    displayName: 'Reset',
    params: [],
  },
  sysex: {
    displayName: 'System Exclusive',
    params: [
      'byteArray',
    ],
  },
};

const MINECRAFT_POTION_EFFECTS = [
  'SPEED',
  'SLOWNESS',
  'HASTE',
  'MINING_FATIGUE',
  'STRENGTH',
  'INSTANT_HEALTH',
  'INSTANT_DAMAGE',
  'JUMP_BOOST',
  'NAUSEA',
  'REGENERATION',
  'RESISTANCE',
  'FIRE_RESISTANCE',
  'WATER_BREATHING',
  'INVISIBILITY',
  'BLINDNESS',
  'NIGHT_VISION',
  'HUNGER',
  'WEAKNESS',
  'POISON',
  'WITHER',
  'HEALTH_BOOST',
  'ABSORPTION',
  'SATURATION',
  'GLOWING',
  'LEVITATION',
  'LUCK',
  'UNLUCK',
  'SLOW_FALLING',
  'CONDUIT_POWER',
  'DOLPHINS_GRACE',
  'BAD_OMEN',
  'HERO_OF_THE_VILLAGE',
];

export {
  MIDI_MESSAGE_TYPES,
  MINECRAFT_POTION_EFFECTS,
};
