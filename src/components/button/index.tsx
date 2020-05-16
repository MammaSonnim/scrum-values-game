import React, { FC } from 'react';
import { TODO_ANY } from '../../types';
import styles from './styles.module.css';

type Props = {
  children: TODO_ANY;
  onClick: TODO_ANY;
};

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
