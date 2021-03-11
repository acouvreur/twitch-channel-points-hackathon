import React from 'react';
import { MenuItem, Select, TextField } from '@material-ui/core';
import { MINECRAFT_POTION_EFFECTS, WEATHER_TYPES } from '../data/constants';

const MinecraftWeatherParams = ({ action, onChange }) => {
  const onWeatherChange = (event) => {
    console.log({ ...action, params: { ...action.params, weather: event.target.value } });
    onChange({ ...action, params: { ...action.params, weather: event.target.value } });
  };

  return (
    <Select
      labelId="redemption-effect-label"
      id="redemption-effect-select-weather"
      value={action?.params?.weather || WEATHER_TYPES[0]}
      onChange={onWeatherChange}
    >
      {WEATHER_TYPES.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
    </Select>
  );
};

const MinecraftPotionParams = ({ action, onChange }) => {
  const onSelectEffectType = (event) => {
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
        labelId="redemption-effect-label"
        id="redemption-effect-select-potion"
        value={action?.params?.effect || MINECRAFT_POTION_EFFECTS[0]}
        onChange={onSelectEffectType}
      >
        {MINECRAFT_POTION_EFFECTS.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
      </Select>
      <TextField id="duration" label="Duration" variant="outlined" defaultValue="" onChange={onDurationChange} />
    </>
  );
};

const MinecraftRedemptionActionParams = ({ type, action, onChange }) => {
  if (type === 'potion') {
    return (
      <MinecraftPotionParams
        onChange={onChange}
        action={action}
      />
    );
  }
  return (
    <MinecraftWeatherParams
      onChange={onChange}
      action={action}
    />
  );
};

const MinecraftRedemptionAction = ({ action, onChange }) => {
  const onSelectMinecraftType = (event) => {
    console.log({ ...action, params: { ...action.params, type: event.target.value } });
    onChange({ ...action, params: { ...action.params, type: event.target.value } });
  };

  return (
    <>
      <Select
        labelId="redemption-type-label"
        id="redemption-type-select"
        value={action?.params?.type || 'weather'}
        onChange={onSelectMinecraftType}
      >
        <MenuItem value="weather">weather</MenuItem>
        <MenuItem value="potion">potion</MenuItem>
      </Select>
      <MinecraftRedemptionActionParams
        type={action?.params?.type}
        action={action}
        onChange={onChange}
      />
    </>
  );
};

export default MinecraftRedemptionAction;
