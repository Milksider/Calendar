import { IBookingFetch, IUser } from '@Pages/MainPage';

export interface IAddEventInitialValues {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  bookingType: string;
  users: string[];
}

export type IErrAddEventType = Partial<IAddEventInitialValues>;

export interface IEditEvent {
  currentBooking?: IBookingFetch | null;
  users?: IUser[];
  allTypes: ITypes[];
}

export interface ITypes {
  title: string;
  id?: string;
  color: string;
}
