import { ITypes } from '@Components/Modals';

export interface IAddEventType {
  setOpen: (value: boolean) => void;
  setNewEventType: (data: ITypes) => void;
  typeData?: ITypes;
}
