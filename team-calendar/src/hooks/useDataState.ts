import { useState } from 'react';

export function useDataState<T>(): {
  data: T | undefined | null;
  setNewData: (newData: T) => void;
} {
  const [data, setData] = useState<T | undefined | null>();
  const setNewData = (newData: T) => {
    setData(newData);
  };
  return { data, setNewData };
}
