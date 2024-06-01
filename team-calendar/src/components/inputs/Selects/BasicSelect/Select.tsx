import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FC } from 'react';
import { IBasicSelect } from '@Components/inputs/Selects/BasicSelect/Select.types';
import { SelectSX } from '@Components/inputs/Selects/BasicSelect/stylesSX';

export const BasicSelect: FC<IBasicSelect> = ({ statuses, value, label, setValue }) => {
  const handleChange = (event: { target: { value: string } }) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Box sx={SelectSX.container}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={value ?? ''}
            label={label}
            onChange={handleChange}
            // variant='filled'
            variant="outlined"
            sx={SelectSX.select}>
            {statuses &&
              statuses.map((status, index) => {
                return (
                  <MenuItem key={status + index} value={status} sx={SelectSX.menu}>
                    {status}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
