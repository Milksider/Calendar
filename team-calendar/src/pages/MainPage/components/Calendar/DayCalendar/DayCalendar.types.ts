import { IBookingFetch, IUser } from '@Pages/MainPage';
import { ITypes } from '@Components/Modals';

export interface IDayCalendar {
  onEditEventClick: (value: IBookingFetch) => void;
  onEditUserClick: (value: IUser) => void;
  allTypes?: ITypes[];
  bookings?: IBookingFetch[];
  users?: IUser[];
}
