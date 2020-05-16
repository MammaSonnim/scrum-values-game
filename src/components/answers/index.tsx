import React, { FC } from 'react';
import { AnswerType, IdType, TODO_ANY } from '../../types';
import { Answer } from '../answer';
import styles from './styles.module.css';

type Props = {
  data: AnswerType[];
  currentAnswerId: IdType;
  onAnswerClick: TODO_ANY;
};

export const Answers: FC<Props> = ({
  data,
  currentAnswerId,
  onAnswerClick
}) => {
  return (
    <div className={styles.root}>
      {data.map(answer => (
        <div key={answer.id} className={styles['answers-item']}>
          <Answer
            data={answer}
            isSelected={currentAnswerId === answer.id}
            onAnswerClick={onAnswerClick}
          />
        </div>
      ))}
    </div>
  );
};
