import {IBookingFetch} from "@Pages/MainPage";
import {ITypes} from "@Components/Modals";

export interface IMonthCalendar {
  bookings?: IBookingFetch[];
  allTypes?: ITypes[];
}
