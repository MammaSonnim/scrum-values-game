import React, { FC, MouseEvent, ReactNode } from 'react';
import { noop } from 'lodash/fp';

type Props = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
};

export const Button: FC<Props> = ({ type, disabled, children, onClick }) => {
  return (
    <button
      type={type || 'button'}
      className={`nes-btn is-primary ${disabled && 'is-disabled'}`}
      disabled={disabled}
      onClick={onClick || undefined}
    >
      {children}
    </button>
  );
};
