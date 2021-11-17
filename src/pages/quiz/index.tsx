import '../../models/quiz/init';
import React, { FC, MouseEvent, useCallback, useEffect } from 'react';
import { useStore } from 'effector-react';
import classnames from 'classnames/bind';
import { getOr } from 'lodash/fp';
import {
  $quiz,
  restartGame,
  $scores,
  selectAnswer,
  goToNextQuestion,
  checkScores,
  $data,
} from '../../models/quiz';
import { Heading } from '../../components/heading';
import { QA } from '../../components/qa';
import { GameOver } from '../../components/game-over';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

export const Quiz: FC = () => {
  const quiz = useStore($quiz);
  const {
    hasToShowAnswerScores,
    hasToShowGameOver,
    currentQuestionId,
    currentAnswerId,
    error,
  } = quiz;
  const scores = useStore($scores);
  const quizData = useStore($data);

  const countableQuestionId = Number(currentQuestionId);
  const { question, answers } = quizData[countableQuestionId];

  useEffect(() => {
    checkScores();
  }, [hasToShowAnswerScores, checkScores]);

  const handleClickAnswer = useCallback(
    (e: MouseEvent) => {
      const id = getOr('', ['currentTarget', 'value'], e);

      selectAnswer(id);
    },
    [selectAnswer]
  );

  const handleClickNext = useCallback(() => {
    goToNextQuestion();
  }, [goToNextQuestion]);

  const handleClickRestart = useCallback(() => {
    restartGame();
  }, [restartGame]);

  return (
    <div className={styles.root}>
      <Heading scores={scores} />
      <div className={cx(styles.content, 'nes-container is-rounded')}>
        {hasToShowGameOver ? (
          <GameOver onRestart={handleClickRestart} />
        ) : (
          <QA
            quizDataLength={quizData.length}
            currentQuestionId={currentQuestionId}
            question={question}
            answers={answers}
            currentAnswerId={currentAnswerId}
            error={error}
            hasToShowAnswerScores={hasToShowAnswerScores}
            onAnswerClick={handleClickAnswer}
            onNextClick={handleClickNext}
          />
        )}
      </div>
    </div>
  );
};
