import React from "react";
import styles from "./styles.module.css";

interface ProgressProps {
  currentCount: number;
  total: number;
}

export const Progress: React.FC<ProgressProps> = ({ currentCount, total }) => {
  return (
    <div className={styles.root}>
      Вопрос <span>{currentCount}</span> из <span>{total}</span>
    </div>
  );
};
