import './models/init';
import React, { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import {
  $scores,
  $data,
  $buttonType,
  $isAnswerScoresVisible,
  $isButtonDisabled,
  $isAnyAnswerSelected,
  $currentAnswerId,
  $currentQuestionId,
  $isGameOver,
  restartGame,
  selectAnswer,
  goToNextQuestion,
  showAnswerScores,
  QuizAppGate,
} from './models';
import { QuizPage } from './page';

export const Quiz: FC = () => {
  useGate(QuizAppGate);

  const scores = useStore($scores);
  const quizData = useStore($data);
  const buttonType = useStore($buttonType);
  const isAnswerScoresVisible = useStore($isAnswerScoresVisible);
  const isButtonDisabled = useStore($isButtonDisabled);
  const isAnyAnswerSelected = useStore($isAnyAnswerSelected);
  const currentAnswerId = useStore($currentAnswerId);
  const currentQuestionId = useStore($currentQuestionId);
  const isGameOver = useStore($isGameOver);

  return (
    <QuizPage
      buttonType={buttonType}
      isAnswerScoresVisible={isAnswerScoresVisible}
      isButtonDisabled={isButtonDisabled}
      isAnyAnswerSelected={isAnyAnswerSelected}
      isGameOver={isGameOver}
      currentQuestionId={currentQuestionId}
      currentAnswerId={currentAnswerId}
      quizData={quizData}
      scores={scores}
      restartGame={restartGame}
      selectAnswer={selectAnswer}
      showAnswerScores={showAnswerScores}
      goToNextQuestion={goToNextQuestion}
    />
  );
};
