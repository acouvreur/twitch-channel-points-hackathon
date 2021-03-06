import React, { useState, useEffect } from 'react';

import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    padding: '1rem',
  },
}));

const RewardsContainer = ({ selectedReward, onSelectReward }) => {
  const classes = useStyles();

  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    // TODO:: get rewards
    setRewards([
      {
        id: 123,
        title: 'test1',
        isEnabled: true,
      },
      {
        id: 456,
        title: 'test2',
        isEnabled: false,
      },
    ]);
  }, []);

  const onToogleReward = (reward) => {
    // TODO:: toogle reward
  };

  console.log(selectedReward);

  return (
    <List subheader={<ListSubheader>Rewards</ListSubheader>} className={classes.list}>
      {
            rewards.map((reward) => (
              <ListItem
                button
                selected={selectedReward && reward.id === selectedReward.id}
                onClick={() => onSelectReward(reward)}
              >
                <ListItemText id="switch-list-label-wifi" primary={reward.title} />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    onChange={onToogleReward('wifi')}
                    checked={reward.isEnabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))
        }
    </List>
  );
};

export default RewardsContainer;
