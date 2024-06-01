import { useState } from 'react';

export const useBooleanState = (): {
  value: boolean,
  changeValue: (newValue: boolean) => void
} => {
  const [value, setValue] = useState<boolean>(false);

  const changeValue = (newValue: boolean): void => {
    setValue(newValue)
  }

  return {value, changeValue}
}
