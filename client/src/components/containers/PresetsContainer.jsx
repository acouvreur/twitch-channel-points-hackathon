import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  List, ListItem, ListItemSecondaryAction, ListItemText, ListSubheader, Switch,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    width: '50vw',
    padding: '1rem',
  },
}));

const PresetsContainer = ({ rewardsConf, existingGroups, onUpdateRewards }) => {
  const classes = useStyles();

  const onToggleGroup = (group) => (event, value) => {
    rewardsConf
      .filter((conf) => conf?.isEnabled?.groups?.indexOf(group) >= 0)
      .forEach((conf) => {
        console.log(conf);
        const { reward } = conf;
        reward.isEnabled = value;
      });
    console.log(rewardsConf);
    onUpdateRewards([...rewardsConf]);
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
