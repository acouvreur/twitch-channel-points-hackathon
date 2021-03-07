import React, { useState, useEffect } from 'react';
import {
  Paper, Drawer, Grid, makeStyles,
} from '@material-ui/core';
import { toast } from 'react-toastify';

import RewardFormPanel from '../components/containers/RewardFormPanel';
import RewardsContainer from '../components/containers/RewardsContainer';
import PresetsContainer from '../components/containers/PresetsContainer';

import rewardsService from '../services/rewards.service';

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

  useEffect(() => {
    rewardsService
      .getAll()
      .then((rewardsArray) => {
        setRewardsConf(rewardsArray);
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
      rewardsService.updateRewards(conf);
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
    rewardsService.updateRewards(newConf);
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

  return (
    <>
      <Drawer anchor="right" open={showRewardFormPanel} onClose={onClosePanel}>
        <RewardFormPanel
          onClose={onClosePanel}
          onSave={onSaveReward}
          defaultValue={getRewardConfByIndex(editingRewardIndex)}
        />
      </Drawer>

      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={6} component={Paper}>
          <PresetsContainer />
        </Grid>
        <Grid item xs={6}>
          <RewardsContainer
            selectedReward={getRewardConfByIndex(selectedRewardIndex)}
            onSelectReward={onSelectReward}
            onCreateRewardClick={onCreateRewardClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onUpdateRewards={onUpdateRewards}
            rewards={rewardsConf}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
