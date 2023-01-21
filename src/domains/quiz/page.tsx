import React, { FC, MouseEvent, useCallback } from 'react';
import cn from 'classnames';
import { getOr } from 'lodash/fp';
import { Event } from 'effector';
import { ScoresT, DataT, QuestionT } from './models/types';
import { Scores, QA, GameOver } from './components';
import styles from './styles.module.css';

type Props = {
  scores: ScoresT;
  quizData: DataT;
  buttonType: string;
  isAnswerScoresVisible: boolean;
  isButtonDisabled: boolean;
  isAnyAnswerSelected: boolean;
  isGameOver: boolean;
  currentQuestionId: number;
  currentAnswerId: number | null;
  restartGame: Event<void>;
  selectAnswer: Event<number>;
  showAnswerScores: Event<void>;
  goToNextQuestion: Event<void>;
};

export const QuizPage: FC<Props> = ({
  quizData,
  scores,
  buttonType,
  isAnswerScoresVisible,
  isButtonDisabled,
  isAnyAnswerSelected,
  isGameOver,
  currentQuestionId,
  currentAnswerId,
  restartGame,
  selectAnswer,
  showAnswerScores,
  goToNextQuestion,
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
    <div className={styles.quiz}>
      <div className={styles['quiz__scores']}>
        <Scores scores={scores} />
      </div>
      <div className={cn(styles['quiz__content'])}>
        {isGameOver ? (
          <GameOver onRestart={handleClickRestart} />
        ) : (
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
      </div>
    </div>
  );
};
