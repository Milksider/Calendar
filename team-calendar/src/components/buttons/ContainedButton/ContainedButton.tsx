import React, { FC } from 'react';
import { Button } from '@mui/material';

export interface IContainedButton {
  buttonName: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
}

export const ContainedButton: FC<IContainedButton> = ({
  buttonName,
  onClick,
  type,
  disabled = false,
}) => {
  return (
    <Button
      disabled={disabled}
      type={type}
      onClick={onClick}
      variant={'contained'}
      color={'primary'}>
      {buttonName}
    </Button>
  );
};
