import React, { useEffect } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from '@material-ui/core';
import { Add, DeleteForever } from '@material-ui/icons';
import { MIDI_MESSAGE_TYPES } from '../data/constants';

const MidiRedemptionAction = ({ action, onChange }) => {
  const theme = useTheme();

  const onSelectMessageType = (order) => (event) => {
    const newOutputs = [...action.params.outputs];
    newOutputs[newOutputs.findIndex((output) => output.order === order)].type = event.target.value;

    onChange({ ...action, params: { ...action.params, outputs: newOutputs } });
  };

  const onChangeMessageValue = (order) => (event) => {
    const newOutputs = [...action.params.outputs];
    newOutputs[newOutputs.findIndex((output) => output.order === order)]
      .value[event.target.name] = parseInt(event.target.value, 10);

    onChange({ ...action, params: { ...action.params, outputs: newOutputs } });
  };

  const addMessageAt = (order) => () => {
    const index = action.params.outputs.findIndex((output) => output.order === order) + 1;

    const newOutputs = [...action.params.outputs].map((output) => (
      output.order > order
        ? { ...output, order: output.order + 1 }
        : output
    ));

    newOutputs.splice(index, 0, { type: 'noteon', value: {}, order });

    onChange({ ...action, params: { ...action.params, outputs: newOutputs } });
  };

  const deleteMessageAt = (order) => () => {
    const newOutputs = [...action.params.outputs];
    newOutputs.splice(newOutputs.findIndex((output) => output.order === order), 1);

    onChange({
      ...action,
      params: {
        ...action.params,
        outputs: newOutputs.map((output) => (
          output.order > order
            ? { ...output, order: output.order - 1 }
            : output
        )),
      },
    });
  };

  useEffect(() => {
    if (!action?.params?.outputs) {
      onChange({ ...action, params: { ...action.params, outputs: [{ type: 'noteon', value: {}, order: 0 }] } });
    }
  });

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
                    name={param}
                    value={output.value[param]}
                    type="number"
                    onChange={onChangeMessageValue(output.order)}
                    margin="normal"
                    fullWidth
                  />
                ))
              }
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                style={{
                  backgroundColor: theme.palette.success.main,
                }}
                size="small"
                onClick={addMessageAt(output.order)}
              >
                <Add />
              </IconButton>
              <IconButton
                style={{
                  backgroundColor: theme.palette.error.main,
                  marginLeft: 'auto',
                }}
                size="small"
                onClick={deleteMessageAt(output.order)}
              >
                <DeleteForever />
              </IconButton>
            </CardActions>
          </Card>
        ))
      }
    </>
  );
};

export default MidiRedemptionAction;
