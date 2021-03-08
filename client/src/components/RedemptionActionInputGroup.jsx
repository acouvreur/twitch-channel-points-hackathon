import React, { useState } from 'react';
import {
  Button,
  List,
  ListItem,
  makeStyles, MenuItem, Select, Typography,
} from '@material-ui/core';
import RedemptionActionConf from './RedemptionActionConf';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addButton: {
    marginLeft: '2rem',
  },
});

const REDEMPTION_TYPES = ['Midi', 'Minecraft'];

const RedemptionActionInputGroup = ({ onChange, redemptionActions }) => {
  const classes = useStyles();
  const [redemptionType, setRedemptionType] = useState(REDEMPTION_TYPES[0]);

  const onSelectRedemptionType = (event) => {
    setRedemptionType(event.target.value);
  };

  const onActionChange = (index) => (action) => {
    console.log(action);
    redemptionActions.splice(index, 1, action);
    onChange([...redemptionActions]);
  };

  const onAddAction = () => {
    onChange([...redemptionActions, { type: redemptionType }]);
  };

  const onDelete = (index) => () => {
    redemptionActions.splice(index, 1);
    onChange([...redemptionActions]);
  };

  return (
    <>
      <div className={classes.header}>
        <Typography>Redemption actions: </Typography>
        <div>
          <Select
            labelId="redemption-type-label"
            id="redemption-type-select"
            value={redemptionType}
            onChange={onSelectRedemptionType}
          >
            {REDEMPTION_TYPES.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
          <Button className={classes.addButton} color="secondary" variant="contained" onClick={onAddAction}>Add</Button>
        </div>
      </div>
      <List>
        {
        redemptionActions.map(((action, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={index}>
            <RedemptionActionConf
              action={action}
              onChange={onActionChange(index)}
              onDelete={onDelete(index)}
            />
          </ListItem>
        )))
        }
      </List>
    </>
  );
};

export default RedemptionActionInputGroup;
