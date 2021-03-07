import React from 'react';
import {
  IconButton,
  makeStyles, MenuItem, Paper, Select, TextField, Typography, useTheme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { MIDI_MESSAGE_TYPES } from '../data/constants';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0.5rem',
    '& > *': {
      margin: '0.5rem 0',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const MidiRedemptionAction = ({ action, onChange }) => {
  const theme = useTheme();
  const classes = useStyles();

  const onSelectMessageType = (event, value) => {
    onChange({ ...action, params: { ...action.params, effect: value } });
  };

  return (
    <Paper className={classes.container} variant="outlined">
      <div className={classes.header}>
        <Typography>Midi</Typography>
        <IconButton
          aria-label="delete"
          style={{
            backgroundColor: theme.palette.error.main,
          }}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      </div>
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
    </Paper>
  );
};

export default MidiRedemptionAction;
