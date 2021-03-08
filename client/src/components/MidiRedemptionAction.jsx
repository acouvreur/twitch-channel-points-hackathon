import React from 'react';
import {
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { MIDI_MESSAGE_TYPES } from '../data/constants';

const MidiRedemptionAction = ({ action, onChange }) => {
  const onSelectMessageType = (order) => (event, value) => {
    onChange({ ...action, params: { ...action.params, effect: value } });
  };

  return (
    <>
      {
        action?.params?.outputs.map((output) => (
          <Card variant="outlined" key={output.order}>
            <CardContent>
              <Select
                value={output.type}
                onChange={onSelectMessageType(output.order)}
                fullWidth
              >
                {
                  Object.entries(MIDI_MESSAGE_TYPES).map(([type, config]) => (
                    <MenuItem key={type} value={type}>{config.displayName}</MenuItem>
                  ))
                }
              </Select>
              {
                MIDI_MESSAGE_TYPES[output.type].params.map((param) => (
                  <TextField
                    key={param}
                    label={param.charAt(0).toUpperCase() + param.slice(1)}
                    variant="outlined"
                    value={output.value[param]}
                    margin="normal"
                    fullWidth
                  />
                ))
              }
            </CardContent>
          </Card>
        ))
      }
    </>
  );
};

export default MidiRedemptionAction;
