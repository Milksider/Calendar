import {Box} from "@mui/material";
import {
    ContainerSX, GreyBackgroundSX,
    MonthCalendarContainerSX, WrapperSX
} from "@Pages/MainPage/components/Calendar/MonthCalendar/MonthCalendar.styles";
import dayjs, { Dayjs } from 'dayjs';
import {CalendarCell} from "@Pages/MainPage/components/Calendar/MonthCalendar/CalendarCell/CalendarCell";
import {useDate} from "@Hooks/";
import React, {FC} from "react";
import {IMonthCalendar} from "@Pages/MainPage/components/Calendar/MonthCalendar/MonthCalendar.types";
import { MAX_DAYS } from '@Constants/';
import weekday from 'dayjs/plugin/weekday';
import {WeekDaysLine} from "@Pages/MainPage/components/Calendar/WeekDaysLine/WeekDaysLine";

export const MonthCalendar: FC<IMonthCalendar> = ({ bookings, allTypes }) => {
    // Расширить функционал dayjs плагином weekday, чтобы поставить начало недели с 1 а не с 0
    dayjs.extend(weekday);

    const { date, month, year } = useDate();
    const currentDate = dayjs().set('date', date).set('month', month - 1).set('year', year);
    const today = new Date();

    const startDay = currentDate.startOf('month').startOf('week').weekday(1);

    const daysArray = [];
    for (let index = 0; index < MAX_DAYS; index++) {
     const newDay = startDay.clone().add(index, 'day');
     daysArray.push(newDay.clone());
    }

  const renderCalendarCell = (day: Dayjs) => {
    const isBoundary = currentDate.month() !== day.month();
    const isToday = today.getDate() === day.date() && today.getMonth() === day.month();
    const dayBookings = bookings?.filter((booking) => {
      const bookingDate = new Date(booking.startTime);
      return bookingDate.getDate() === day.date() && bookingDate.getMonth() === day.month();
    });

    return (
      <CalendarCell
        key={day.unix()}
        day={day}
        isBoundary={isBoundary}
        isToday={isToday}
        bookings={dayBookings}
        allTypes={allTypes}
      />
    );
  };


  return (
      <Box sx={WrapperSX}>
          <WeekDaysLine />
          <Box sx={ContainerSX}>
              <Box sx={GreyBackgroundSX}>
                  <Box sx={MonthCalendarContainerSX}>
                      {
                          daysArray.map((day) => renderCalendarCell(day))
                      }
                  </Box>
              </Box>
          </Box>
      </Box>
  );
};
