import { useState } from 'react';

export const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  return [value, () => setValue((prev) => !prev), setValue] as const;
};
