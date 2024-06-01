export interface INestedModal {
  open: boolean;
  setIsConfirmModal: (value: boolean) => void;
}

export interface IChildModal {
  setOpenNestedModal: (value: boolean) => void;
  setIsConfirmModal: ((value: boolean) => void) | undefined;
  isConfirmModal: boolean | undefined;
  description: string;
  buttonName: string;
  onDeleteHandle?: () => void;
  disabled?:boolean
}
