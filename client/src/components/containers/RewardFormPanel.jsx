import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Chip,
  FormControlLabel,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ColorPicker } from 'material-ui-color';
import { toast } from 'react-toastify';
import RedemptionActionInputGroup from '../RedemptionActionInputGroup';
import pubSubService from '../../services/pub-sub.service';
import TOAST_CONFIG from '../../toast.conf';

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

const RewardFormPanel = ({
  onClose, onSave, defaultValue, existingGroups,
}) => {
  const [availableGames, setAvailableGames] = useState(['Just Chatting', 'Minecraft', 'Music']);
  const [errors, setErrors] = useState({});

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
    event.preventDefault();
    event.stopPropagation();
    const newErrors = {};
    console.log(rewardConf);
    if (!rewardConf.reward.title) {
      newErrors.title = 'Title cannot be empty.';
    } if (!rewardConf.reward.cost) {
      newErrors.cost = 'Cost cannot be empty.';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSave(rewardConf);
    onClose();
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

  const onBackgroundColorPickerChange = (color) => {
    setRewardConf({
      ...rewardConf,
      reward: {
        ...rewardConf.reward,
        backgroundColor: color.css.backgroundColor,
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

  const onGroupsChange = (event, value) => {
    setRewardConf({
      ...rewardConf,
      isEnabled: {
        ...rewardConf.isEnabled,
        groups: value,
      },
    });
  };

  const onTryOut = async () => {
    try {
      await pubSubService.triggerReward(rewardConf);
      toast.success('Redemption(s) succeeded', TOAST_CONFIG);
    } catch (err) {
      console.log(err);
      toast.error(err.message, TOAST_CONFIG);
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off" onSubmit={onSubmit}>
      <Typography variant="h5">
        {defaultValue ? 'Edit' : 'Create'}
        {' '}
        a reward
      </Typography>
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        onChange={onTitleChange}
        value={rewardConf.reward.title}
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        id="cost"
        label="Cost"
        variant="outlined"
        onChange={onCostChange}
        value={rewardConf.reward.cost}
        error={!!errors.cost}
        helperText={errors.cost}
      />
      <TextField
        id="backgroundColor"
        label="Background color"
        variant="outlined"
        onChange={onBackgroundColorChange}
        value={rewardConf.reward.backgroundColor}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ColorPicker
                value={rewardConf.reward.backgroundColor}
                onChange={onBackgroundColorPickerChange}
                hideTextfield
              />
            </InputAdornment>
          ),
        }}
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
        id="games-autocomplete"
        options={availableGames}
        onChange={onGamesChange}
        value={rewardConf.isEnabled.games}
        freeSolo
        renderTags={(value, getTagProps) => value.map((option, index) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Chip variant="outlined" label={option} className={classes.chip} {...getTagProps({ index })} />
        ))}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} id="games" variant="outlined" label="Enable/disable this reward based on channel gameName" />
        )}
      />
      <Autocomplete
        multiple
        id="groups-autocomplete"
        options={existingGroups}
        onChange={onGroupsChange}
        value={rewardConf.isEnabled.groups}
        freeSolo
        renderTags={(value, getTagProps) => value.map((option, index) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Chip variant="outlined" label={option} className={classes.chip} {...getTagProps({ index })} />
        ))}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} id="groups" variant="outlined" label="Groups" />
        )}
      />
      <RedemptionActionInputGroup
        onChange={onRedemptionActionsChange}
        redemptionActions={rewardConf.onRedemption || []}
      />
      <div className={classes.actionButtonContainer}>

        <Button color="secondary" variant="contained" onClick={onClose}>Cancel</Button>
        <Button color="default" variant="contained" onClick={onTryOut}>Try out!</Button>
        <Button type="submit" color="primary" variant="contained">Save</Button>
      </div>
    </form>
  );
};

export default RewardFormPanel;
