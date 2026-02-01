import { useState, useEffect } from 'react';

/**
 * Custom hook to delay the update of a value.
 * Useful for preventing excessive API calls during typing.
 * @param {any} value - The input value (e.g., search text)
 * @param {number} delay - The delay in milliseconds
 */
const useDebounce = (value, delay) => {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 1. Set a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 2. Cleanup function: This clears the timeout if the user types again 
    // before the delay is finished. This is what actually "debounces".
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect only if value or delay changes

  return debouncedValue;
};

export default useDebounce;