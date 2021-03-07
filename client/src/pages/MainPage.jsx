import React, { useState } from 'react';
import {
  Paper, Drawer, Grid, makeStyles,
} from '@material-ui/core';

import RewardFormPanel from '../components/containers/RewardFormPanel';
import RewardsContainer from '../components/containers/RewardsContainer';
import PresetsContainer from '../components/containers/PresetsContainer';

const useStyles = makeStyles({
  container: {
    height: '100vh',
  },
});

const MainPage = () => {
  const classes = useStyles();
  const [showRewardFormPanel, setShowRewardFormPanel] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const onCreateRewardClick = () => {
    console.log('open panel');
    setShowRewardFormPanel(true);
  };

  const onClosePanel = () => {
    setShowRewardFormPanel(false);
  };

  const onDeleteClick = () => {};

  const onEditClick = () => {};

  const onSelectReward = (reward) => {
    if (selectedReward && reward.id === selectedReward.id) {
      setSelectedReward(null);
    } else {
      setSelectedReward(reward);
    }
  };

  const onCreateReward = (rewardConf) => {
    console.log(`create ${JSON.stringify(rewardConf, null, 2)}`);
  };

  return (
    <>
      <Drawer anchor="right" open={showRewardFormPanel} onClose={onClosePanel}>
        <RewardFormPanel onClose={onClosePanel} onSave={onCreateReward} />
      </Drawer>

      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={6} component={Paper}>
          <PresetsContainer />
        </Grid>
        <Grid item xs={6}>
          <RewardsContainer
            selectedReward={selectedReward}
            onSelectReward={onSelectReward}
            onCreateRewardClick={onCreateRewardClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
