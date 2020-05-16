import React, { FC } from 'react';
import styles from './styles.module.css';

type Props = {
  currentCount: number;
  total: number;
};

export const Progress: FC<Props> = ({ currentCount, total }) => {
  return (
    <div className={styles.root}>
      Вопрос <span>{currentCount}</span> из <span>{total}</span>
    </div>
  );
};
