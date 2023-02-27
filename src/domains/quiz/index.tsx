import './models/init';
import React, { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import {
  $teamPreset,
  $scores,
  $quizData,
  $gameStep,
  $isAnswerScoresVisible,
  $isButtonDisabled,
  $isAnyAnswerSelected,
  $currentAnswerId,
  $currentQuestionId,
  restartGame,
  selectAnswer,
  goToNextQuestion,
  showAnswerScores,
  changeGameStep,
  QuizAppGate,
} from './models';
import { QuizPage } from './page';

export const Quiz: FC = () => {
  useGate(QuizAppGate);

  const teamPreset = useStore($teamPreset);
  const scores = useStore($scores);
  const quizData = useStore($quizData);
  const gameStep = useStore($gameStep);
  const isAnswerScoresVisible = useStore($isAnswerScoresVisible);
  const isButtonDisabled = useStore($isButtonDisabled);
  const isAnyAnswerSelected = useStore($isAnyAnswerSelected);
  const currentAnswerId = useStore($currentAnswerId);
  const currentQuestionId = useStore($currentQuestionId);

  return (
    <QuizPage
      isAnswerScoresVisible={isAnswerScoresVisible}
      isButtonDisabled={isButtonDisabled}
      isAnyAnswerSelected={isAnyAnswerSelected}
      currentQuestionId={currentQuestionId}
      currentAnswerId={currentAnswerId}
      quizData={quizData}
      teamPreset={teamPreset}
      scores={scores}
      gameStep={gameStep}
      onRestartGame={restartGame}
      onSelectAnswer={selectAnswer}
      onShowAnswerScores={showAnswerScores}
      onGoToNextQuestion={goToNextQuestion}
      onChangeGameStep={changeGameStep}
    />
  );
};
