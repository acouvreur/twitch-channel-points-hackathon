import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  List, ListItem, ListItemText, ListSubheader,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    width: '50vw',
    padding: '1rem',
  },
}));

const PresetsContainer = ({ rewardsConf, existingGroups }) => {
  const classes = useStyles();

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
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PresetsContainer;
