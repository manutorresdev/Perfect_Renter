import { useEffect, useState } from 'react';

export default function useLocalStorage(key, defVal) {
  const initialValue = JSON.parse(localStorage.getItem(key)) ?? defVal;
  const [LocalStorage, setLocalStorage] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(LocalStorage));
  }, [LocalStorage, key]);

  return [LocalStorage, setLocalStorage];
}
