import React, { FC, MouseEvent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: (e: MouseEvent) => void;
};

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button className="nes-btn is-primary" onClick={onClick}>
      {children}
    </button>
  );
};
