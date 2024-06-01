import { TimeLine } from './TimeLine/TimeLine';
import { END_TIME, START_TIME } from '@Constants/';
import { Box } from '@mui/material';
import {WeekCalendarSX} from './WeekCalendar.styles';
import { IWeekCalendar } from './WeekCalendar.types';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import {WeekDaysLine} from "../WeekDaysLine/WeekDaysLine";
import CellEvent from './CellEvent/CellEvent';
import { useSelector } from 'react-redux';
import { getCurrentWeek } from '@Store/date/selectors/dateSelectors';

export const WeekCalendar: FC<IWeekCalendar> = ({ bookings, allTypes, onEditEventClick }) => {
  const {  firstWeekDay, lastWeekDay } = useSelector(getCurrentWeek);
  const eventCells = [];

  const onEmptyCellClick = (time: number, day: number) => {
    const eventType = allTypes ? allTypes[0].title : '';
    const startTime = dayjs(firstWeekDay).add(day - 1, 'day').add(time, 'hour').toISOString();

    const newBookingData = {
      title: '',
      bookingType: eventType,
      description: '',
      users: [],
      startTime: startTime,
      endTime: '',
    };
    onEditEventClick(newBookingData);
  };

  for (let time = START_TIME; time <= END_TIME; time++) {

    for (let j = 1; j <= 7; j++) {
      // Получаеям все события время которых совпадает с текущим (от START_TIME до END_TIME)
      const currentBookings = bookings?.filter(booking => {
        return (
          (time >= Number(dayjs(booking.startTime).format('HH')) &&
          time <= Number(dayjs(booking.endTime).format('HH'))) &&
          dayjs(booking.startTime).day() === j
        );
      });
      if(currentBookings !== undefined) {
        // Фильтруем события, чтобы в ячейке не выводились пересекающиеся по времени события
        const maxTime = Math.max(...currentBookings.map(booking => Number(dayjs(booking.startTime).format('HH'))));
        const filteredBookings = currentBookings.filter(booking => Number(dayjs(booking.startTime).format('HH')) === maxTime);
        // Проверяем с какой минуты начинается событие, в зависимости от этого меняем стили
        let isStartMinutesGreaterThan30 = false;

        if (currentBookings.length > 0) {
          const startTime = currentBookings[0].startTime;
          const minutes = Number(dayjs(startTime).format('mm'));
          isStartMinutesGreaterThan30 = minutes >= 30;

          if(currentBookings?.length === 1) {
            if(isStartMinutesGreaterThan30) {
              WeekCalendarSX.cell = {
                ...WeekCalendarSX.cell,
                justifyContent: 'end'
              }
            }

          }
          // filteredBookings Для отрисовки пересекающихся событий в ячейке
          // currentBookings Для отрисовки просто событий в ячейке
          eventCells.push(
            <CellEvent
              filteredBookings={filteredBookings}
              currentBookings={currentBookings}
              allTypes={allTypes}
              isStartMinutesGreaterThan30={isStartMinutesGreaterThan30}
              time={time}
              onEditEventClick={onEditEventClick}
            />,
          );

        } else {
          eventCells.push(
            <Box sx={WeekCalendarSX.cell} onClick={() => onEmptyCellClick(time, j)}></Box>
          )
        }
      }
    }
  }
  return (
      <Box sx={WeekCalendarSX.calendar}>
        <WeekDaysLine />
          <Box sx={WeekCalendarSX.container}>
            <TimeLine />
            <Box sx={WeekCalendarSX.bookingCellsContainer}>{eventCells}</Box>
          </Box>
      </Box>
  );
};
