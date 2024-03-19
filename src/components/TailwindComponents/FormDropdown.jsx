'use client'
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown2 = ({ options, onSelect, name }) => {
  const [selectedOption, setSelectedOption] = useState('');

  console.log(23,options)

  const handleOptionSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <FormControl   className="w-full " size="small">
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select 
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        onChange={(e) => handleOptionSelect(e.target.value)}
        label={name}
      >
        <MenuItem value="" disabled>
          {name}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown2;
