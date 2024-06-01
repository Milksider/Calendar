export interface IRemoveUser {
  setOpen: (value: boolean) => void;
  list?: string[];
  onRemove: (value: string) => void;
  label: string;
}
