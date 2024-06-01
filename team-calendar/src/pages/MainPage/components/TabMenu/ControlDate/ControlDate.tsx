import React, {FC, memo} from 'react';
import { Box, Button } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { DateTypes, IControlDate } from '@Pages/MainPage';
import { ControlDateSX } from './stylesSX';
import { HeaderButtonSX } from '@Components/buttons';
import { DateTitle } from '@Pages/MainPage/components/TabMenu/ControlDate/DateTitle/DateTitle';
import { useDate, useWeekDays } from '@Hooks/';
import { DateSelect } from '@Components/inputs';

const DATE_FORMATS = [
  'DATE_FORMAT_DAY',
  'DATE_FORMAT_WEEK',
  'DATE_FORMAT_MONTH'
];

export const ControlDate: FC<IControlDate> = memo(({
                                                dateType,
                                                setDateType,
}) => {
  const {
    date,
    month,
    year ,
    prevMonth,
    prevDay,
    nextMonth,
    nextDay
  } = useDate();
  const { nextWeek, prevWeek } = useWeekDays();

  const onBtnClick = (mode: 'next' | 'prev')=>{
    switch (dateType) {
      case DateTypes.DATE_FORMAT_MONTH:
        return mode === 'prev' ? prevMonth() : nextMonth();
      case DateTypes.DATE_FORMAT_WEEK:
        return mode === 'prev' ? prevWeek() : nextWeek();
      default:
        return mode === 'prev' ? prevDay() : nextDay();
    }
  }

  return (
    <Box sx={ControlDateSX.container}>
      <Button
        color='primary'
        variant='contained'
        size='small'
        sx={HeaderButtonSX.button}
        onClick={() => onBtnClick('prev')}>
        <ArrowBackIosIcon fontSize='small' />
      </Button>
      <DateTitle
        dateType={dateType}
        date={date}
        month={month}
        year={year}
      />

      <DateSelect
        value={dateType}
        setValue={setDateType}
        items={DATE_FORMATS}
      />

      <Button
        color='primary'
        variant='contained'
        size='small'
        sx={HeaderButtonSX.button}
        onClick={() => onBtnClick('next')}>
        <ArrowForwardIosIcon fontSize='small' />
      </Button>
    </Box>
  );
});

ControlDate.displayName = 'ControlDate';
