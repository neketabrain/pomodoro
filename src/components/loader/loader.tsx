import clsx from 'clsx';

import styles from './loader.module.scss';
import { LoaderProps } from './types';

const Loader: React.VFC<LoaderProps> = (props) => {
  const { progress, className } = props;
  const angle = 3.6 * progress + 45;

  return <div className={clsx(styles.loader, className)} style={{ transform: `rotate(${angle}deg)` }} />;
};

export default Loader;
