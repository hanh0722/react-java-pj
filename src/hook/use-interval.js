import { useState, useEffect, useCallback } from "react";

const useInterval = (timeSeconds, condition) => {
  const [time, setTime] = useState(timeSeconds);
  const [isRunning, setIsRunning] = useState(condition || false);
  const startCountingHandler = useCallback(() => {
    setIsRunning(true);
  }, []);
  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const timer = setInterval(() => {
      if (time === 0) {
        return;
      }
      setTime((prevState) => prevState - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      // clean up function to delete some wrong in counter;
    };
  }, [time, isRunning]);
  return {
    time,
    setTime,
    startCountingHandler,
  };
};

export default useInterval;
