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
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

/**
 * @param {Object} params
 * @param {Function<Event>} params.onCreateRewardClick
 * @param {Function<Event>} params.onEditClick
 * @param {Function<Event>} params.onDeleteClick
 */
const ActionButtonsContainer = ({ onCreateRewardClick, onEditClick, onDeleteClick }) => {
  const classes = useStyles();
  console.log(onCreateRewardClick);
  return (
    <div className={classes.container}>
      <div>
        <Button variant="contained" color="primary" onClick={onCreateRewardClick} className={classes.button}>
          Create reward
        </Button>
        <Button variant="contained" color="secondary" onClick={onEditClick} className={classes.button}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={onDeleteClick} className={classes.button}>
          Delete
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
      />

    </div>
  );
};

export default ActionButtonsContainer;
