import React, { FC, memo } from 'react';
import { Box } from '@mui/material';
import { IBookingFetch, ITabLine } from './TabLine.types';
import { TabLineSX } from './stylesSX';
import { UserInfo } from '@Pages/MainPage/components/TabLine/UserInfo';
import { EventInfo } from './EventInfo/EventInfo';
import { END_TIME, START_TIME } from '@Constants/';
import dayjs from 'dayjs';
import { CustomTooltip } from '@Components/Tooltip/Tooltip';

export const TabLine: FC<ITabLine> = memo(({
                                          userBookings,
                                          onEditEventClick,
                                          onEditUserClick,
                                          user,
                                          allTypes
                                      }) => {
    const {username} = user;

    const timeCells = [];

    const onEventClick = (booking?: IBookingFetch) => {
        booking && onEditEventClick(booking);
    };

    const onUserClick = () => {
        onEditUserClick(user);
    };

    const onEmptyCellClick = (i: number) => {
        const endTime = i < 20 ? i + 1 : i;
        const eventType = allTypes ? allTypes[0].title : '';

        const newBookingData = {
            title: '',
            bookingType: eventType,
            description: '',
            users: [user],
            startTime: `${i}:00`,
            endTime: `${endTime}:00`,
        };
        onEditEventClick(newBookingData);

    };

    // Ф-ия определения часа\минут события
    const eventTime = (time: string, timeType?: 'hour' | 'min') => {
        const data = dayjs(time);
        if (timeType === 'hour') {
            return data.hour()
        }

        return data.minute();
    };

    const bookingColor = (booking: IBookingFetch) => {
        const type = booking?.bookingType;
        const currentType = allTypes?.find(({title}) => title === type);
        return currentType ? currentType.color : '';
    };

    // Формирование ячеек
    for (let i = START_TIME; i <= END_TIME; i++) {
        let splitStartTime = [0, 0];
        let splitEndTime = [0, 0];

        // Проверка на формирование ячейки с начальным временем
        const isBookingStartTime = userBookings.some(booking => {
            splitStartTime = [eventTime(booking.startTime, 'hour'), eventTime(booking.startTime, 'min')];

            return splitStartTime[0] === i;
        });

        // Проверка на формирование ячейки с конечным временем
        const isBookingEndTime = userBookings.some(booking => {
            splitEndTime = [eventTime(booking.endTime, 'hour'), eventTime(booking.endTime, 'min')];

            return splitEndTime[0] === i;
        });

        // Проверка на формирование ячейки находящейся между началом и концом события
        const isEventMoreHour = userBookings.some(booking => {
            const startTimeHour = eventTime(booking.startTime, 'hour');
            const endTimeHour = eventTime(booking.endTime, 'hour');

            return i > startTimeHour && i < endTimeHour;
        });

        // Если формирующаяся ячейка должна содержать событие
        if (isBookingStartTime || isBookingEndTime || isEventMoreHour) {

            const currentBooking = () => {
                if (isBookingStartTime) {
                    return userBookings.filter(booking => eventTime(booking.startTime, 'hour') === i)[0];
                } else if (isBookingEndTime) {
                    return userBookings.filter(booking => eventTime(booking.endTime, 'hour') === i)[0];
                } else {
                    return userBookings.filter(
                        booking =>
                            i < eventTime(booking.endTime, 'hour') && i > eventTime(booking.startTime, 'hour'),
                    )[0];
                }
            };

            const splitTypeTime = isBookingStartTime ? splitStartTime : splitEndTime;

            const percentage = () => {
                if (isEventMoreHour) return '100%';
                if (isBookingStartTime) return `${((60 - splitTypeTime[1]) * 100) / 60}%`;
                return `${(splitTypeTime[1] * 100) / 60}%`;
            };

            TabLineSX.bookingCell = {
                ...TabLineSX.bookingCell,
                width: percentage(),
                backgroundColor: bookingColor(currentBooking()),
            };
            const justifyContentEventCell = (type: 'start' | 'end'): 'start' | 'end' => {
                if (type === 'start') {
                    return splitStartTime[1] > 0 ? 'end' : 'start'
                }
                return 'start'
            }

            timeCells.push(
                <Box key={i} sx={[TabLineSX.cell,TabLineSX[justifyContentEventCell(isBookingStartTime ? 'start' : 'end')]]}>
                    <CustomTooltip
                        title={
                            <React.Fragment>
                                <EventInfo event={currentBooking()}/>
                            </React.Fragment>
                        }>
                        <Box
                            onClick={() => onEventClick(currentBooking())}
                            sx={TabLineSX.bookingCell}
                        />
                    </CustomTooltip>
                </Box>,
            );

        } else {
            timeCells.push(<Box key={i} sx={[TabLineSX.cell, TabLineSX.cellHover]}
                                onClick={() => onEmptyCellClick(i)}/>);
        }
    }

    return (
        <>
            <Box sx={TabLineSX.userBox}>
                <CustomTooltip
                    title={
                        <React.Fragment>
                            <UserInfo user={user}/>
                        </React.Fragment>
                    }>
                    <Box sx={TabLineSX.userName} onClick={onUserClick}>
                        {username}
                    </Box>
                </CustomTooltip>
            </Box>

            <Box sx={TabLineSX.timeCells}>{timeCells}</Box>
        </>
    );
});

TabLine.displayName = 'TabLine';
