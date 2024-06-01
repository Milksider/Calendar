import { ControlDateSX } from '@Pages/MainPage/components/TabMenu/ControlDate/stylesSX';
import { Box } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';
import i18next from 'i18next';
import { IDateTitle } from '@Pages/MainPage/components/TabMenu/ControlDate/DateTitle/DateTitle.types';
import { DateTypes } from '@Pages/MainPage/components/TabMenu/ControlDate';
import { formatDate } from '@Pages/lib/date';
import { getCurrentWeek } from '@Store/date/selectors/dateSelectors';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

export const DateTitle: FC<IDateTitle> = ({dateType, date, month, year}) => {

  const {  firstWeekDay, lastWeekDay } = useSelector(getCurrentWeek);
  const [ language, setLanguage ] = useState(false);

  useEffect(() => {
    i18next.on("languageChanged", () => setLanguage(prev => !prev));

    return () => {
      i18next.off("languageChanged");
    }
  }, []);

  const currentWeekDaysTitle = useMemo(() => {
    const firstWeekDate = dayjs(firstWeekDay).format('DD');
    const lastWeekDate = dayjs(lastWeekDay).format('DD');
    const firstWeekMonth = dayjs(firstWeekDay).locale(i18next.language).format('MMMM');
    const lastWeekMonth = dayjs(lastWeekDay).locale(i18next.language).format('MMMM');
    return `${firstWeekDate} ${firstWeekMonth} - ${lastWeekDate} ${lastWeekMonth}`;
  }, [firstWeekDay, lastWeekDay, language])

  const currentDayTitle = () => {
    return `${formatDate(date)}.${formatDate(month)}.${year}`;
  };

  const currentMonthTitle = () => {
    return new Date(0, month, 0).toLocaleString(i18next.language, {month: 'long'});
  };

  const currentDateTitleFormatted = useMemo(() => {
    switch (dateType) {
      case DateTypes.DATE_FORMAT_DAY:
        return currentDayTitle();
      case DateTypes.DATE_FORMAT_WEEK:
        return currentWeekDaysTitle;
      case DateTypes.DATE_FORMAT_MONTH:
        return currentMonthTitle();
    }
  }, [dateType, date, month, language])

  return (
    <Box sx={ControlDateSX.dateBox}>{currentDateTitleFormatted}</Box>
  );
};