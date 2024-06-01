import { useEffect } from 'react';
import { useDate } from './useDate';
import { getWeekBoundaryDatesDayJs } from './lib/weekDays';
import { useDispatch, useSelector } from 'react-redux';
import { dateActions } from '@Store/date/dateSlice';
import { getCurrentWeek } from '@Store/date/selectors/dateSelectors';
import dayjs from 'dayjs';

export const useWeekDays = () => {
    const { firstWeekDay, lastWeekDay } = useSelector(getCurrentWeek);

    const {date, month, year} = useDate();

    const dispatch = useDispatch();

    useEffect(() => {
        const {startOfWeek, endOfWeek} = getWeekBoundaryDatesDayJs(date, month, year);

        dispatch(dateActions.setFirstWeekDay(startOfWeek.toISOString()));
        dispatch(dateActions.setLastWeekDay(endOfWeek.toISOString()));
    }, [date, month, year]);


    const nextWeek = ()=> {
        dispatch(dateActions.setDate(dayjs(lastWeekDay).date()));
        dispatch(dateActions.setMonth(dayjs(lastWeekDay).month() + 1));
        dispatch(dateActions.setYear(dayjs(lastWeekDay).year()));
    }

    const prevWeek = () => {
        const prevWeekDay = dayjs(firstWeekDay).subtract(2, 'day');

        dispatch(dateActions.setDate(dayjs(prevWeekDay).date()));
        dispatch(dateActions.setMonth(prevWeekDay.month() + 1));
        dispatch(dateActions.setYear(dayjs(prevWeekDay).year()));
    }

    return { nextWeek, prevWeek }
}
