import React, { FC, MouseEvent } from 'react';
import { Button } from '../button';
import styles from './styles.module.css';

type Props = {
  onRestart: (e: MouseEvent) => void;
};

export const GameOver: FC<Props> = ({ onRestart }) => {
  return (
    <div className={styles.content}>
      <h1>Game Over</h1>
      <Button onClick={onRestart}>Начать заново</Button>
    </div>
  );
};
