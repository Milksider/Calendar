import React, {FC, useState} from 'react';
import {IBookingFetch, IUser, TabMenu} from '@Pages/MainPage';
import {IHeader} from '@Components/Container/Header/Header.types';
import {Event, NestedModal, User} from '@Components/Modals';
import {useFetchAllUsersQuery} from '@Store/users/users.api';
import {useFetchAllTypesQuery} from '@Store/types';
import {useBookingsByDateType, useBooleanState, useDataState} from '@Hooks/';
import {DateTypes} from '@Pages/MainPage/components/TabMenu/ControlDate';
import {INIT_TYPES} from '@Constants/';
import {CalendarContainer} from '@Pages/MainPage/components/Calendar';

export const MainPage: FC<IHeader> = ({ mode, colorMode }) => {
  const { value: isConfirmModal, changeValue: changeIsConfirmModal } = useBooleanState();
  const { value: isEditEvent, changeValue: changeIsEditEvent } = useBooleanState();
  const { value: isEditUser, changeValue: changeIsEditUser } = useBooleanState();
  const { data: booking, setNewData: setBooking } = useDataState<IBookingFetch>();
  const { data: user, setNewData: setUser } = useDataState<IUser>();
  const [dateType, setDateType] = useState<DateTypes>(DateTypes.DATE_FORMAT_DAY);

  const { data: fetchAllTypes } = useFetchAllTypesQuery('');
  const { data: users } = useFetchAllUsersQuery('');
  const { bookings } = useBookingsByDateType(dateType);

  const onEditEvent = (booking: IBookingFetch) => {
    setBooking(booking);
    changeIsEditEvent(!isEditEvent);
  };

  const onEditUser = (user: IUser) => {
    setUser(user);
    changeIsEditUser(!isEditUser);
  };

  return (
    <>
      {/* Компонент с переключением даты, типами событий, добавление событий, пользователей */}
      <TabMenu
        mode={mode}
        colorMode={colorMode}
        isConfirmModal={isConfirmModal}
        setIsConfirmModal={changeIsConfirmModal}
        users={users}
        allTypes={fetchAllTypes ? fetchAllTypes : INIT_TYPES}
        dateType={dateType}
        setDateType={setDateType}
      />
      {/* Компонент с календарями */}
      <CalendarContainer
        dateType={dateType}
        bookings={bookings}
        onEditEventClick={onEditEvent}
        onEditUserClick={onEditUser}
        allTypes={fetchAllTypes}
        users={users}
      />
      {/* Модалки */}
      <NestedModal open={isEditEvent} setIsConfirmModal={changeIsEditEvent}>
        <Event
          setOpen={changeIsEditEvent}
          currentBooking={booking}
          users={users}
          allTypes={fetchAllTypes ? fetchAllTypes : INIT_TYPES}
        />
      </NestedModal>
      <NestedModal open={isEditUser} setIsConfirmModal={changeIsEditUser}>
        <User setOpen={changeIsEditUser} user={user} />
      </NestedModal>
    </>
  );
};
