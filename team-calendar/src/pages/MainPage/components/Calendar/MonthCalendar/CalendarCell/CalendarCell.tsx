import { Box } from '@mui/material';
import {
  CalendarCellSX,
  CellEventWrapperSX,
  DateWrapperSX,
} from '@Pages/MainPage/components/Calendar/MonthCalendar/MonthCalendar.styles';
import { FC } from 'react';
import { ICalendarCell } from './CalendarCell.types';
import { CellEvent } from './CellEvent/CellEvent';
import { MAX_EVENTS_IN_CELL } from '@Constants/';
import { useTranslation } from 'react-i18next';

export const CalendarCell: FC<ICalendarCell> = ({ day, isBoundary, isToday, bookings, allTypes }) => {
    const { t } = useTranslation();
    const isEnoughEventsInCell = bookings && bookings.length > MAX_EVENTS_IN_CELL;
    const bookingsSlice = bookings?.slice(0, 2);

    return (
        <Box sx={CalendarCellSX(isBoundary, isToday)}>
            <Box sx={DateWrapperSX}>{day.format('DD')}</Box>
            <Box sx={CellEventWrapperSX}>
                {bookingsSlice?.map(({id, title, startTime, bookingType}) => {
                    const bookingColor = allTypes?.find(({ title }) => title === bookingType)?.color;
                    return (
                        <CellEvent
                            key={id}
                            title={title}
                            color={bookingColor}
                            time={startTime}
                        />
                    );
                })}
                {isEnoughEventsInCell && (
                    <Box sx={DateWrapperSX.more}> +{bookings.length - MAX_EVENTS_IN_CELL} {t('app.more', 'more')} </Box>
                )}
            </Box>
        </Box>
    );
};
