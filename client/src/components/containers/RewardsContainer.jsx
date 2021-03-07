import React, { useState, useEffect } from 'react';

import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import ActionButtonsContainer from './ActionButtonsContainer';

import rewardsService from '../../services/rewards.service';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: '1rem',
  },
}));

const RewardsContainer = ({
  selectedReward, onSelectReward, onCreateRewardClick, onEditClick, onDeleteClick,
}) => {
  const classes = useStyles();

  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    rewardsService
      .getAll()
      .then((rewardsArray) => {
        setRewards(rewardsArray);
      })
      .catch((reason) => {
        toast.error(reason.message, {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, []);

  const onToggleReward = (reward) => {
    // TODO:: toogle reward
  };

  console.log(selectedReward);

  return (
    <>
      <ActionButtonsContainer
        onCreateRewardClick={onCreateRewardClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />
      <List
        subheader={<ListSubheader>Rewards</ListSubheader>}
        className={classes.list}
      >
        {rewards.map(({ reward }) => (
          <ListItem
            button
            selected={selectedReward && reward.id === selectedReward.id}
            onClick={() => onSelectReward(reward)}
          >
            <ListItemText id="switch-list-label-wifi" primary={reward.title} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={() => onToggleReward(reward)}
                checked={reward.isEnabled}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

    </>
  );
};

export default RewardsContainer;
