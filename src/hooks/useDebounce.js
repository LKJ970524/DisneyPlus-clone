import { useState, useEffect } from 'react'

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay);
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}
