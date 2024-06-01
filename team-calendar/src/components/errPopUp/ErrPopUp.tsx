import React, { FC } from 'react';
import { Alert } from '@mui/material';
import { ErrPopUpSX } from '@Components/errPopUp/stylesSX';
import { IErrPopUp } from './ErrPopUp.types';

export const ErrPopUp: FC<IErrPopUp> = ({ message }) => {
  return (
    <Alert variant='outlined' severity='error' sx={ErrPopUpSX.alert}>
      {message}
    </Alert>
  );
};
