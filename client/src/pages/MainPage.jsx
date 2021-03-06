import React, { Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';

import ActionButtonsContainer from '../components/containers/ActionButtonsContainer';
import RewardFormPanel from '../components/containers/RewardFormPanel';
import RewardsContainer from '../components/containers/RewardsContainer';
import PresetsContainer from '../components/containers/PresetsContainer';

const MainPage = () => {
  const [showRewardFormPanel, setShowRewardFormPanel] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  const onCreateRewardClick = () => {
    console.log('open panel');
    setShowRewardFormPanel(true);
  };

  const onClosePanel = () => {
    setShowRewardFormPanel(false);
  };

  const onDeleteClick = () => {

  };

  const onEditClick = () => {

  };

  const onSelectReward = (reward) => {
    setSelectedReward(reward);
  };

  return (
    <>
      <Drawer anchor="right" open={showRewardFormPanel} onClose={onClosePanel}>
        <RewardFormPanel />
      </Drawer>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ActionButtonsContainer
            onCreateRewardClick={onCreateRewardClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        </Grid>
        <Grid item xs={6}>
          <PresetsContainer />
        </Grid>
        <Grid item xs={6}>
          <RewardsContainer selectedReward={selectedReward} onSelectReward={onSelectReward} />
        </Grid>
      </Grid>
    </>
  );
};

export default MainPage;
