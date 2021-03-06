import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '50vw',
    padding: '1rem',
  },
}));

const PresetsContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      Presets
    </div>
  );
};

export default PresetsContainer;
