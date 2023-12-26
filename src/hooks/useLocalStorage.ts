import { useEffect, useState } from 'react';

const useLocalStorage = <T> (key: string, defaultValue: T) => {
  const savedValue = localStorage.getItem(key);
  let parsedValue = defaultValue;

  try {
    parsedValue = savedValue ? JSON.parse(savedValue) : defaultValue;
  } catch {
    null;
  }

  const [value, setValue] = useState<T>(parsedValue);

  useEffect(() => {
    if (value !== null) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue] as const;
};

export default useLocalStorage;
