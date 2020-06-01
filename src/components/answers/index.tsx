import React, { FC, MouseEvent } from 'react';
import { AnswerType, IdType } from '../../types';
import { Answer } from '../answer';
import styles from './styles.module.css';

type Props = {
  data: AnswerType[];
  currentAnswerId: IdType;
  hasToShowAnswerScores: boolean;
  onAnswerClick: (e: MouseEvent) => void;
};

export const Answers: FC<Props> = ({
  data,
  currentAnswerId,
  hasToShowAnswerScores,
  onAnswerClick
}) => {
  return (
    <div className={styles.root}>
      {data.map(answer => (
        <div key={answer.id} className={styles['answers-item']}>
          <Answer
            data={answer}
            isSelected={currentAnswerId === answer.id}
            hasToShowAnswerScores={hasToShowAnswerScores}
            onAnswerClick={onAnswerClick}
          />
        </div>
      ))}
    </div>
  );
};
