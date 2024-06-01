import dayjs from 'dayjs';

export const getWeekBoundaryDatesDayJs = (day: number, month: number, year: number) => {
  const date = dayjs().date(day).month(month - 1).year(year); // Создаем объект даты
  const startOfWeek = date.startOf('week').add(1, 'day'); // Начало недели учитывая понедельник
  const endOfWeek = date.endOf('week').add(1, 'day'); // Конец недели учитывая понедельник
  return { startOfWeek, endOfWeek };
}
