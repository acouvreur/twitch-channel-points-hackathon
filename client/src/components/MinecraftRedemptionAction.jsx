import React from 'react';
import {
  Button,
  IconButton,
  makeStyles, MenuItem, Paper, Select, TextField, Typography, useTheme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { MINECRAFT_POTION_EFFECTS } from '../data/constants';

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

const MinecraftRedemptionAction = ({ action, onChange }) => {
  const theme = useTheme();
  const classes = useStyles();

  const onSelectPotionType = (event, value) => {
    onChange({ ...action, params: { ...action.params, effect: value } });
  };

  const onDurationChange = (event, value) => {
    onChange({ ...action, params: { ...action.params, duration: value } });
  };

  return (
    <Paper className={classes.container} variant="outlined">
      <div className={classes.header}>
        <Typography>Minecraft</Typography>
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
        value={action?.params?.effect || MINECRAFT_POTION_EFFECTS[0]}
        onChange={onSelectPotionType}
      >
        {MINECRAFT_POTION_EFFECTS.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
      </Select>
      <TextField id="maxRedemptionsPerUserPerStream" label="Maximum redemption per stream" variant="outlined" defaultValue="0" onChange={onDurationChange} />
    </Paper>
  );
};

export default MinecraftRedemptionAction;
