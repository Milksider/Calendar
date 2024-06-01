import { ITypes } from '@Components/Modals';

export interface ITabLine {
  userBookings: IBookingFetch[];
  user: IUser;
  onEditEventClick: (value: IBookingFetch) => void;
  onEditUserClick: (value: IUser) => void;
  allTypes: ITypes[] | undefined;
}

export interface IUser {
  id?: string;
  username: string;
  email: string;
}

export interface IBooking {
  title: string;
  bookingType: string;
  description: string;
  id?: string;
  users?: string[];
  startTime: string;
  endTime: string;
}

export interface IBookingFetch {
  title: string;
  bookingType: string;
  description: string;
  id?: string;
  users: IUser[];
  startTime: string;
  endTime: string;
}

export type IBookingFetchParams = Pick<IBookingFetch, 'startTime' | 'endTime'>;

