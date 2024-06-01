import { useDispatch, useSelector } from 'react-redux';
import { dateActions } from '@Store/date/dateSlice';
import { LAST_MONTH_NUM } from '@Constants/';
import { getCurrentDateAllData } from '@Store/date/selectors/dateSelectors';

export const useDate = () => {
    const { date, month, year } = useSelector(getCurrentDateAllData);

    const dispatch = useDispatch();

    const isLastMonth = month === LAST_MONTH_NUM;

    const daysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    }
    const prevDay = () => {
        const currentMonth = month === 1 ?  LAST_MONTH_NUM : month - 1;
        const isNotFirstDay = date - 1 !== 0;
        if (isNotFirstDay) {
            dispatch(dateActions.setDate(date - 1))
            return;
        }

        const lastDay = daysInMonth(year, currentMonth);

        prevMonth()
        dispatch(dateActions.setDate(lastDay))
    }

    const prevMonth = () => {
        const isNotFirstMonth = month - 1 !== 0;
        if (isNotFirstMonth) {
            dispatch(dateActions.setMonth(month - 1))
            return;
        }

        dispatch(dateActions.setMonth(LAST_MONTH_NUM))
        dispatch(dateActions.setYear(year - 1))
    }

    const nextMonth = () => {
        if (!isLastMonth) {
            dispatch(dateActions.setMonth(month + 1))
            return;
        }

        dispatch(dateActions.setMonth(1))
        dispatch(dateActions.setYear(year + 1))

    }

    const nextDay = () => {
        const isNotLastDay = date !== daysInMonth(year, month);
        if (isNotLastDay) {
            dispatch(dateActions.setDate(date + 1))
            return;
        }

        dispatch(dateActions.setDate(1))
        nextMonth();

    }

    return {
        date,
        month,
        year,
        daysInMonth,
        prevMonth,
        prevDay,
        nextMonth,
        nextDay
    }

}
