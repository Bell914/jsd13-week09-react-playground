import { useState, useEffect } from 'react';

/**
 * useToggle Hook
 * สลับค่า Boolean (true/false) อย่างกระชับ
 */
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = (nextValue) => {
    setValue((current) => (typeof nextValue === 'boolean' ? nextValue : !current));
  };

  return [value, toggle];
}

/**
 * useDebounce Hook
 * หน่วงเวลาการอัปเดตค่าตามระยะเวลา delay (ms)
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
