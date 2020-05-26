import React, { FC, MouseEvent, useCallback } from 'react';
import classnames from 'classnames/bind';
import { getOr } from 'lodash/fp';
import { quizData } from '../../data';
import { quizMapStateToProps, quizMapDispatchToProps } from '../../types';
import { QA } from '../../components/qa';
import { GameOver } from '../../components/game-over';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

type Props = ReturnType<typeof quizMapStateToProps> &
  ReturnType<typeof quizMapDispatchToProps>;

export const Quiz: FC<Props> = ({
  currentQuestionId,
  currentAnswerId,
  error,
  hasToShowGameOver,
  setCurrentQuestionId,
  setCurrentAnswerId,
  setError,
  setShowGameOver,
  resetQuiz
}) => {
  const countableQuestionId = Number(currentQuestionId);
  const { question, answers } = quizData[countableQuestionId];

  // TODO rewrite all handlers to actions
  const handleClickAnswer = useCallback(
    (e: MouseEvent) => {
      const id = getOr('', ['currentTarget', 'dataset', 'id'], e);

      setCurrentAnswerId(id);
      setError('');
    },
    [setCurrentAnswerId, setError]
  );

  const handleClickNext = useCallback(() => {
    if (!currentAnswerId) {
      setError('Выберите один из вариантов ответа');

      return;
    }

    setCurrentAnswerId('');

    if (countableQuestionId + 1 < quizData.length) {
      setCurrentQuestionId(String(countableQuestionId + 1));

      return;
    }

    setShowGameOver(true);
  }, [
    currentAnswerId,
    question,
    quizData,
    countableQuestionId,
    setShowGameOver
  ]);

  const handleClickRestart = useCallback(() => {
    resetQuiz();
  }, [resetQuiz]);

  return (
    <div className={styles.root}>
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
            onAnswerClick={handleClickAnswer}
            onNextClick={handleClickNext}
          />
        )}
      </div>
    </div>
  );
};
