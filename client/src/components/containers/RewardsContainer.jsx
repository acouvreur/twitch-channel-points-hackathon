import React, { useEffect, useState } from 'react';

import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button, Chip, Typography,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import ActionButtonsContainer from './ActionButtonsContainer';
import pubSubService from '../../services/pub-sub.service';
import rewardsService from '../../services/rewards.service';
import TOAST_CONFIG from '../../toast.conf';
import colorService from '../../services/color.service';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    height: '100vh',
  },
  list: {
    padding: '0 1rem',
    position: 'relative',
    overflow: 'auto',
  },
  item: {
    padding: '0 1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottom: `1px solid ${theme.palette.grey[50]}`,
    marginBottom: '0.5rem',
    backgroundColor: theme.palette.background.default,
  },
  infoRow: {
    marginBlockEnd: '0.5rem',
    marginBlockStart: '0.5rem',
  },
  infoRowTitle: {
    fontSize: '0.875rem',
    color: theme.palette.text.hint,
    marginRight: '0.5rem',
  },
  chip: {
    marginRight: '0.5rem',
  },
}));

const RewardsContainer = ({
  selectedReward, onSelectReward, onCreateRewardClick, onEditClick, onDeleteClick, rewards,
  onUpdateRewards, onRefreshConfig,

}) => {
  const classes = useStyles();

  const [groupsColor, setGroupsColor] = useState([]);
  const [gamesColor, setGamesColor] = useState([]);

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
  useEffect(() => {
    setGroupsColor(colorService.getColorMap(rewards
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

    setGamesColor(colorService.getColorMap(rewards
      ?.map((conf) => conf.isEnabled)
      .reduce((acc, cur) => {
        if (cur.groups) {
          cur.games.forEach((group) => {
            if (acc.indexOf(group) < 0) {
              acc.push(group);
            }
          });
        }
        return acc;
      }, []) || []));
  }, [rewards]);

  return (
    <div className={classes.container}>
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
            className={classes.item}
          >
            <ListItemText
              id="switch-list-enabled"
              primary={(
                <>
                  <Typography
                    component="span"
                    variant="body1"
                    color="textPrimary"
                  >
                    {rewardConf.reward.title}
                  </Typography>

                </>
              )}
              secondary={(
                <>
                  <p className={classes.infoRow}>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.infoRowTitle}
                      color="textPrimary"
                    >
                      Groups:
                    </Typography>
                    {rewardConf?.isEnabled?.groups?.map((group) => (
                      <Chip
                        size="small"
                        label={group}
                        style={{ backgroundColor: groupsColor[group] }}
                        className={classes.chip}
                      />
                    ))}
                  </p>
                  <p>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.infoRowTitle}
                      color="textPrimary"
                    >
                      Games:
                    </Typography>
                    {rewardConf?.isEnabled?.games?.map((game) => (
                      <Chip
                        size="small"
                        label={game}
                        style={{ backgroundColor: gamesColor[game] }}
                        className={classes.chip}
                      />
                    ))}
                  </p>
                </>
            )}
            />
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

    </div>
  );
};

export default RewardsContainer;
