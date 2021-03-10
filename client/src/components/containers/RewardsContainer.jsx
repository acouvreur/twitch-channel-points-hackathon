import React from 'react';

import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import ActionButtonsContainer from './ActionButtonsContainer';
import pubSubService from '../../services/pub-sub.service';
import rewardsService from '../../services/rewards.service';
import TOAST_CONFIG from '../../toast.conf';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const RewardsContainer = ({
  selectedReward, onSelectReward, onCreateRewardClick, onEditClick, onDeleteClick, rewards,
  onUpdateRewards, onRefreshConfig,

}) => {
  const classes = useStyles();

  const onToggleReward = (rewardConf) => async (event, checked) => {
    try {
      await rewardsService.toggleReward(rewardConf.reward.id, checked);

      const newConf = rewards.find((conf) => conf.reward.title === rewardConf.reward.title);
      newConf.reward.isEnabled = checked;
      onUpdateRewards([...rewards]);
    } catch (err) {
      toast.error(err.message, TOAST_CONFIG);
    }
  };

  const onTryOut = (rewardConf) => async () => {
    try {
      await pubSubService.triggerReward(rewardConf);
      toast.success('Redemption(s) succeeded', TOAST_CONFIG);
    } catch (err) {
      toast.error(err.message, TOAST_CONFIG);
    }
  };

  const onDisableAll = async () => {
    try {
      await Promise.all(
        rewards.map(async (conf) => rewardsService.toggleReward(conf.reward.id, false)),
      );
      rewards.forEach((conf) => {
        const { reward } = conf;
        reward.isEnabled = false;
      });
      onUpdateRewards([...rewards]);
    } catch (err) {
      toast.error(err.message, TOAST_CONFIG);
    }
  };

  return (
    <>
      <ActionButtonsContainer
        onCreateRewardClick={onCreateRewardClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        confSelected={!!selectedReward}
        onRefreshConfig={onRefreshConfig}
      />
      <List
        subheader={(
          <ListSubheader className={classes.header}>
            <span>Rewards</span>
            <Button variant="contained" onClick={onDisableAll}>
              Disable All
            </Button>
          </ListSubheader>
        )}
        className={classes.list}
      >
        {rewards.map((rewardConf, index) => (
          <ListItem
            key={rewardConf.reward.id}
            button
            selected={selectedReward && rewardConf.reward.id === selectedReward.reward.id}
            onClick={() => onSelectReward(index)}
          >
            <ListItemText id="switch-list-enabled" primary={rewardConf.reward.title} />
            <ListItemSecondaryAction>
              <>
                <Button onClick={onTryOut(rewardConf)} variant="contained">Try out !</Button>
                <Switch
                  edge="end"
                  onChange={onToggleReward(rewardConf)}
                  checked={rewardConf.reward.isEnabled}
                />
              </>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

    </>
  );
};

export default RewardsContainer;
