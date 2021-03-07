import React from 'react';
import MidiRedemptionAction from './MidiRedemptionAction';
import MinecraftRedemptionAction from './MinecraftRedemptionAction';

const RedemptionActionConf = ({ action, onChange }) => {
  if (action.type === 'Midi') {
    return <MidiRedemptionAction action={action} onChange={onChange} />;
  }

  if (action.type === 'Minecraft') {
    return <MinecraftRedemptionAction action={action} onChange={onChange} />;
  }
  return null;
};

export default RedemptionActionConf;
