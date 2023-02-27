import React, { FC, MouseEvent, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  asIcon?: boolean;
  disabled?: boolean;
  asLink?: boolean;
  className?: string;
  testid?: string;
  onClick?: (e: MouseEvent) => void;
};

export const Button: FC<Props> = ({
  type = 'button',
  disabled,
  children,
  onClick,
  asLink,
  asIcon,
  className,
  testid,
}) => {
  const classes = cn(
    styles.button,
    styles.primary,
    {
      [styles.disabled]: disabled,
      [styles['as-link']]: asLink,
      [styles['as-icon']]: asIcon,
    },
    className
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      data-testid={testid}
      onClick={onClick || undefined}
    >
      {children}
    </button>
  );
};
