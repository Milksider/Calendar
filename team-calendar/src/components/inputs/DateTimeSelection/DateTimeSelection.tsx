import React, { FC, useEffect, useState } from 'react';
import 'dayjs/locale/ru';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IDateTimeSelection } from './DateTimeSelection.types';
import { EventSX } from '@Components/Modals/ContentModals/Event/stylesSX';

export const DateTimeSelection: FC<IDateTimeSelection> = ({
  value,
  setValue,
  label,
  disabled,
  minDateTime,
}) => {
  const [locale, setLocale] = useState<string>('ru');
  const { i18n } = useTranslation();

  useEffect(() => {
    setLocale(i18n.language);
  }, [i18n]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={newValue => setValue(newValue)}
        disabled={disabled}
        ampm={false}
        minDateTime={minDateTime}
        renderInput={params => (
          <TextField sx={EventSX.dateTimeInput} variant="outlined" {...params} />
        )}
      />
    </LocalizationProvider>
  );
};
