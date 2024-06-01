export interface IBasicSelect {
  statuses: string[];
  value: string;
  label: string;
  setValue: (value: string) => void;
}
