import React, { FC } from 'react';
import { ICalendarContainer } from './CalendarContainer.types';
import { DateTypes } from '@Pages/MainPage';
import { DayCalendar } from '@Pages/MainPage/components/Calendar/DayCalendar';
import { MonthCalendar } from '@Pages/MainPage/components/Calendar/MonthCalendar/MonthCalendar';
import { WeekCalendar } from '@Pages/MainPage/components/Calendar/WeekCalendar/WeekCalendar';

export const CalendarContainer: FC<ICalendarContainer> = props => {
  const { dateType, bookings, onEditUserClick, onEditEventClick, allTypes, users } = props;
  let content = null;

  const dayContent = (
    <DayCalendar
      onEditEventClick={onEditEventClick}
      onEditUserClick={onEditUserClick}
      allTypes={allTypes}
      bookings={bookings}
      users={users}
    />
  );

  const monthContent = (
      <MonthCalendar bookings={bookings} allTypes={allTypes} />
  )

  const weekContent = (
      <WeekCalendar bookings={bookings} allTypes={allTypes} onEditEventClick={onEditEventClick}/>
  )

  if (dateType === DateTypes.DATE_FORMAT_DAY) {
    content = dayContent;
  }
  if (dateType === DateTypes.DATE_FORMAT_MONTH) {
    content = monthContent;
  }
  if (dateType === DateTypes.DATE_FORMAT_WEEK) {
    content = weekContent;
  }

  return <>{content}</>;
};
