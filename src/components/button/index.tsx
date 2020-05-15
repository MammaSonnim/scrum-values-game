import React, { FC } from 'react';
import styles from './styles.module.css';

type Props = {
  children: any;
  onClick: any;
};

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
