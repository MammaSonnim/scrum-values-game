import './models/init';
import React, { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import { compose } from 'lodash/fp';
import { withAuthRedirect } from '../../hocs';
import {
  $quiz,
  restartGame,
  $scores,
  selectAnswer,
  showAnswerScores,
  goToNextQuestion,
  $data,
  QuizAppGate,
} from './models';
import { QuizPage } from './page';

export const Quiz: FC = () => {
  useGate(QuizAppGate);

  const quiz = useStore($quiz);
  const scores = useStore($scores);
  const quizData = useStore($data);

  const PageWithHocs = compose(withAuthRedirect)(QuizPage);

  return (
    <QuizPage
      quiz={quiz}
      quizData={quizData}
      scores={scores}
      restartGame={restartGame}
      selectAnswer={selectAnswer}
      showAnswerScores={showAnswerScores}
      goToNextQuestion={goToNextQuestion}
    />
  );
};
