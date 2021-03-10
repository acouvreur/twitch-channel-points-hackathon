import React, { useState, useEffect } from 'react';
import {
  Paper, Drawer, Grid, makeStyles,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import RewardFormPanel from '../components/containers/RewardFormPanel';
import RewardsContainer from '../components/containers/RewardsContainer';
import PresetsContainer from '../components/containers/PresetsContainer';

import rewardsService from '../services/rewards.service';
import TOAST_CONFIG from '../toast.conf';

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
});

const MainPage = () => {
  const classes = useStyles();
  const [showRewardFormPanel, setShowRewardFormPanel] = useState(false);
  const [selectedRewardIndex, setSelectedRewardIndex] = useState(-1);
  const [editingRewardIndex, setEditingRewardIndex] = useState(-1);

  const [rewardsConf, setRewardsConf] = useState([]);

  const [existingGroups, setExistingGroups] = useState([]);

  const loadConfig = async () => {
    try {
      rewardsService
        .getAll()
        .then((rewardsArray) => {
          setRewardsConf(rewardsArray);
        })
        .catch((reason) => {
          toast.error(reason.message, TOAST_CONFIG);
        });
    } catch (err) {
      toast.error(err.message, TOAST_CONFIG);
    }
  };

  useEffect(() => {
    setExistingGroups(rewardsConf
      .map((conf) => conf.isEnabled)
      .reduce((acc, cur) => {
        if (cur.groups) {
          cur.groups.forEach((group) => {
            if (acc.indexOf(group) < 0) {
              acc.push(group);
            }
          });
        }
        return acc;
      }, [])
      .sort());
  }, [rewardsConf]);

  useEffect(() => {
    loadConfig(setRewardsConf);
  }, []);

  const onCreateRewardClick = () => {
    setShowRewardFormPanel(true);
  };

  const onClosePanel = () => {
    setShowRewardFormPanel(false);
    setEditingRewardIndex(null);
    setSelectedRewardIndex(null);
  };

  const getRewardConfByIndex = (index) => rewardsConf[index];

  const onDeleteClick = () => {
    if (selectedRewardIndex >= 0) {
      // eslint-disable-next-line max-len
      const conf = [...rewardsConf];
      conf.splice(selectedRewardIndex, 1);
      setRewardsConf(conf);
      rewardsService.updateRewardsConfig(conf);
    }
  };

  const onEditClick = () => {
    setEditingRewardIndex(selectedRewardIndex);
    setShowRewardFormPanel(true);
  };

  const onSelectReward = (index) => {
    if (selectedRewardIndex >= 0 && index === selectedRewardIndex) {
      setSelectedRewardIndex(null);
    } else {
      setSelectedRewardIndex(index);
    }
  };

  const onUpdateRewards = (newConf) => {
    setRewardsConf(newConf);
    rewardsService.updateRewardsConfig(newConf);
  };

  const onSaveReward = (rewardConf) => {
    const newConf = [...rewardsConf];
    if (editingRewardIndex >= 0) {
      const index = newConf.findIndex((conf) => conf.reward.title === rewardConf.reward.title);
      if (index === -1) {
        newConf.push(rewardConf);
      } else {
        newConf.splice(index, 1, rewardConf);
      }
    } else {
      newConf.push(rewardConf);
    }
    onUpdateRewards(newConf);
  };

  const onRefreshConfig = () => {
    loadConfig().then(() => toast.success('Refresh successful', TOAST_CONFIG));
  };

  return (
    <>
      <Drawer anchor="right" open={showRewardFormPanel} onClose={onClosePanel}>
        <RewardFormPanel
          onClose={onClosePanel}
          onSave={onSaveReward}
          defaultValue={getRewardConfByIndex(editingRewardIndex)}
          existingGroups={existingGroups}
        />
      </Drawer>

      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={4} component={Paper} elevation={5}>
          <PresetsContainer
            rewardsConf={rewardsConf}
            existingGroups={existingGroups}
            onUpdateRewards={onUpdateRewards}
          />
        </Grid>
        <Grid item xs={8}>
          <RewardsContainer
            selectedReward={getRewardConfByIndex(selectedRewardIndex)}
            onSelectReward={onSelectReward}
            onCreateRewardClick={onCreateRewardClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onUpdateRewards={onUpdateRewards}
            onRefreshConfig={onRefreshConfig}
            rewards={rewardsConf}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
