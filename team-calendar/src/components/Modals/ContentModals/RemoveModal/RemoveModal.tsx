import React, { FC, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SupportModalSX } from '@Components/Modals/ConfirmModals/ConfirmModal/stylesSX';
import { BasicSelect } from '@Components/inputs';
import { RemoveModalSX } from './stylesSX';
import { IRemoveUser } from './RemoveModal.types';
import { SupportModal } from '@Components/Modals';

export const RemoveModal: FC<IRemoveUser> = ({ setOpen, list, onRemove, label }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [isRemovedModal, setIsRemovedModal] = useState(false);

  const onCancel = () => {
    setOpen(false);
  };

  const onRemoveClick = () => {
    onRemove(value);
  };

  return (
    <Box>
      <Box sx={RemoveModalSX.title}>{label}</Box>
      <BasicSelect
        label={label}
        value={value}
        setValue={setValue}
        statuses={list ? list : ['']}
      />
      <Box sx={RemoveModalSX.buttonsBox}>
        <Button
          onClick={onCancel}
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          sx={SupportModalSX.button}>
          {t('app.button_labels.cancel')}
        </Button>

        <SupportModal
          setIsConfirmModal={setIsRemovedModal}
          isConfirmModal={isRemovedModal}
          setOpenNestedModal={setOpen}
          description={`${t('app.components.modals.supportRemovedModal.description')} ${value}`}
          buttonName={t('app.button_labels.delete')}
          onDeleteHandle={onRemoveClick}
          disabled={value === ''}
        />
      </Box>
    </Box>
  );
};
