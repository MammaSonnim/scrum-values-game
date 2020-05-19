import React, { FC, MouseEvent } from 'react';
import { getOr } from 'lodash/fp';
import { quizData } from '../../data';
import { quizMapStateToProps, quizMapDispatchToProps } from '../../types';
import { QA } from '../../components/qa';
import { Results } from '../../components/results';
import styles from './styles.module.css';

// TODO use generics
type Props = ReturnType<typeof quizMapStateToProps> &
  ReturnType<typeof quizMapDispatchToProps>;

export const Quiz: FC<Props> = ({
  currentQuestionId,
  currentAnswerId,
  savedAnswers,
  error,
  hasToShowResults,
  setCurrentQuestionId,
  setCurrentAnswerId,
  setSavedAnswer,
  setError,
  setShowResults,
  resetQuiz
}) => {
  const countableQuestionId = Number(currentQuestionId);
  const { question, answers } = quizData[countableQuestionId];

  // TODO rewrite all handlers
  const handleClickAnswer = (e: MouseEvent) => {
    const id = getOr('', ['target', 'dataset', 'id'], e);

    setCurrentAnswerId(id);
    setError('');
  };

  const handleClickNext = () => {
    if (!currentAnswerId) {
      setError('Выберите один из вариантов ответа');

      return;
    }

    const savedAnswer = { questionId: question.id, answerId: currentAnswerId };

    setSavedAnswer(savedAnswer);
    setCurrentAnswerId('');

    if (countableQuestionId + 1 < quizData.length) {
      setCurrentQuestionId(String(countableQuestionId + 1));

      return;
    }

    setShowResults(true);
  };

  const handleClickRestart = () => {
    resetQuiz();
  };

  return (
    <div className={styles.root}>
      {hasToShowResults ? (
        <Results
          quizData={quizData}
          savedAnswers={savedAnswers}
          onRestart={handleClickRestart}
        />
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
  );
};
