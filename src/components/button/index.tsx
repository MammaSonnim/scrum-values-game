import React, { FC, MouseEvent, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isIcon?: boolean;
  disabled?: boolean;
  asLink?: boolean;
  onClick?: (e: MouseEvent) => void;
};

export const Button: FC<Props> = ({
  type = 'button',
  disabled,
  children,
  onClick,
  asLink,
}) => {
  const classes = cn(styles.button, styles.primary, {
    [styles.disabled]: disabled,
    [styles['as-link']]: asLink,
  });

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick || undefined}
    >
      {children}
    </button>
  );
};
