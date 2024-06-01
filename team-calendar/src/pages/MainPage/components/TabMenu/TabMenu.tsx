import React, {FC, memo, useEffect, useRef, useState} from 'react';
import { Box, Button } from '@mui/material';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Event, NestedModal, RemoveModal, User } from '@Components/Modals';
import { TabMenuSX } from './stylesSX';
import { useTranslation } from 'react-i18next';
import { HeaderButtonSX } from '@Components/buttons';
import { Header } from '@Components/Container/Header/Header';
import { ITabMenu } from './TabMenu.types';
import { useDeleteUserMutation } from '@Store/users';
import { ControlDate, EventTypes } from '@Pages/MainPage/components';
import { useBooleanState } from '@Hooks/';

export const TabMenu: FC<ITabMenu> = memo(({
                                        colorMode,
                                        mode,
                                        isConfirmModal,
                                        setIsConfirmModal,
                                        users,
                                        allTypes,
                                        dateType,
                                        setDateType,
                                      }) => {
  const { t } = useTranslation();
  const { value: isAddUser, changeValue: changeIsAddUser } = useBooleanState();
  const { value: isAddEvent, changeValue: changeIsAddEvent } = useBooleanState();
  const { value: isRemoveUser, changeValue: changeIsRemoveUser } = useBooleanState();
  const [maxWidthTypesBox, setMaxWidthTypesBox] = useState(0);

  const controlBoxRef = useRef<HTMLInputElement>(null);
  const headerBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (controlBoxRef.current && headerBoxRef.current) {
      const maxWidth = window.innerWidth - (controlBoxRef.current.getBoundingClientRect().width + headerBoxRef.current.getBoundingClientRect().width);
      setMaxWidthTypesBox(maxWidth);
    }
  }, [window.innerWidth]);

  const listUsersNames = users?.map(({ username }) => `${username}`);

  const [deleteUser] = useDeleteUserMutation();

  const removeUser = (activeValue: string) => {
    const userData = users?.find(({username}) => `${username}` === activeValue);
    if (userData) {
      deleteUser(userData);
      changeIsRemoveUser(!isRemoveUser);
    }
  };

  TabMenuSX.eventTypes.maxWidth = maxWidthTypesBox;

  return (
    <Box sx={TabMenuSX.container}>
      <Box sx={TabMenuSX.controlBox} ref={controlBoxRef}>
        <Box sx={TabMenuSX.buttonBox}>
          <Button
            onClick={() => changeIsRemoveUser(!isRemoveUser)}
            color='primary'
            variant='contained'
            size='small'
            sx={HeaderButtonSX.button}>
            <PersonAddDisabledIcon />
          </Button>
          <NestedModal open={isRemoveUser} setIsConfirmModal={changeIsRemoveUser}>
            <RemoveModal setOpen={changeIsRemoveUser} list={listUsersNames}
                         onRemove={removeUser} label={t('app.labels.remove_user')} />
          </NestedModal>
          <Button
            onClick={() => changeIsAddUser(true)}
            color='primary'
            variant='contained'
            size='small'
            sx={HeaderButtonSX.button}>
            <PersonAddAltIcon />
          </Button>
          <NestedModal open={isAddUser} setIsConfirmModal={setIsConfirmModal}>
            <User
              setIsConfirmModal={setIsConfirmModal}
              isConfirmModal={isConfirmModal}
              setOpen={changeIsAddUser}
            />
          </NestedModal>
        </Box>
        <Button
          onClick={() => changeIsAddEvent(true)}
          color='primary'
          variant='contained'
          size='small'
          sx={HeaderButtonSX.button}>
          {t('app.components.modals.add_event_modal.add_event')}
        </Button>
        <NestedModal open={isAddEvent} setIsConfirmModal={setIsConfirmModal}>
          <Event
            users={users}
            setIsConfirmModal={setIsConfirmModal}
            isConfirmModal={isConfirmModal}
            setOpen={changeIsAddEvent}
            allTypes={allTypes}
          />
        </NestedModal>
        <ControlDate
          dateType={dateType}
          setDateType={setDateType}
        />
      </Box>
      <Box sx={TabMenuSX.eventTypes}>
        <EventTypes allTypes={allTypes} />
      </Box>

      <Box ref={headerBoxRef}>
        <Header mode={mode} colorMode={colorMode} />
      </Box>
    </Box>
  );
});

TabMenu.displayName = 'TabMenu';
