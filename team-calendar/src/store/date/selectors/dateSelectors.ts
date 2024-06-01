import { RootState } from '@Store/index';


export const getCurrentMonth = (state: RootState) => state.date.month;

export const getCurrentYear = (state: RootState) => state.date.year;

export const getCurrentDate = (state: RootState) => state.date.date;

export const getCurrentWeek = (state: RootState) => state.date.week;

export const getCurrentDateAllData = (state: RootState) => state.date;
