import React from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { MIDI_MESSAGE_TYPES } from '../data/constants';

const MidiRedemptionAction = ({ action, onChange }) => {
  const onSelectMessageType = (event, value) => {
    onChange({ ...action, params: { ...action.params, effect: value } });
  };

  return (
    <>
      <Select
        labelId="redemption-type-label"
        id="redemption-type-select"
        value={action?.params?.effect || Object.keys(MIDI_MESSAGE_TYPES)[0]}
        onChange={onSelectMessageType}
      >
        {Object.entries(MIDI_MESSAGE_TYPES).map(([type, config]) => (
          <MenuItem key={type} value={type}>{config.displayName}</MenuItem>
        ))}
      </Select>
    </>
  );
};

export default MidiRedemptionAction;
