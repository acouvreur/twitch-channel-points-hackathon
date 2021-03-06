import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '40vw',
  },
}));

const RewardFormPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      test
    </div>
  );
};

export default RewardFormPanel;
