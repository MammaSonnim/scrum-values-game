import React, { FC, MouseEvent, useCallback, useEffect } from 'react';
import classnames from 'classnames/bind';
import { getOr, find } from 'lodash/fp';
import { quizData } from '../../data';
import {
  quizMapStateToProps,
  quizMapDispatchToProps,
  AnswerType
} from '../../types';
import { Heading } from '../../components/heading';
import { QA } from '../../components/qa';
import { GameOver } from '../../components/game-over';
import { calcIsNeedToGameOver } from '../../helpers/calcIsNeedToGameOver';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

type Props = ReturnType<typeof quizMapStateToProps> &
  ReturnType<typeof quizMapDispatchToProps>;

export const Quiz: FC<Props> = ({
  currentQuestionId,
  currentAnswerId,
  error,
  scores,
  hasToShowAnswerScores,
  hasToShowGameOver,
  setCurrentQuestionId,
  setCurrentAnswerId,
  showAnswerScores,
  setError,
  updateTotalScores,
  showGameOver,
  resetQuiz
}) => {
  const countableQuestionId = Number(currentQuestionId);
  const { question, answers } = quizData[countableQuestionId];

  useEffect(() => {
    if (calcIsNeedToGameOver(scores)) {
      showGameOver(true);
    }
  }, [scores, showGameOver]);

  // TODO rewrite all handlers to epics
  const handleClickAnswer = useCallback(
    (e: MouseEvent) => {
      if (hasToShowAnswerScores) {
        return;
      }

      const id = getOr('', ['currentTarget', 'dataset', 'id'], e);

      setCurrentAnswerId(id);
      setError('');
    },
    [setCurrentAnswerId, setError, hasToShowAnswerScores]
  );

  const handleClickNext = useCallback(() => {
    if (!currentAnswerId) {
      setError('Выберите один из вариантов ответа');

      return;
    }

    if (!hasToShowAnswerScores) {
      const currentAnswerData = find((answer: AnswerType) => {
        return answer.id === currentAnswerId;
      }, answers);

      if (currentAnswerData && currentAnswerData.scores) {
        updateTotalScores(currentAnswerData.scores);
      }

      showAnswerScores(true);

      return;
    }

    setCurrentAnswerId('');
    showAnswerScores(false);

    if (countableQuestionId + 1 < quizData.length) {
      setCurrentQuestionId(String(countableQuestionId + 1));

      return;
    }

    showGameOver(true);
  }, [
    currentAnswerId,
    countableQuestionId,
    hasToShowAnswerScores,
    answers,
    setError,
    setCurrentAnswerId,
    setCurrentQuestionId,
    showAnswerScores,
    showGameOver,
    updateTotalScores
  ]);

  const handleClickRestart = useCallback(() => {
    resetQuiz();
  }, [resetQuiz]);

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
