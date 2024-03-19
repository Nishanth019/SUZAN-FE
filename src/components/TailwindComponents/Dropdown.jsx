'use client'
import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Dropdown = ({ options, onSelect, name , disabled}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionSelect = (selectedValue) => {
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <FormControl className="max-md:w-full w-[250px]" size="small">
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
      disabled = {disabled}
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

export default Dropdown;
