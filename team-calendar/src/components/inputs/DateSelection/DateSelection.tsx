import React, { FC, useEffect, useState } from 'react';
import 'dayjs/locale/ru';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IDateTimeSelection } from './DateSelection.types';
import { EventSX } from '@Components/Modals/ContentModals/Event/stylesSX';
import { DesktopDatePicker } from '@mui/x-date-pickers';

export const DateSelection: FC<IDateTimeSelection> = ({ value, setValue, label, disabled }) => {
  const [locale, setLocale] = useState<string>('ru');
  const { i18n } = useTranslation();

  useEffect(() => {
    setLocale(i18n.language);
  }, [i18n]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DesktopDatePicker
        label={label}
        value={value}
        onChange={newValue => setValue(newValue)}
        disabled={disabled}
        renderInput={params => (
          <TextField sx={EventSX.dateTimeInput} variant='filled' {...params} />
        )}
      />
    </LocalizationProvider>
  );
};
