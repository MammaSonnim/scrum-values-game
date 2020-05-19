import React, { FC, MouseEvent, ReactNode } from 'react';
import styles from './styles.module.css';

type Props = {
  children: ReactNode;
  onClick: (e: MouseEvent) => void;
};

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
