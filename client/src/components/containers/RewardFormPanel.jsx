import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Chip,
  FormControl,
  FormControlLabel, InputLabel, Switch, TextField, Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '40vw',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '0.5rem',
    },
  },
  switchLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '0.2rem',
  },
  chip: {
    margin: '0.2rem',
  },
}));

const RewardFormPanel = () => {
  const theme = useTheme();
  // const [color, setColor] = useState(theme.palette.text.primary;
  const [userInputRequired, setUserInputRequired] = useState(false);
  const [availableGames, setAvailableGames] = useState(['Just Chatting', 'Minecraft', 'Music']);

  const classes = useStyles();

  const onUserInputRequiredChange = (event, checked) => {
    setUserInputRequired(checked);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Typography variant="h5">Create a reward</Typography>
      <TextField id="title" label="Title" variant="outlined" />
      <TextField id="cost" label="Cost" variant="outlined" />
      {/* todo color picker */}
      <TextField id="backgroundColor" label="Background color" variant="outlined" />

      <TextField id="globalCooldown" label="Global cooldown" variant="outlined" defaultValue="5" />
      <TextField id="maxRedemptionsPerStream" label="Maximum redemption per stream" variant="outlined" defaultValue="0" />
      <TextField id="maxRedemptionsPerUserPerStream" label="Maximum redemption per stream" variant="outlined" defaultValue="0" />
      <TextField id="prompt" label="Prompt" variant="outlined" defaultValue="Bravo guy!" />
      <FormControlLabel
        control={(
          <Switch
            checked={userInputRequired}
            onChange={onUserInputRequiredChange}
            name="userInputRequired"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        )}
        label="User input required"
        labelPlacement="start"
        className={classes.switchLabel}
      />
      <Autocomplete
        multiple
        id="tags-filled"
        options={availableGames.map((game) => game)}
        freeSolo
        renderTags={(value, getTagProps) => value.map((option, index) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Chip variant="outlined" label={option} className={classes.chip} {...getTagProps({ index })} />
        ))}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} id="games" variant="outlined" label="Enable/disable automatically this reward based on channel.gameName" />
        )}
      />
    </form>
  );
};

export default RewardFormPanel;
