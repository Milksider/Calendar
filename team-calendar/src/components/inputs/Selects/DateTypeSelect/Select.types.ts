import { DateTypes } from '@Pages/MainPage/components/TabMenu/ControlDate';

export interface ISmallSelect {
  value: string;
  setValue: (value: DateTypes) => void;
  items: string[];
}