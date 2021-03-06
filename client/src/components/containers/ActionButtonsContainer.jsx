import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SettingsStore from '../../stores/settingsStore';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: '1rem',
  },
  container: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

/**
 * @param {Object} params
 * @param {Function} params.onCreateRewardClick
 * @param {Function} params.onEditClick
 * @param {Function} params.onDeleteClick
 * @param {Function} params.onDisableAll
 * @param {Function} params.onRefreshConfig
 * @param {boolean} params.confSelected
 */
const ActionButtonsContainer = ({
  onCreateRewardClick,
  onEditClick,
  onDeleteClick,
  onDisableAll,
  onRefreshConfig,
  confSelected = false,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={onCreateRewardClick}
          className={classes.button}
        >
          Create reward
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onEditClick}
          className={classes.button}
          disabled={!confSelected}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onDeleteClick}
          className={classes.button}
          disabled={!confSelected}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          onClick={onDisableAll}
          className={classes.button}
        >
          Disable All
        </Button>
        <Button
          variant="contained"
          onClick={onRefreshConfig}
          className={classes.button}
        >
          Refresh
        </Button>
      </div>

      <FormControlLabel
        control={(
          <Switch
            checked={SettingsStore.darkTheme}
            onChange={() => SettingsStore.toggleTheme()}
            name="Theme"
          />
        )}
        label="Theme"
        labelPlacement="start"
        style={{ marginRight: '0.6rem' }}
      />

    </div>
  );
};

export default ActionButtonsContainer;
