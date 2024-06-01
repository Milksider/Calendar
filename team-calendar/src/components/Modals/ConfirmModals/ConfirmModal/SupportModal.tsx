import { FC } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { IChildModal } from '@Components/Modals';
import { SupportModalSX } from './stylesSX';
import { ModalsSX } from '@Components/Modals/stylesSX';

export const SupportModal: FC<IChildModal> = ({
                                                setIsConfirmModal = () => {
                                                  return;
                                                },
                                                isConfirmModal,
                                                setOpenNestedModal,
                                                description,
                                                buttonName,
                                                onDeleteHandle,
                                                disabled
                                              }) => {
  const { t } = useTranslation();

  const handleOpen = () => {
    isConfirmModal === undefined ? setOpenNestedModal(false) : setIsConfirmModal(true);
  };

  const handleClose = () => {
    setIsConfirmModal(false);
    setOpenNestedModal(false);
    onDeleteHandle && onDeleteHandle();
  };

  const handleCancelClose = () => {
    setIsConfirmModal(false);
  };

  return (
    <React.Fragment>
      <Button
        disabled={disabled}
        onClick={handleOpen}
        variant={'contained'}
        color={'primary'}
        sx={SupportModalSX.button}>
        {buttonName}
      </Button>
      <Modal
        hideBackdrop
        open={isConfirmModal ? isConfirmModal : false}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'>
        <Box sx={[ModalsSX.modal, SupportModalSX.containerBox]}>
          <Box sx={SupportModalSX.messageBox}>{description}</Box>
          <Box sx={SupportModalSX.buttonContainer}>
            <Button type={'submit'} variant={'contained'} color={'primary'}
                    onClick={handleClose}>
              {t('app.button_labels.confirm')}
            </Button>
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}
              onClick={handleCancelClose}>
              {t('app.button_labels.cancel')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
