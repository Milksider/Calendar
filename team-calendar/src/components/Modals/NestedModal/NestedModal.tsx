import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC, PropsWithChildren } from 'react';
import { ModalsSX } from '@Components/Modals/stylesSX';
import { INestedModal } from '@Components/Modals/Modals.types';

export const NestedModal: FC<PropsWithChildren<INestedModal>> = ({
  children,
  open,
  setIsConfirmModal,
}) => {
  const onBackdrop = () => {
    setIsConfirmModal(true);
  };

  return (
    <Modal
      open={open}
      onClose={onBackdrop}
      onBackdropClick={onBackdrop}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'>
      <Box sx={[ModalsSX.modal]}>{children}</Box>
    </Modal>
  );
};
