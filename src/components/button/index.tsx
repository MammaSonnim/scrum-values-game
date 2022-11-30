import React, { FC, MouseEvent, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isIcon?: boolean;
  disabled?: boolean;
  onClick?: (e: MouseEvent) => void;
};

export const Button: FC<Props> = ({
  type = 'button',
  disabled,
  children,
  onClick,
}) => {
  const classes = cn(styles.button, 'nes-btn', 'is-primary', {
    'is-disabled': disabled,
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
