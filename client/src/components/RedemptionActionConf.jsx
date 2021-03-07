import React from 'react';
import MinecraftRedemptionAction from './MinecraftRedemptionConf';

const RedemptionActionConf = ({ action, onChange }) => {
  if (action.type === 'Minecraft') {
    return <MinecraftRedemptionAction action={action} onChange={onChange} />;
  }
  return null;
};

export default RedemptionActionConf;
