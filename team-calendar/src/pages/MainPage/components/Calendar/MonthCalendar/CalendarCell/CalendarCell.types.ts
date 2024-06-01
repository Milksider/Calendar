import {Dayjs} from "dayjs";
import {IBookingFetch} from "@Pages/MainPage";
import {ITypes} from "@Components/Modals";

export interface ICalendarCell {
    day: Dayjs,
    isToday: boolean,
    isBoundary: boolean,
    bookings?: IBookingFetch[],
    allTypes?: ITypes[]
}
