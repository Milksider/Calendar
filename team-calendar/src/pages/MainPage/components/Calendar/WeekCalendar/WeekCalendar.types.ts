import { IBookingFetch } from '@Pages/MainPage';
import {ITypes} from "@Components/Modals";

export interface IWeekCalendar {
  bookings?: IBookingFetch[];
  allTypes?: ITypes[];
  onEditEventClick: (value: IBookingFetch) => void;
}
