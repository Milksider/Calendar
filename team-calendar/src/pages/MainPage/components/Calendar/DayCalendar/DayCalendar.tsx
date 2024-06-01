import { MainPageSX } from '@Pages/MainPage/stylesSX';
import { HeaderTab, IBookingFetch, TabLine } from '@Pages/MainPage';
import { Box } from '@mui/material';
import React, { FC } from 'react';
import { IDayCalendar } from '@Pages/MainPage/components/Calendar/DayCalendar/DayCalendar.types';
import { DEFAULT_LINE_HEIGHT, HEIGHT_TOP_ELEMENTS } from '@Constants/';
import { formatDate } from '@Pages/lib/date';
import { useSelector } from 'react-redux';
import { getCurrentDateAllData } from '@Store/date/selectors/dateSelectors';

export const DayCalendar: FC<IDayCalendar> = (props) => {
  const {
    bookings,
    onEditUserClick, onEditEventClick,
    allTypes,
    users} = props;
  const { date, month, year } = useSelector(getCurrentDateAllData);

  const currentDate = `${formatDate(date)}/${formatDate(month - 1)}/${year}`;

  const innerHeight = window.innerHeight - HEIGHT_TOP_ELEMENTS;
  const heightLine = () => {
    if (users && innerHeight / users.length > DEFAULT_LINE_HEIGHT) {
      return innerHeight / users.length;
    }
    return DEFAULT_LINE_HEIGHT;
  };

  const getStartDate = (booking: IBookingFetch) => {
    const bookingStartDate = new Date(booking.startTime);
    const date = bookingStartDate.getDate();
    const month = bookingStartDate.getMonth();
    const year = bookingStartDate.getFullYear();

    return `${formatDate(date)}/${formatDate(month)}/${year}`;
  };

  return (
    <Box sx={[MainPageSX.tabContainer, MainPageSX.tabContainerWebkit]}>
      {/* Компонент со стройкой времени от 8 до 20 */}
      <HeaderTab />
      {/* Отрисовка ячеек */}
      <Box sx={{ height: innerHeight }}>
        {users?.map(user => {
          const dateBookings = bookings
            ? bookings.filter(booking => getStartDate(booking) === currentDate)
            : [];

          const userBookings = dateBookings.filter(booking =>
            booking.users.some(bookingUser => bookingUser.id === user.id),
          );
          return (
            <Box
              key={user.id}
              sx={[{ height: heightLine() }, MainPageSX.tabLineBox, MainPageSX.tabLineBoxHover]}>
              <TabLine
                allTypes={allTypes}
                user={user}
                userBookings={userBookings}
                onEditEventClick={onEditEventClick}
                onEditUserClick={onEditUserClick}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
