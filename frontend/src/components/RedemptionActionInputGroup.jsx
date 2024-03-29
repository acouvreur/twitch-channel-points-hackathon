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
    alignItems: 'center',
  },
  addButton: {
    marginLeft: '2rem',
  },
  item: {
    padding: '0.5rem 0',
  },
  select: {
    minWidth: '10rem',
  },
});

const REDEMPTION_TYPES = ['midi', 'minecraft'];

const RedemptionActionInputGroup = ({ onChange, redemptionActions }) => {
  const classes = useStyles();
  const [redemptionType, setRedemptionType] = useState(REDEMPTION_TYPES[0]);

  const onSelectRedemptionType = (event) => {
    setRedemptionType(event.target.value);
  };

  const onActionChange = (index) => (action) => {
    redemptionActions.splice(index, 1, action);
    onChange([...redemptionActions]);
  };

  const onAddAction = () => {
    onChange([...redemptionActions, { plugin: redemptionType }]);
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
            className={classes.select}
          >
            {REDEMPTION_TYPES.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
          <Button className={classes.addButton} color="secondary" variant="contained" onClick={onAddAction}>Add</Button>
        </div>
      </div>
      <List className={classes.list}>
        {
        redemptionActions.map(((action, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem key={index} className={classes.item}>
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
