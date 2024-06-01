import { IUser } from '@Pages/MainPage';
import { ITypes } from '@Components/Modals';
import { DateTypes } from '@Pages/MainPage/components/TabMenu/ControlDate';

export interface ITabMenu {
  mode: string;
  colorMode: () => void;
  setIsConfirmModal: (value: boolean) => void;
  isConfirmModal: boolean;
  users?: IUser[];
  allTypes: ITypes[];
  dateType: string;
  setDateType: (dateType: DateTypes) => void;
}
