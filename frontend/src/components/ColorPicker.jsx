import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { ChromePicker } from 'react-color';

const ColorPicker = ({
  id, label, variant, onChange,
}) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [color, setColor] = useState('#fff');

  const onTogglePickerVisible = () => {
    setPickerVisible(!pickerVisible);
  };

  const onColorChange = (newColor, event) => {
    console.log(newColor.hex);
    setColor(newColor.hex);
    onChange(newColor.hex);
  };

  return (
    <>
      <TextField
        onClick={onTogglePickerVisible}
        id={id}
        label={label}
        variant={variant}
        value={color}
        style={{
          color,
        }}
      />
      {pickerVisible && (
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', zIndex: '2' }}>
          <ChromePicker onChange={onColorChange} color={color} disableAlpha />
        </div>
      </div>
      )}
    </>
  );
};

export default ColorPicker;
