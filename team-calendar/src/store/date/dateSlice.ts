import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IDateSlice {
  date: number;
  month: number;
  year: number;
  week: {
    firstWeekDay: string;
    lastWeekDay: string;
  };
}

const initialState: IDateSlice = {
  date: new Date().getDate(),
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
  week: {
    firstWeekDay: '',
    lastWeekDay: ''
  }
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate(state, action: PayloadAction<number>) {
      state.date = action.payload;
    },
    setMonth(state,  action: PayloadAction<number>) {
      state.month = action.payload;
    },
    setYear(state,  action: PayloadAction<number>) {
      state.year = action.payload;
    },
    setFirstWeekDay(state,  action: PayloadAction<string>) {
      state.week.firstWeekDay = action.payload;
    },
    setLastWeekDay(state,  action: PayloadAction<string>) {
      state.week.lastWeekDay = action.payload;
    }
  }
})

export const {actions: dateActions} = dateSlice;
export const {reducer: dateReducer} = dateSlice;
