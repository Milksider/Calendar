import React, { FC } from 'react';
import { Box } from '@mui/material';
import { ITabLine } from '@Pages/MainPage/components/Tab/TabLine.types';
import { TabLineSX } from './TabLineSX';

export const TabLine: FC<ITabLine> = ({ startTime, endTime, username, userBookings }) => {
  const timeCells = [];

  for (let i = startTime; i <= endTime; i++) {
    const isBookingTime = userBookings.some(booking => {
      return booking.time === i;
    });

    if (isBookingTime) {
      const currentBooking = () => {
        const booking = userBookings.filter(booking => booking.time === i);
        return booking[0].title;
      };
      timeCells.push(
        <Box key={i} sx={TabLineSX.bookingCell}>
          {currentBooking()}
        </Box>,
      );
    } else {
      timeCells.push(<Box key={i} sx={TabLineSX.cell} />);
    }
  }
  return (
    <>
      <Box sx={TabLineSX.userName}>{username}</Box>
      <Box sx={TabLineSX.timeCells}>{timeCells}</Box>
    </>
  );
};
