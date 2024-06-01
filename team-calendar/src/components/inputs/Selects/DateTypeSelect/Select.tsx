import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import React, { FC } from 'react';
import { ISmallSelect } from '@Components/inputs/Selects/DateTypeSelect/Select.types';
import { useTranslation } from 'react-i18next';
import { DateTypes } from '@Pages/MainPage/components/TabMenu/ControlDate';

export const DateSelect: FC<ISmallSelect> = ({ value, setValue, items }) => {

  const { t } = useTranslation();
  const handleChangeValue = (event: SelectChangeEvent) => {
    setValue(DateTypes[event.target.value as keyof typeof DateTypes])
  }

  return (
    <Select
      value={value}
      onChange={handleChangeValue}
      displayEmpty
    >
      {items.map((item, index) => {
        return (
          <MenuItem key={item + index} value={item}>{t(`app.dateTypes.${item}`)}</MenuItem>
        )
      })}
    </Select>
  );
};
