import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function useTimer(workTime: number, breakTime: number, longBreakTime: number) {
  const [isStarted, setStarted] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [isTimeBreak, setIsTimeBreak] = useState(false);

  const [time, setTime] = useState(workTime);
  const [progress, setProgress] = useState(0);
  const [breakCount, setBreakCount] = useState(0);

  const ref = useRef<number | null>(null);
  const isLongBreak = useMemo(() => breakCount && breakCount % 4 === 0, [breakCount]);

  const startTimer = useCallback(() => {
    setStarted(true);
    setPaused(false);

    ref.current = window.setInterval(() => {
      setTime((prev) => prev - 10);
    }, 10);
  }, []);

  const stopTimer = useCallback(() => {
    setStarted(false);
    setPaused(true);

    if (ref.current) {
      window.clearInterval(ref.current);
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setPaused(false);
    setTime(workTime);
  }, [stopTimer, workTime]);

  useEffect(() => {
    if (time <= 0) {
      if (isTimeBreak) {
        setIsTimeBreak(false);
        setTime(workTime);
        setProgress(0);
        setBreakCount((prev) => prev + 1);
      }

      if (!isTimeBreak) {
        setIsTimeBreak(true);
        setTime(isLongBreak ? longBreakTime : breakTime);
        setProgress(100);
      }
    }
  }, [time, isTimeBreak, workTime, breakTime, longBreakTime, isLongBreak]);

  useEffect(() => {
    if (isTimeBreak) {
      setProgress((time / (isLongBreak ? longBreakTime : breakTime)) * 100);
    } else {
      setProgress(Math.abs((time / workTime) * 100 - 100));
    }
  }, [isTimeBreak, time, workTime, breakTime, longBreakTime, isLongBreak]);

  useEffect(() => {
    return () => {
      if (ref.current) {
        window.clearInterval(ref.current);
      }
    };
  }, []);

  return { isStarted, isPaused, startTimer, resetTimer, stopTimer, progress, time };
}

export default useTimer;
