import React, { FC } from 'react';
import styles from './styles.module.css';

type Props = {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const Dropdown: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.column}>
        <span className={styles.item}>🦄</span>
        <span className={styles.item}>🐰</span>
        <span className={styles.item}>👤</span>
        <span className={styles.item}>🦔</span>
      </div>
      <div className={styles.column}>
        <span className={styles.item}>👽</span>
        <span className={styles.item}>🐨</span>
        <span className={styles.item}>🐭</span>
        <span className={styles.item}>🐼</span>
      </div>
      <div className={styles.column}>
        <span className={styles.item}>🦁</span>
        <span className={styles.item}>🐣</span>
        <span className={styles.item}>⛄</span>
        <span className={styles.item}>🐧</span>
      </div>
      <div className={styles.column}>
        <span className={styles.item}>🥷</span>
        <span className={styles.item}>🦉</span>
        <span className={styles.item}>🎃</span>
        <span className={styles.item}>🦩</span>
      </div>
      <div className={styles.column}>
        <span className={styles.item}>🦊</span>
        <span className={styles.item}>🐸</span>
        <span className={styles.item}>👻</span>
        <span className={styles.item}>🦖</span>
      </div>
    </div>
  );
};
