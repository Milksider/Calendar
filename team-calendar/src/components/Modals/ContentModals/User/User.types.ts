import { IUser } from '@Pages/MainPage';

export interface IErrorType {
  email?: string;
  password?: string;
  userName?: string;
  patronymic?: string;
  surname?: string;
  git?: string;
}

export interface IAddUser {
  setOpen: (value: boolean) => void;
  setIsConfirmModal?: (value: boolean) => void | undefined;
  isConfirmModal?: boolean | undefined;
  user?: IUser | null;
}
