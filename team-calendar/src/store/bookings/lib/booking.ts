import dayjs from 'dayjs';

export const getFormattedDateTime = (year: number, month: number, date: number, hour?: number) => {
  if (hour) {
    return dayjs()
      .set('year', year)
      .set('month', month)
      .set('date', date)
      .set('hour', hour)
      .toISOString();
  }

  return dayjs()
    .set('year', year)
    .set('month', month)
    .set('date', date)
    .toISOString();

}