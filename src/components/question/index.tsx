import React, { FC } from 'react';
import { QuestionType } from '../../types';
import styles from './styles.module.css';

type Props = {
  data: QuestionType;
};

export const Question: FC<Props> = ({ data }) => {
  const { id, text } = data;

  return (
    <div className={styles.question}>
      {id}. {text}
    </div>
  );
};
