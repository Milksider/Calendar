import React, { FC, memo, useEffect, useState } from 'react';
import { Box, FormControl, FormGroup, Grid, IconButton, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  IAddEventInitialValues,
  IAddUser,
  IEditEvent,
  IErrAddEventType,
  ITypes,
  NestedModal,
  RemoveModal,
  SupportModal,
  UserSX,
} from '@Components/Modals';
import { ErrPopUp } from '@Components/errPopUp';
import dayjs, { Dayjs } from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { BasicSelect, DateTimeSelection, MultipleSelect } from '@Components/inputs';
import { ContainedButton } from '@Components/buttons';
import { ChangeEventType } from '@Components/Modals/ContentModals';
import { EventSX } from './stylesSX';
import {
  useCreateBookingMutation,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} from '@Store/bookings';
import { useCreateTypeMutation, useDeleteTypeMutation } from '@Store/types';
import { useBooleanState } from '@Hooks/';

export const Event: FC<IAddUser & IEditEvent> = memo(
  ({ setIsConfirmModal, isConfirmModal, setOpen, currentBooking, users: members, allTypes }) => {
    const [startDateTime, setStartDateTime] = useState<Dayjs | null>(null);
    const [endDateTime, setEndDateTime] = useState<Dayjs | null>(null);
    const { value: isAddEventTypeModal, changeValue: changeIsAddEventTypeModal } =
      useBooleanState();
    const { value: isDeleteEventTypeModal, changeValue: changeIsDeleteEventTypeModal } =
      useBooleanState();
    const { value: isRemovedModal, changeValue: changeIsRemovedModal } = useBooleanState();
    const [personName, setPersonName] = useState<string[]>([]);

    const [createBooking] = useCreateBookingMutation();
    const [updateBooking] = useUpdateBookingMutation();
    const [deleteBooking] = useDeleteBookingMutation();
    const [createType] = useCreateTypeMutation();
    const [deleteType] = useDeleteTypeMutation();
    const { t } = useTranslation();

    const errors: IErrAddEventType = {};

    const valid = (values: IAddEventInitialValues) => {
      if (!values.title) {
        errors.title = t('app.err_messages.empty_field');
      } else if (isNotValid(startDateTime) && values.startTime !== null) {
        errors.startTime = t('app.err_messages.date_time_picker');
      } else if (values.startTime === null) {
        errors.startTime = t('app.err_messages.empty_field');
      } else if (isNotValid(endDateTime) && values.endTime !== null) {
        errors.endTime = t('app.err_messages.date_time_picker');
      } else if (values.endTime === null) {
        errors.endTime = t('app.err_messages.empty_field');
      } else if (values.users.length < 1) {
        errors.users = t('app.err_messages.members');
      }
      return errors;
    };

    const formatStatuses = () => allTypes?.map(({ title }) => title);

    const formik = useFormik({
      initialValues: {
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        bookingType: currentBooking ? currentBooking.bookingType : allTypes[0].title,
        types: currentBooking ? formatStatuses() : [allTypes[0].title],
        users: [],
      },

      validate: values => valid(values),

      onSubmit: values => {
        if (!isRemovedModal && members) {
          const { title, description, bookingType, endTime, startTime } = values;
          const membersData = members.filter(({ username }) => {
            return personName.includes(`${username}`);
          });
          const membersIds = membersData.map(member => String(member.id));

          const data = {
            title: title,
            description: description,
            bookingType: bookingType,
            endTime: dayjs(endTime).toISOString(),
            startTime: dayjs(startTime).toISOString(),
            users: membersIds,
          };

          currentBooking?.id
            ? updateBooking({
                ...data,
                id: currentBooking.id,
              })
            : createBooking(data);
        }

        !isRemovedModal && setOpen(false);
      },
    });

    useEffect(() => {
      // Проверка: если стартовая дата позже конечной очистить поле конечной
      const isAfter = dayjs(startDateTime).isAfter(dayjs(endDateTime));
      if (isAfter) {
        setEndDateTime(null);
        formik.setFieldValue('end', null);
      }
    }, [startDateTime]);

    useEffect(() => {
      formik.setFieldValue('types', formatStatuses());
    }, [allTypes]);

    useEffect(() => {
      if (currentBooking) {
        const { title, description, startTime, endTime, bookingType, users } = currentBooking;

        formik.setFieldValue('title', title);
        formik.setFieldValue('description', description);

        const startDateTime = `${startTime}`;
        setStartDateTime(dayjs(startDateTime));
        formik.setFieldValue('startTime', startDateTime);

        const endDateTime = `${endTime}`;
        setEndDateTime(dayjs(endDateTime));
        formik.setFieldValue('endTime', endDateTime);
        formik.setFieldValue('bookingType', bookingType);

        formik.setFieldValue('types', formatStatuses());

        const membersNames = users.map(({ username }) => `${username}`);

        setPersonName(membersNames);
        formik.setFieldValue('users', membersNames);
      }
    }, [currentBooking]);

    const userNames = members?.map(({ username }) => `${username}`);

    const onAddEventTypeClick = () => {
      changeIsAddEventTypeModal(!isAddEventTypeModal);
    };

    const onDeleteEventTypeClick = () => {
      changeIsDeleteEventTypeModal(!isDeleteEventTypeModal);
    };

    const setStartValue = (date: Dayjs | null) => {
      setStartDateTime(date);
      formik.setFieldValue('startTime', date);
    };

    const setEndValue = (date: Dayjs | null) => {
      setEndDateTime(date);
      formik.setFieldValue('endTime', date);
    };

    const isNotValid = (dataTime: Dayjs | null) => !dayjs(dataTime).isValid();

    const setNewEventType = (data: ITypes) => {
      formik.setFieldValue('types', [...formik.values.types, data.title]);
      formik.setFieldValue('bookingType', data.title);
      createType(data);
    };

    const onTypeChange = (value: string) => {
      formik.setFieldValue('bookingType', value);
    };

    const setNewPersonName = (values: string[]) => {
      formik.setFieldValue('users', values);
      setPersonName(values);
    };

    const onDelete = () => {
      currentBooking && deleteBooking(Number(currentBooking.id));
      return null;
    };

    const removeType = (activeValue: string) => {
      const type = allTypes?.find(({ title }) => title === activeValue);
      if (type) {
        deleteType(type);
        changeIsDeleteEventTypeModal(!isDeleteEventTypeModal);
      }
    };

    return (
      <Grid container>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <Box sx={EventSX.title}>{t('app.components.modals.add_event_modal.add_event')}</Box>
            <Box sx={[EventSX.typeBlock, EventSX.textFieldBoxRight]}>
              <Box sx={EventSX.selectBox}>
                <BasicSelect
                  label={t('app.components.modals.add_event_modal.type')}
                  value={formik.values.bookingType}
                  setValue={onTypeChange}
                  statuses={formik.values.types}
                />
              </Box>
              <Box sx={EventSX.iconsBox}>
                <IconButton sx={EventSX.icon} onClick={onAddEventTypeClick} color='inherit'>
                  <AddIcon fontSize={'small'} />
                </IconButton>

                <NestedModal
                  open={isAddEventTypeModal}
                  setIsConfirmModal={changeIsAddEventTypeModal}>
                  <ChangeEventType
                    setOpen={changeIsAddEventTypeModal}
                    setNewEventType={setNewEventType}
                  />
                </NestedModal>

                <IconButton sx={EventSX.icon} onClick={onDeleteEventTypeClick} color='inherit'>
                  <DeleteIcon fontSize={'small'} />
                </IconButton>
                <NestedModal
                  open={isDeleteEventTypeModal}
                  setIsConfirmModal={changeIsDeleteEventTypeModal}>
                  <RemoveModal
                    setOpen={changeIsDeleteEventTypeModal}
                    label={t('app.labels.remove_type')}
                    list={formik.values.types}
                    onRemove={removeType}
                  />
                </NestedModal>
              </Box>
              <Box sx={{ width: '100%' }}>
                <MultipleSelect
                  setPersonName={setNewPersonName}
                  personName={personName}
                  values={userNames ? userNames : ['']}
                />
                {formik.touched.users && formik.errors.users ? (
                  <ErrPopUp message={formik.errors.users} />
                ) : null}
              </Box>
            </Box>

            <FormGroup sx={EventSX.formGroup}>
              <Box sx={EventSX.lineBox}>
                <TextField
                  fullWidth
                  autoComplete='new-password'
                  sx={EventSX.textFieldBox}
                  error={
                    formik.touched.title && formik.errors.title !== null && !!formik.errors.title
                  }
                  label={t('app.components.modals.add_event_modal.event_title')}
                  variant='outlined'
                  {...formik.getFieldProps('title')}
                />
                {formik.touched.title && formik.errors.title ? (
                  <ErrPopUp message={formik.errors.title} />
                ) : null}
              </Box>

              <Box sx={EventSX.lineBox}>
                <TextField
                  fullWidth
                  autoComplete='new-password'
                  sx={EventSX.textFieldBox}
                  error={
                    formik.touched.description &&
                    formik.errors.description !== null &&
                    !!formik.errors.description
                  }
                  variant='outlined'
                  label={t('app.components.modals.add_event_modal.description')}
                  {...formik.getFieldProps('description')}
                />
                {formik.touched.description && formik.errors.description ? (
                  <ErrPopUp message={formik.errors.description} />
                ) : null}
              </Box>

              <Box sx={EventSX.lineBox}>
                <DateTimeSelection
                  label={t('app.components.modals.add_event_modal.event_start')}
                  value={startDateTime}
                  setValue={setStartValue}
                />

                {formik.touched.startTime && formik.errors.startTime ? (
                  <ErrPopUp message={formik.errors.startTime} />
                ) : null}

                <DateTimeSelection
                  label={t('app.components.modals.add_event_modal.event_end')}
                  value={endDateTime}
                  setValue={setEndValue}
                  disabled={isNotValid(startDateTime)}
                  minDateTime={startDateTime}
                />

                {formik.touched.endTime && formik.errors.endTime ? (
                  <ErrPopUp message={formik.errors.endTime} />
                ) : null}
              </Box>
            </FormGroup>
            <Box sx={UserSX.buttonsBlock}>
              {currentBooking?.id && (
                <SupportModal
                  setIsConfirmModal={changeIsRemovedModal}
                  isConfirmModal={isRemovedModal}
                  setOpenNestedModal={setOpen}
                  description={t('app.components.modals.supportRemovedModal.description')}
                  buttonName={t('app.button_labels.delete')}
                  onDeleteHandle={onDelete}
                />
              )}
              <SupportModal
                setIsConfirmModal={setIsConfirmModal}
                isConfirmModal={isConfirmModal}
                setOpenNestedModal={setOpen}
                description={t('app.components.modals.confirmModal.description')}
                buttonName={t('app.button_labels.cancel')}
              />
              <ContainedButton buttonName={t('app.button_labels.save')} type={'submit'} />
            </Box>
          </FormControl>
        </form>
      </Grid>
    );
  },
);

Event.displayName = 'Event';
