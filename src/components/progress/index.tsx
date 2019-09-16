import React from 'react';
import styles from './style.module.css';

interface ProgressProps {
  currentCount: number,
  total: number,
}

export const Progress: React.FC<ProgressProps> = ({
  currentCount,
  total,
}) => {
  return (
    <div className={styles.root}>
      Question <span>{currentCount}</span> of <span>{total}</span>
    </div>
  )
}
