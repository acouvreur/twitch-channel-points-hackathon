import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, Switch,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import rewardsService from '../../services/rewards.service';
import TOAST_CONFIG from '../../toast.conf';

const useStyles = makeStyles(() => ({
  container: {
    width: '50vw',
    padding: '1rem',
  },
}));

const PresetsContainer = ({ rewardsConf, existingGroups, onUpdateRewards }) => {
  const classes = useStyles();

  const onToggleGroup = (group) => async (event, value) => {
    try {
      const rewards = rewardsConf
        .filter((conf) => conf?.isEnabled?.groups?.indexOf(group) >= 0);
      await Promise.all(
        rewards.map(async (conf) => rewardsService.toggleReward(conf.reward.id, value)),
      );
      rewards.forEach((conf) => {
        const { reward } = conf;
        reward.isEnabled = value;
      });
      onUpdateRewards([...rewardsConf]);
    } catch (err) {
      toast.error(err.message, TOAST_CONFIG);
    }
  };

  return (
    <div className={classes.container}>
      <List
        subheader={<ListSubheader>Groups</ListSubheader>}
        className={classes.list}
      >
        {existingGroups.map((group, index) => (
          <ListItem
            key={group}
            button
          >
            <ListItemText id="switch-list-enabled" primary={group} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={onToggleGroup(group)}
                checked={
                  rewardsConf
                    .filter((conf) => conf?.isEnabled?.groups?.indexOf(group) >= 0)
                    .every((conf) => conf.reward.isEnabled)
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PresetsContainer;
