import React, { FC, MouseEvent } from 'react';
import { AnswerT, IdT } from '../../models/types';
import { Answer } from '../answer';
import styles from './styles.module.css';

type Props = {
  data: AnswerT[];
  currentAnswerId: IdT;
  isAnswerScoresVisible: boolean;
  onAnswerClick: (e: MouseEvent) => void;
};

export const Answers: FC<Props> = ({
  data,
  currentAnswerId,
  isAnswerScoresVisible,
  onAnswerClick,
}) => {
  return (
    <div className={styles.root}>
      {data.map(answer => (
        <div key={answer.id} className={styles['answers-item']}>
          <Answer
            data={answer}
            isSelected={currentAnswerId === answer.id}
            isAnswerScoresVisible={isAnswerScoresVisible}
            onAnswerClick={onAnswerClick}
          />
        </div>
      ))}
    </div>
  );
};
