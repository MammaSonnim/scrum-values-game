import './models/init';
import React, { FC } from 'react';
import { useGate, useStore } from 'effector-react';
import {
  $teamPreset,
  $scores,
  $quizData,
  $gameStep,
  $buttonType,
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
  $isGameLost,
} from './models';
import { QuizPage } from './page';

export const Quiz: FC = () => {
  useGate(QuizAppGate);

  const teamPreset = useStore($teamPreset);
  const scores = useStore($scores);
  const isGameLost = useStore($isGameLost);
  const quizData = useStore($quizData);
  const gameStep = useStore($gameStep);
  const buttonType = useStore($buttonType);
  const isAnswerScoresVisible = useStore($isAnswerScoresVisible);
  const isButtonDisabled = useStore($isButtonDisabled);
  const isAnyAnswerSelected = useStore($isAnyAnswerSelected);
  const currentAnswerId = useStore($currentAnswerId);
  const currentQuestionId = useStore($currentQuestionId);

  return (
    <QuizPage
      buttonType={buttonType}
      isAnswerScoresVisible={isAnswerScoresVisible}
      isButtonDisabled={isButtonDisabled}
      isAnyAnswerSelected={isAnyAnswerSelected}
      currentQuestionId={currentQuestionId}
      currentAnswerId={currentAnswerId}
      quizData={quizData}
      teamPreset={teamPreset}
      scores={scores}
      isGameLost={isGameLost}
      gameStep={gameStep}
      restartGame={restartGame}
      selectAnswer={selectAnswer}
      showAnswerScores={showAnswerScores}
      goToNextQuestion={goToNextQuestion}
      changeGameStep={changeGameStep}
    />
  );
};
