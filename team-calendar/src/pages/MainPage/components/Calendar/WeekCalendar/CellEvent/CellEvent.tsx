import { Box } from '@mui/material';
import { EventContainerSX, WeekCalendarSX } from '@Pages/MainPage/components/Calendar/WeekCalendar/WeekCalendar.styles';
import dayjs from 'dayjs';
import { CustomImage } from '@Components/CustomImage/CustomImage';
import bellIcon from '@Assets/images/icons/bell.svg';
import React, { FC } from 'react';
import { ICellEvent } from './CellEvent.types';
import { CustomTooltip } from '@Components/Tooltip/Tooltip';
import { EventInfo } from '@Pages/MainPage/components/TabLine/EventInfo/EventInfo';
import { IBookingFetch } from '@Pages/MainPage';

const CellEvent: FC<ICellEvent> = ({filteredBookings, currentBookings,  allTypes, isStartMinutesGreaterThan30, time, onEditEventClick}) => {

  const onEventClick = (booking?: IBookingFetch) => {
    booking && onEditEventClick(booking);
  };

  return (
    <Box sx={WeekCalendarSX.cell}>
      {filteredBookings?.map(booking => {
        const bookingColor = allTypes?.find(({ title }) => title === booking.bookingType)?.color;
        let eventSX = EventContainerSX(bookingColor!);
        const isNotStartCell = Number(dayjs(booking.startTime).format('HH')) < time;
        // Если время события по типу 9:30 и больше то событие начинается со второй половины ячейки (половина высоты)
        if(currentBookings?.length === 1 && isStartMinutesGreaterThan30) {
          eventSX = {
            ...eventSX,
            alignItems: 'center',
            height: '41%'
          }
        } else {
          eventSX = {
            ...eventSX,
            alignItems: 'center',
            height: '82%'
          }
        }
        if(isNotStartCell) {
          eventSX = {
            ...eventSX,
            alignItems: 'center',
            height: '82%'
          }
        }
        return (
        <CustomTooltip
          key={booking.id}
          title={
            <React.Fragment>
              <EventInfo event={booking}/>
            </React.Fragment>
          }>
          <Box key={booking.id} sx={eventSX} onClick={() => onEventClick(booking)}>
            <Box sx={WeekCalendarSX.titleContainer}>
              <CustomImage src={bellIcon}/>
              <Box sx={WeekCalendarSX.bookingTitle}>{booking.title}</Box>
            </Box>
            <Box>{dayjs(booking.startTime).format('HH:mm')}</Box>
          </Box>
        </CustomTooltip>
        );
      })}
    </Box>
  );
};

export default CellEvent;