import React from 'react';
import { QuestionType } from '../../types';
import styles from './style.module.css';

interface QuestionProps {
  data: QuestionType,
}

export const Question: React.FC<QuestionProps> = ({ data }) => {
  const { id, title, text } = data;

  return (
    <div className={styles.question}>
      {id}. {text}
    </div>
  )
}