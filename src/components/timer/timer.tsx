import { ReactComponent as Image } from 'src/assets/images/timer.svg';

import { Loader } from '../loader';

import styles from './timer.module.scss';
import { TimerProps } from './types';

const Timer: React.VFC<TimerProps> = (props) => {
  const { progress } = props;

  return (
    <div className={styles.container}>
      <Image className={styles.image} />

      <div className={styles.timer}>
        <Loader progress={progress} />
      </div>
    </div>
  );
};

export default Timer;
