import React, { FC, MouseEvent } from 'react';
import { DataType, SavedAnswerType } from '../../types';
import { getResults } from '../../helpers/get-results';
import { NB_SP } from '../../constants';
import { Button } from '../button';

type Props = {
  quizData: DataType;
  savedAnswers: SavedAnswerType[];
  onRestart: (e: MouseEvent) => void;
};

export const Results: FC<Props> = ({ quizData, savedAnswers, onRestart }) => {
  const results = getResults(quizData, savedAnswers);

  return (
    <div>
      <h1>Results</h1>
      <ul>
        {results.map(result => {
          const { id, title, isCorrectAnswer } = result;

          return (
            id && (
              <li key={id}>
                {title}
                {NB_SP}
                {isCorrectAnswer ? 'Правильно' : 'Неправильно'}
              </li>
            )
          );
        })}
      </ul>
      <Button onClick={onRestart}>Начать заново</Button>
    </div>
  );
};
