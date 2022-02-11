import React, { FC } from 'react';
import { QuestionT } from '../../models/quiz/types';
import styles from './styles.module.css';

type Props = {
  data: QuestionT;
};

export const Question: FC<Props> = ({ data }) => {
  const { id, text } = data;

  return (
    <div className={styles.question}>
      {id}. {text}
    </div>
  );
};
