import React, { FC } from 'react';
import { quizData } from './data';
import { SavedAnswerType, IdType } from './types';
import { Quiz } from './components/quiz';
import { Results } from './components/results';
import styles from './styles.module.css';

// TODO use generics
type Props = {
  currentQuestionId: IdType;
  currentAnswerId: IdType;
  savedAnswers: SavedAnswerType[];
  error: string;
  hasToShowResults: boolean;
  setCurrentQuestionId: any;
  setCurrentAnswerId: any;
  setSavedAnswer: any;
  setError: any;
  setShowResults: any;
  resetQuiz: any;
};

const App: FC<Props> = ({
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
  const handleClickAnswer = (e: {
    target: { dataset: { id: React.SetStateAction<string> } };
  }) => {
    const { id } = e.target.dataset;

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
        <Quiz
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

export default App;
