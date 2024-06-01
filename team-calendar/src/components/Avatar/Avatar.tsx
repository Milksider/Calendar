import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { IBadgeAvatars } from './Avatar.types';


export const BadgeAvatar: FC<IBadgeAvatars> = ({ ava, status }) => {
  const badgeColor = () => {
    if (status === 'app.components.modals.add_user_modal.statuses.vacation') {
      return '#d92348';
    }
    if (status === 'app.components.modals.add_user_modal.statuses.work') {
      return '#44b700';
    }

    if (status === 'app.components.modals.add_user_modal.statuses.sicLeave') {
      return 'blue';
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: badgeColor(),
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));
  return (
    <Stack direction='row' spacing={2}>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        variant='dot'>
        <Avatar alt='Remy Sharp' src={ava} style={{ width: '2vw', height: '2vw' }} />
      </StyledBadge>
    </Stack>
  );
};
