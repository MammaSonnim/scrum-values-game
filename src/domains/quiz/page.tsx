import React, { FC, MouseEvent, useCallback } from 'react';
import cn from 'classnames';
import { getOr } from 'lodash/fp';
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
  quizData: QuizDataT;
  gameStep: GameStepT;
  buttonType: string;
  isAnswerScoresVisible: boolean;
  isButtonDisabled: boolean;
  isAnyAnswerSelected: boolean;
  currentQuestionId: number;
  currentAnswerId: number | null;
  restartGame: Event<void>;
  selectAnswer: Event<number>;
  showAnswerScores: Event<void>;
  goToNextQuestion: Event<void>;
  changeGameStep: Event<GameStepT>;
};

export const QuizPage: FC<Props> = ({
  teamPreset,
  scores,
  quizData,
  gameStep,
  buttonType,
  isAnswerScoresVisible,
  isButtonDisabled,
  isAnyAnswerSelected,
  currentQuestionId,
  currentAnswerId,
  restartGame,
  selectAnswer,
  showAnswerScores,
  goToNextQuestion,
  changeGameStep,
}) => {
  const quizDataById = quizData[currentQuestionId - 1];
  const question = getOr({} as QuestionT, ['question'], quizDataById);
  const answers = getOr([], ['answers'], quizDataById);

  const handleClickAnswer = useCallback(
    (e: MouseEvent) => {
      const id = Number(getOr('', ['currentTarget', 'value'], e));

      selectAnswer(id);
    },
    [selectAnswer]
  );

  const handleClickShowAnswerScores = useCallback(() => {
    showAnswerScores();
  }, [showAnswerScores]);

  const handleClickNext = useCallback(() => {
    goToNextQuestion();
  }, [goToNextQuestion]);

  const handleClickRestart = useCallback(() => {
    restartGame();
  }, [restartGame]);

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
              onChangeGameStep={changeGameStep}
            />
          )}
          {gameStep === 'quiz' && (
            <QA
              buttonType={buttonType}
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
            <GameOver onRestart={handleClickRestart} />
          )}
        </div>
      </div>
    </Page>
  );
};
