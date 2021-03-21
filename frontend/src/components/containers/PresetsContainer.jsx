import React, { useEffect, useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Avatar,
  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Switch,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import rewardsService from '../../services/rewards.service';
import TOAST_CONFIG from '../../toast.conf';
import colorService from '../../services/color.service';

const useStyles = makeStyles(() => ({
  container: {
    width: '100%',
    padding: '1rem',
  },
}));

const PresetsContainer = ({ rewardsConf, existingGroups, onUpdateRewards }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [groupsColor, setGroupsColor] = useState([]);

  useEffect(() => {
    setGroupsColor(colorService.getColorMap(rewardsConf
      ?.map((conf) => conf.isEnabled)
      .reduce((acc, cur) => {
        if (cur.groups) {
          cur.groups.forEach((group) => {
            if (acc.indexOf(group) < 0) {
              acc.push(group);
            }
          });
        }
        return acc;
      }, []) || []));
  }, [rewardsConf]);

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
            <ListItemIcon>
              <Avatar style={{
                backgroundColor: groupsColor[group],
                color: theme.palette.common.white,
              }}
              >
                {group[0]}

              </Avatar>
            </ListItemIcon>
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
