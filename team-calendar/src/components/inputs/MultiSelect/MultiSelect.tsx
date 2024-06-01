import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, useMediaQuery } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IMultipleSelect } from './MultiSelect.types';
import { MultiSelectSX } from './stylesSx';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const MultipleSelect: FC<IMultipleSelect> = ({ personName, setPersonName, values }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const matches = useMediaQuery('(min-width:1504px)');
  const filteredValues = Array.from(new Set(values));

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <Box sx={!matches ? MultiSelectSX.formContainer : {maxWidth:'420px',marginRight:'6px'}}>

      <FormControl
        sx={
          matches ? MultiSelectSX.formControl : [MultiSelectSX.formControl, MultiSelectSX.matches]
        }>
        <InputLabel id='demo-multiple-name-label'>{t('app.labels.members')}</InputLabel>
        <Select
          labelId='demo-multiple-name-label'
          id='demo-multiple-name'
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label={t('app.labels.members')} />}
          MenuProps={MenuProps}>
          {filteredValues.map((value, i) => (
            <MenuItem key={value + i} value={value} style={getStyles(value, personName, theme)}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
