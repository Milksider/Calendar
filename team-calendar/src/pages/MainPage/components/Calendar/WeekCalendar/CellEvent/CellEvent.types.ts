import { IBookingFetch } from '@Pages/MainPage';
import { ITypes } from '@Components/Modals';

export interface ICellEvent {
  filteredBookings?: IBookingFetch[];
  currentBookings?: IBookingFetch[];
  allTypes?: ITypes[];
  isStartMinutesGreaterThan30: boolean;
  time: number;
  onEditEventClick: (value: IBookingFetch) => void;
}