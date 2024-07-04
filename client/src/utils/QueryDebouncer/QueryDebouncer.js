import React, { useState } from "react";
import { useEffect } from "react";

const QueryDebouncer = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue
};

export default QueryDebouncer;
