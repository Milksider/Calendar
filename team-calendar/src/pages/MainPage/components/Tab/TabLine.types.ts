export interface ITabLine {
  startTime: number;
  endTime: number;
  username: string;
  userBookings: IBooking[];
}

export interface IUser {
  userName: string;
  id: number;
  type: string;
}

export interface IBooking {
  time: number;
  id: string;
  title: string;
  members: IUser[];
}
