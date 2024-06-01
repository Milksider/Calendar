import React, {ChangeEvent, FC, memo, useEffect, useState} from 'react';
import { Box, TextField } from '@mui/material';
import { ContainedButton } from '@Components/buttons';
import { useTranslation } from 'react-i18next';
import { IAddEventType } from './ChangeEventType.types';
import { ChangeEventTypeSX } from './stylesSX';
import {
  MuiColorInput,
  MuiColorInputColors,
  MuiColorInputFormat,
} from 'mui-color-input';
import { useDeleteTypeMutation } from '@Store/types';
import { SupportModal } from '@Components/Modals';

export const ChangeEventType: FC<IAddEventType> = memo(({
                                                     setOpen,
                                                     setNewEventType,
                                                     typeData,
                                                   }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState<string>('#ffffff');
  const [isRemovedModal, setIsRemovedModal] = useState(false);

  const [deleteType] = useDeleteTypeMutation();

  useEffect(() => {
    if (typeData) {
      setTitle(typeData.title);
      setColor(typeData.color);
    }
  }, [typeData]);

  const handleChange = (newValue: string, colors: MuiColorInputColors) => {
    setColor(newValue);
  };

  const format: MuiColorInputFormat = 'hex';

  const onCancelClick = () => {
    setOpen(false);
  };

  const onSaveClick = () => {
    const data = {
      color: color,
      title,
    };

    setNewEventType(data);
    setOpen(false);
  };

  const onDeleteClick = () => {
    if (typeData) {
      const typeId = typeData.id;
      deleteType({
        title,
        id: typeId,
        color: color,
      });
      setOpen(false);
    }
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <Box sx={ChangeEventTypeSX.container}>
      <Box sx={ChangeEventTypeSX.title}>
        {t('app.components.modals.change_event_type.title')}
      </Box>

        <TextField
        label={t('app.labels.add_type')}
        variant='filled'
        value={title}
        onChange={onTitleChange}
        sx={ChangeEventTypeSX.textField}
      />

      <MuiColorInput variant='filled' value={color} onChange={handleChange} format={format} />
      <Box sx={ChangeEventTypeSX.buttonBlock}>
        {typeData && <>
          <SupportModal
            setIsConfirmModal={setIsRemovedModal}
            isConfirmModal={isRemovedModal}
            setOpenNestedModal={setOpen}
            description={t('app.components.modals.supportRemovedModal.description')}
            buttonName={t('app.button_labels.delete')}
            onDeleteHandle={onDeleteClick}
          />
        </>}

        <Box sx={ChangeEventTypeSX.containedBtn}>
          <ContainedButton onClick={onCancelClick}
                           buttonName={t('app.button_labels.cancel')} /></Box>
        <ContainedButton
          disabled={title === ''}
          onClick={onSaveClick}
          buttonName={t('app.button_labels.save')}
        />
      </Box>
    </Box>
  );
});

ChangeEventType.displayName = 'ChangeEventType';
