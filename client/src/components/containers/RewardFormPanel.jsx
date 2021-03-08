import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Chip,
  FormControlLabel, Switch, TextField, Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RedemptionActionInputGroup from '../RedemptionActionInputGroup';

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
  actionButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& > *': {
      marginLeft: '1rem',
    },
  },
}));

const RewardFormPanel = ({ onClose, onSave, defaultValue }) => {
  const theme = useTheme();
  // const [color, setColor] = useState(theme.palette.text.primary;
  const [availableGames, setAvailableGames] = useState(['Just Chatting', 'Minecraft', 'Music']);

  const [rewardConf, setRewardConf] = useState(defaultValue || {
    onRedemption: [],
    reward: {
      globalCoolDown: 5,
      maxRedemptionsPerStream: 0,
      maxRedemptionsPerUserPerStream: 0,
      globalCooldown: 5,
      prompt: 'Merci Monsieur',
    },
    isEnabled: {
      games: [],
    },
  });

  const classes = useStyles();

  const onSubmit = (event) => {
    onSave(rewardConf);
    onClose();
    event.preventDefault();
    event.stopPropagation();
  };

  const onUserInputRequiredChange = (event, checked) => {
    setRewardConf({
      ...rewardConf,
      reward: {
        ...rewardConf.reward,
        userInputRequired: checked,
      },
    });
  };

  const onRedemptionActionsChange = (actions) => {
    console.log(actions);
    setRewardConf({
      ...rewardConf,
      onRedemption: actions,
    });
  };

  const onTitleChange = (event) => {
    setRewardConf({
      ...rewardConf,
      reward: {
        ...rewardConf.reward,
        title: event.target.value,
      },
    });
  };

  const onBackgroundColorChange = (event) => {
    setRewardConf({
      ...rewardConf,
      reward: {
        ...rewardConf.reward,
        backgroundColor: event.target.value,
      },
    });
  };

  const onCostChange = (event) => {
    setRewardConf({
      ...rewardConf,
      reward: {
        ...rewardConf.reward,
        cost: event.target.value,
      },
    });
  };

  const onGlobalCooldownChange = (event) => {
    setRewardConf({
      ...rewardConf,
      reward: {
        ...rewardConf.reward,
        globalCooldown: event.target.value,
      },
    });
  };

  const onMaxRedemptionsPerStreamChange = (event) => {
    setRewardConf({
      ...rewardConf,
      reward: {
        ...rewardConf.reward,

        maxRedemptionsPerStream: event.target.value,
      },
    });
  };

  const onMaxRedemptionsPerUserPerStreamChange = (event) => {
    setRewardConf({
      ...rewardConf,
      reward: {
        ...rewardConf.reward,
        maxRedemptionsPerUserPerStream: event.target.value,
      },
    });
  };

  const onPromptChange = (event) => {
    setRewardConf({
      ...rewardConf,
      reward: {
        ...rewardConf.reward,
        prompt: event.target.value,
      },
    });
  };

  const onGamesChange = (event, value) => {
    setRewardConf({
      ...rewardConf,
      isEnabled: {
        ...rewardConf.isEnabled,
        games: value,
      },
    });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={onSubmit}>
      <Typography variant="h5">Create a reward</Typography>
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        onChange={onTitleChange}
        value={rewardConf.reward.title}
      />
      <TextField
        id="cost"
        label="Cost"
        variant="outlined"
        onChange={onCostChange}
        value={rewardConf.reward.cost}
      />
      {/* todo color picker */}
      <TextField
        id="backgroundColor"
        label="Background color"
        variant="outlined"
        onChange={onBackgroundColorChange}
        value={rewardConf.reward.backgroundColor}
      />

      <TextField
        id="globalCooldown"
        label="Global cooldown"
        variant="outlined"
        defaultValue={rewardConf.reward.globalCooldown}
        onChange={onGlobalCooldownChange}
        value={rewardConf.reward.globalCooldown}
      />
      <TextField
        id="maxRedemptionsPerStream"
        label="Maximum redemption per stream"
        variant="outlined"
        defaultValue={rewardConf.reward.maxRedemptionsPerStream}
        onChange={onMaxRedemptionsPerStreamChange}
        value={rewardConf.reward.maxRedemptionsPerStream}
      />
      <TextField
        id="maxRedemptionsPerUserPerStream"
        label="Maximum redemption per stream"
        variant="outlined"
        defaultValue={rewardConf.reward.maxRedemptionsPerUserPerStream}
        onChange={onMaxRedemptionsPerUserPerStreamChange}
        value={rewardConf.reward.maxRedemptionsPerUserPerStream}
      />
      <TextField
        id="prompt"
        label="Prompt"
        variant="outlined"
        defaultValue={rewardConf.reward.prompt}
        onChange={onPromptChange}
        value={rewardConf.reward.prompt}
      />
      <FormControlLabel
        control={(
          <Switch
            checked={rewardConf.reward.userInputRequired}
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
        onChange={onGamesChange}
        value={rewardConf.isEnabled.games}
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
      <RedemptionActionInputGroup
        onChange={onRedemptionActionsChange}
        redemptionActions={rewardConf.onRedemption || []}
      />
      <div className={classes.actionButtonContainer}>

        <Button color="secondary" variant="contained" onClick={onClose}>Cancel</Button>
        <Button type="submit" color="primary" variant="contained">Save</Button>
      </div>
    </form>
  );
};

export default RewardFormPanel;
