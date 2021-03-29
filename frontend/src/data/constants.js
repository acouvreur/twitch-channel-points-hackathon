/**
 * @type {Object.<string, {displayName: string, params: ?string[]}}
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
  cc: {
    displayName: 'Control Change',
    params: [
      'controller',
      'value',
      'channel',
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

const WEATHER_TYPES = [
  'clear',
  'rain',
  'thunder',
];

export {
  MIDI_MESSAGE_TYPES,
  MINECRAFT_POTION_EFFECTS,
  WEATHER_TYPES,
};
