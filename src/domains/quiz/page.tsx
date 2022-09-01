import React, { FC, MouseEvent, useCallback } from 'react';
import cn from 'classnames';
import { getOr } from 'lodash/fp';
import { Event } from 'effector';
import { ScoresT, QuizT, DataT, IdT, QuestionT } from './models/types';
import { Heading, QA, GameOver } from './components';
import styles from './styles.module.css';

type Props = {
  quiz: QuizT;
  scores: ScoresT;
  quizData: DataT;
  restartGame: Event<void>;
  selectAnswer: Event<IdT>;
  showAnswerScores: Event<void>;
  goToNextQuestion: Event<void>;
}

export const QuizPage: FC<Props> = ({
  quiz,
  scores,
  quizData,
  restartGame,
  selectAnswer,
  showAnswerScores,
  goToNextQuestion,
}) => {
  const {
    isAnswerScoresVisible,
    isGameOverVisible,
    currentQuestionId,
    currentAnswerId,
    error,
  } = quiz;

  const countableQuestionId = Number(currentQuestionId);
  const quizDataById = quizData[countableQuestionId];
  const question = getOr({} as QuestionT, ['question'], quizDataById);
  const answers = getOr([], ['answers'], quizDataById);

  const handleClickAnswer = useCallback(
    (e: MouseEvent) => {
      const id = getOr('', ['currentTarget', 'value'], e);

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
    <div className={styles.root}>
      <Heading scores={scores} />
      <div className={cn(styles.content, 'nes-container is-rounded')}>
        {isGameOverVisible ? (
          <GameOver onRestart={handleClickRestart} />
        ) : (
          <QA
            quizDataLength={quizData.length}
            currentQuestionId={currentQuestionId}
            question={question}
            answers={answers}
            currentAnswerId={currentAnswerId}
            error={error}
            isAnswerScoresVisible={isAnswerScoresVisible}
            onAnswerClick={handleClickAnswer}
            onNextClick={handleClickNext}
            onShowScoresClick={handleClickShowAnswerScores}
          />
        )}
      </div>
    </div>
  );
};
