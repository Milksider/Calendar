import { Dayjs } from 'dayjs';

export interface IDateTimeSelection {
  value: Dayjs | null;
  setValue: (value: Dayjs | null) => void;
  label: string;
  disabled?: boolean;
  minDateTime?: Dayjs | null;
}
