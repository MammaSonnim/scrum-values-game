import React from 'react';
import { AnswerType } from '../../types';
import { Answer } from '../answer';
import styles from './style.module.css';

interface AnswersProps {
  data: Array<AnswerType>,
  currentAnswer: number | null,
  handleClickAnswer: any,
}

export const Answers: React.FC<AnswersProps> = ({
  data,
  currentAnswer,
  handleClickAnswer,
}) => {
  return (
    <div className={styles.root}>
      {
        data.map((answer) => (
          <div
            key={answer.id}
            className={styles['answers-item']}
          >
            <Answer
              data={answer}
              isSelected={Number(currentAnswer) === answer.id}
              handleClickAnswer={handleClickAnswer}
            />
          </div>
        ))
      }
    </div>
  )
}
