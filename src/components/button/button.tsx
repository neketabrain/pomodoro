import clsx from 'clsx';

import styles from './button.module.scss';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, variant = 'primary', type = 'button', ...rest } = props;

  const buttonStyles = clsx(styles.button, styles[variant], className);

  return (
    <button type={type} className={buttonStyles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
