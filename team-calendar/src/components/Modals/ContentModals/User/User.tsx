import React, {ChangeEvent, FC, memo, useEffect, useState} from 'react';
import { Box, Button, Fab, FormControl, FormGroup, Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { IAddUser, IErrorType, SupportModal, UserSX } from '@Components/Modals';
import AddPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ErrPopUp } from '@Components/errPopUp';
import styles from './User.module.css';
import { BasicSelect } from '@Components/inputs';
import { useCreateUserMutation, useUpdateUserMutation } from '@Store/users';

export const User: FC<IAddUser> = memo(({
                                     setIsConfirmModal,
                                     isConfirmModal,
                                     setOpen,
                                     user,
                                   }) => {
  const { t } = useTranslation();

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const errors: IErrorType = {};

  const formik = useFormik({
    initialValues: {
      email: '',
      userName: '',
    },
    validate: values => {
      if (!values.email) {
        errors.email = t('app.err_messages.ent_email');
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = t('app.err_messages.not_valid_email');
      } else if (values.email.length > 50) {
        errors.email = t('app.err_messages.many_characters');
      }

      if (!values.userName) {
        errors.userName = t('app.err_messages.empty_field');
      } else if (values.userName.length > 50) {
        errors.userName = t('app.err_messages.many_characters');
      }

      return errors;
    },

    onSubmit: values => {
      if (!isConfirmModal) {

        const apiData = {
          email: values.email,
          username: values.userName,
        };

        user ? updateUser({ ...apiData, id: user.id }) : createUser(apiData);
      }
      setOpen(false);
    },
  });

  useEffect(() => {
    if (user) {
      const { email, username } = user;
      formik.setFieldValue('email', email);
      formik.setFieldValue('userName', username);
    }
  }, [user]);

  return (
    <Grid container>
      <form onSubmit={formik.handleSubmit}>
        <Box style={UserSX.formContainer}>
          <Box
            sx={UserSX.title}>{t('app.components.modals.add_user_modal.add_user')}</Box>

        </Box>
        <FormControl>
          <FormGroup sx={UserSX.formGroup}>
            <Box sx={UserSX.textFieldBox}>
              <TextField
                fullWidth
                autoComplete='new-password'
                error={
                  formik.touched.email && formik.errors.email !== null && !!formik.errors.email
                }
                label={t('app.labels.email')}
                variant='filled'
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <ErrPopUp message={formik.errors.email} />
              ) : null}
            </Box>

            <Box sx={UserSX.textFieldBox}>
              <TextField
                fullWidth
                error={
                  formik.touched.userName &&
                  formik.errors.userName !== null &&
                  !!formik.errors.userName
                }
                label={t('app.labels.username')}
                variant='filled'
                {...formik.getFieldProps('userName')}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <ErrPopUp message={formik.errors.userName} />
              ) : null}
            </Box>

          </FormGroup>

          <Box sx={UserSX.buttonsBlock}>
            <SupportModal
              setIsConfirmModal={setIsConfirmModal}
              isConfirmModal={isConfirmModal}
              setOpenNestedModal={setOpen}
              description={t('app.components.modals.confirmModal.description')}
              buttonName={t('app.button_labels.cancel')}
            />

            <Button type={'submit'} variant={'contained'} color={'primary'}>
              {t('app.button_labels.save')}
            </Button>
          </Box>
        </FormControl>
      </form>
    </Grid>
  );
});

User.displayName = 'User';
