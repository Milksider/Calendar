
export interface IControlDate {
  dateType: string;
  setDateType: (dateType: DateTypes) => void;
}

export enum DateTypes {
  DATE_FORMAT_DAY = 'DATE_FORMAT_DAY',
  DATE_FORMAT_WEEK = 'DATE_FORMAT_WEEK',
  DATE_FORMAT_MONTH = 'DATE_FORMAT_MONTH'
}

export interface IWeekDays {
  day: string,
  date: number,
  month: string,
}
