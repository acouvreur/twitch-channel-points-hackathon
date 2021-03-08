import React from 'react';
import { MenuItem, Select, TextField } from '@material-ui/core';
import { MINECRAFT_POTION_EFFECTS } from '../data/constants';

const MinecraftRedemptionAction = ({ action, onChange }) => {
  const onSelectPotionType = (event) => {
    console.log({ ...action, params: { ...action.params, effect: event.target.value } });
    onChange({ ...action, params: { ...action.params, effect: event.target.value } });
  };

  const onDurationChange = (event) => {
    console.log({ ...action, params: { ...action.params, duration: event.target.value } });
    onChange({ ...action, params: { ...action.params, duration: event.target.value } });
  };

  return (
    <>
      <Select
        labelId="redemption-type-label"
        id="redemption-type-select"
        value={action?.params?.effect || MINECRAFT_POTION_EFFECTS[0]}
        onChange={onSelectPotionType}
      >
        {MINECRAFT_POTION_EFFECTS.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
      </Select>
      <TextField id="maxRedemptionsPerUserPerStream" label="Maximum redemption per stream" variant="outlined" defaultValue="0" onChange={onDurationChange} />
    </>
  );
};

export default MinecraftRedemptionAction;
