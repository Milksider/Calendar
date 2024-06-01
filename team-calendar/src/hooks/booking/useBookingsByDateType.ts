import { DateTypes } from '@Pages/MainPage';
import { END_TIME, MONTH_INDEX_DIFF, START_TIME } from '@Constants/';
import { useLazyFetchBookingsQuery } from '@Store/bookings';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getFormattedDateTime } from '@Store/bookings/lib/booking';
import { getCurrentDateAllData } from '@Store/date/selectors/dateSelectors';
import dayjs from 'dayjs';

export const useBookingsByDateType = (dateType: DateTypes) => {
  const { date, month, year, week } = useSelector(getCurrentDateAllData);

  const [updateBookings, { data: bookings }] = useLazyFetchBookingsQuery();

  useEffect(() => {
    if (dateType === DateTypes.DATE_FORMAT_DAY) {
      const startTime = getFormattedDateTime(year, month - 1, date, START_TIME);
      const endTime = getFormattedDateTime(year, month - 1, date, END_TIME);

      updateBookings({ startTime, endTime });
    }

    if (dateType === DateTypes.DATE_FORMAT_WEEK) {
      const startTime = week.firstWeekDay;
      const endTime = week.lastWeekDay;
      updateBookings({ startTime, endTime });
      // if (weekDays) {
      //   const [firstDay, lastDay] = getWeekBoundaryDates(weekDays, year);
      //
      //   updateBookings({ startTime: firstDay, endTime: lastDay });
      // }
    }

    if (dateType === DateTypes.DATE_FORMAT_MONTH) {
      const firstDayOfMonth = 1;
      const lastDayOfMonth = Number(
        dayjs()
          .set('month', month - MONTH_INDEX_DIFF)
          .endOf('month')
          .format('DD'),
      );

      const startTime = getFormattedDateTime(
        year,
        month - MONTH_INDEX_DIFF,
        firstDayOfMonth,
        START_TIME,
      );

      const endTime = getFormattedDateTime(
        year,
        month - MONTH_INDEX_DIFF,
        lastDayOfMonth,
        END_TIME,
      );

      updateBookings({ startTime, endTime });
    }
  }, [dateType, date, month, year]);

  return { bookings };
};
