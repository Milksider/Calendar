import React, { FC } from 'react';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ViewRepeatSX } from './stylesSX';
import { IViewRepeat } from './ViewRepeat.types';

export const ViewRepeat: FC<IViewRepeat> = ({ repeatStart, repeatEnd, selectedDates }) => {
  const { t } = useTranslation();
  return (
    <Box style={ViewRepeatSX.container}>
      <Box sx={ViewRepeatSX.day}>
        {repeatStart !== null && dayjs(repeatStart).format('DD/MM/YYYY')}
      </Box>
      <Box sx={ViewRepeatSX.day}>{repeatEnd !== null && dayjs(repeatEnd).format('DD/MM/YYYY')}</Box>
      {selectedDates.length > 0 &&
        selectedDates.map(day => {
          return (
            <Box key={day[0]} sx={ViewRepeatSX.day}>
              {t(`app.components.modals.add_event_modal.setting_dates.${day[0]}`)}
            </Box>
          );
        })}
    </Box>
  );
};
