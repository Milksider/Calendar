import React, { FC } from 'react';
import { Box } from '@mui/material';
import { EventInfoSX } from './stylesSX';
import { IEventInfo } from './EventInfo.types';
import dayjs from 'dayjs';

export const EventInfo: FC<IEventInfo> = ({ event }) => {
 const { title, description, startTime, endTime, users } = event;

  return (
    <Box sx={EventInfoSX.container}>
      <Box sx={EventInfoSX.fontBold}>{title}</Box>
      <Box>{description}</Box>
      <Box sx={EventInfoSX.fontBold}>
        {dayjs(startTime).format('HH:mm')} - {dayjs(endTime).format('HH:mm')}
      </Box>
      <Box>
        {users.map(({id,username }) => {
          return (
            <Box key={id} sx={EventInfoSX.userBox}>
              <Box sx={EventInfoSX.userName}>{username}</Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
