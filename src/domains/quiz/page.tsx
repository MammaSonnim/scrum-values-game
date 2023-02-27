import React, { FC, MouseEvent, useCallback } from 'react';
import cn from 'classnames';
import { getOr, noop } from 'lodash/fp';
import { Event } from 'effector';
import { Page } from '../../components/page';
import {
  ScoresT,
  QuizDataT,
  QuestionT,
  GameStepT,
  TeamPresetT,
} from './models/types';
import { Scores, QA, GameOver } from './components';
import styles from './styles.module.css';
import { TeamPreset } from './components/teamPreset';

type Props = {
  teamPreset: TeamPresetT;
  scores: ScoresT;
  isGameLost: boolean;
  quizData: QuizDataT;
  gameStep: GameStepT;
  isAnswerScoresVisible: boolean;
  isButtonDisabled: boolean;
  isAnyAnswerSelected: boolean;
  currentQuestionId: number;
  currentAnswerId: number | null;
  onRestartGame?: Event<void>;
  onSelectAnswer?: Event<number>;
  onShowAnswerScores?: Event<void>;
  onGoToNextQuestion?: Event<void>;
  onChangeGameStep?: Event<GameStepT>;
};

export const QuizPage: FC<Props> = ({
  teamPreset,
  scores,
  isGameLost,
  quizData,
  gameStep,
  isAnswerScoresVisible,
  isButtonDisabled,
  isAnyAnswerSelected,
  currentQuestionId,
  currentAnswerId,
  onRestartGame = noop,
  onSelectAnswer = noop,
  onShowAnswerScores = noop,
  onGoToNextQuestion = noop,
  onChangeGameStep = noop,
}) => {
  const quizDataById = quizData[currentQuestionId - 1];
  const question = getOr({} as QuestionT, ['question'], quizDataById);
  const answers = getOr([], ['answers'], quizDataById);

  const handleClickAnswer = useCallback(
    (e: MouseEvent) => {
      const id = Number(getOr('', ['currentTarget', 'value'], e));

      onSelectAnswer(id);
    },
    [onSelectAnswer]
  );

  const handleClickShowAnswerScores = useCallback(() => {
    onShowAnswerScores();
  }, [onShowAnswerScores]);

  const handleClickNext = useCallback(() => {
    onGoToNextQuestion();
  }, [onGoToNextQuestion]);

  const handleClickRestart = useCallback(() => {
    onRestartGame();
  }, [onRestartGame]);

  return (
    <Page>
      <div className={styles.quiz}>
        <div className={styles['quiz__scores']}>
          <Scores scores={scores} />
        </div>
        <div className={cn(styles['quiz__content'])}>
          {gameStep === 'teamPreset' && (
            <TeamPreset
              teamPreset={teamPreset}
              onChangeGameStep={onChangeGameStep}
            />
          )}
          {gameStep === 'quiz' && (
            <QA
              isAnswerScoresVisible={isAnswerScoresVisible}
              isButtonDisabled={isButtonDisabled}
              isAnyAnswerSelected={isAnyAnswerSelected}
              quizDataLength={quizData.length}
              currentQuestionId={currentQuestionId}
              question={question}
              answers={answers}
              currentAnswerId={currentAnswerId}
              error={''}
              onAnswerClick={handleClickAnswer}
              onNextClick={handleClickNext}
              onShowScoresClick={handleClickShowAnswerScores}
            />
          )}
          {gameStep === 'gameOver' && (
            <GameOver isGameLost={isGameLost} onRestart={handleClickRestart} />
          )}
        </div>
      </div>
    </Page>
  );
};
