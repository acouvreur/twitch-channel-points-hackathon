import React from 'react';

import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ActionButtonsContainer from './ActionButtonsContainer';
import pubSubService from '../../services/pub-sub.service';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: '1rem',
  },
}));

const RewardsContainer = ({
  selectedReward, onSelectReward, onCreateRewardClick, onEditClick, onDeleteClick, rewards,
  onUpdateRewards,

}) => {
  const classes = useStyles();

  const onToggleReward = (rewardConf) => (event, checked) => {
    const newConf = rewards.find((conf) => conf.reward.title === rewardConf.reward.title);
    newConf.reward.isEnabled = checked;
    onUpdateRewards([...rewards]);
  };

  const onTruOut = (rewardConf) => () => {
    pubSubService.triggerReward(rewardConf);
  };

  return (
    <>
      <ActionButtonsContainer
        onCreateRewardClick={onCreateRewardClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        confSelected={!!selectedReward}
      />
      <List
        subheader={<ListSubheader>Rewards</ListSubheader>}
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
                <Button onClick={onTruOut(rewardConf)} variant="contained">Try out !</Button>
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
