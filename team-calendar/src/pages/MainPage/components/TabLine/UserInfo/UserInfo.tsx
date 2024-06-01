import React, { FC } from 'react';
import { Avatar, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IUserInfo } from './UserInfo.types';
import { UserInfoSX } from './stylesSX';

export const UserInfo: FC<IUserInfo> = ({ user }) => {
  const { t } = useTranslation();
  const { username,email } = user;
  return (
    <>
      <Box sx={UserInfoSX.titleBox}>
        <Box sx={UserInfoSX.nameBox}>
          {username}
        </Box>
      </Box>
      <Box sx={UserInfoSX.infoBox}>
        <Box sx={UserInfoSX.boxBlock}>
          <Box sx={UserInfoSX.blockTitle}>{t('app.components.tooltips.email')}:</Box>
          {email}
        </Box>
      </Box>
    </>
  );
};
