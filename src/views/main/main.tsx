import { Button } from 'src/components/button';
import { Timer } from 'src/components/timer';
import { useTimer } from 'src/hooks/useTimer';

import styles from './main.module.scss';

function millisecondsToTime(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (60 * 1000)) % 60);

  return (minutes < 10 ? `0${minutes}` : minutes) + ':' + (seconds < 10 ? `0${seconds}` : seconds);
}

const WORK_TIME = 0.1 * 60 * 1000; // 25 min
const BREAK_TIME = 0.05 * 60 * 1000; // 5 min
const LONG_BREAK_TIME = 15 * 60 * 1000; // 15 min

const MainView: React.VFC = () => {
  const { isStarted, isPaused, startTimer, stopTimer, resetTimer, progress, time } = useTimer(
    WORK_TIME,
    BREAK_TIME,
    LONG_BREAK_TIME
  );

  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <Timer progress={progress} />

        {millisecondsToTime(time)}

        <div className={styles.buttons}>
          {!isStarted && !isPaused && (
            <Button onClick={startTimer} variant="primary">
              Start
            </Button>
          )}

          {!isStarted && isPaused && (
            <>
              <Button onClick={startTimer} variant="primary">
                Continue
              </Button>
              <Button onClick={resetTimer} variant="secondary">
                Reset
              </Button>
            </>
          )}

          {isStarted && (
            <Button onClick={stopTimer} variant="primary">
              Stop
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default MainView;
