import { Dayjs } from 'dayjs';

export interface IViewRepeat {
  repeatStart: Dayjs | null;
  repeatEnd: Dayjs | null;
  selectedDates: Array<[string, boolean]>;
}
