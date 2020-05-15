import React, { useState, FC } from 'react';
import { quizData } from './data';
import { SavedAnswerType } from './types';
import { Quiz } from './components/quiz';
import { Results } from './components/results';
import styles from './styles.module.css';

const App: FC = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState('');
  const [currentAnswerId, setCurrentAnswerId] = useState('');
  const [savedAnswers, setAnswers] = useState<SavedAnswerType[]>([]);
  const [error, setError] = useState('');
  const [hasToShowResults, setShowResults] = useState(false);

  const { question, answers } = quizData[Number(currentQuestionId)];

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

    savedAnswers.push(savedAnswer);
    setAnswers(savedAnswers);
    setCurrentAnswerId('');

    if (Number(currentQuestionId) + 1 < quizData.length) {
      // TODO rm this shit
      setCurrentQuestionId(String(Number(currentQuestionId) + 1));

      return;
    }

    setShowResults(true);
  };

  const handleClickRestart = () => {
    setCurrentQuestionId('');
    setCurrentAnswerId('');
    setAnswers([]);
    setShowResults(false);
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
