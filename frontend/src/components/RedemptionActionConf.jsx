import React from 'react';
import {
  IconButton,
  makeStyles, Paper, Typography, useTheme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MidiRedemptionAction from './MidiRedemptionAction';
import MinecraftRedemptionAction from './MinecraftRedemptionAction';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0.5rem',
    '& > *': {
      margin: '0.5rem 0',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const ActionConfContainer = ({ onDelete, title, children }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Paper className={classes.container} variant="outlined">
      <div className={classes.header}>
        <Typography>{title}</Typography>
        <IconButton
          aria-label="delete"
          style={{
            backgroundColor: theme.palette.error.main,
          }}
          size="small"
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      {children}
    </Paper>
  );
};

const RedemptionActionConf = ({ action, onChange, onDelete }) => {
  if (action.plugin === 'midi') {
    return (
      <ActionConfContainer onDelete={onDelete} title="Midi">
        <MidiRedemptionAction action={action} onChange={onChange} />
      </ActionConfContainer>
    );
  }

  if (action.plugin === 'minecraft') {
    return (
      <ActionConfContainer onDelete={onDelete} title="Minecraft">
        <MinecraftRedemptionAction action={action} onChange={onChange} />
      </ActionConfContainer>
    );
  }
  return null;
};

export default RedemptionActionConf;
