import React, { useState } from 'react';
import { quizData } from './data'
import { Progress } from './components/progress';
import { Question } from './components/question';
import { Answers } from './components/answers';
import styles from './style.module.css';

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  const { question, answers } = quizData[currentQuestion];

  const handleClickAnswer = (e: { target: { id: React.SetStateAction<null> } }) => {
    console.dir(e.target.id)
    setCurrentAnswer(e.target.id)
  }


  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.row}>
          <Progress
            total={3}
            currentCount={1}
          />
        </div>
        <div className={styles.row}>
          <Question
            data={question}
          />
        </div>
        <div className={styles.row}>
          <Answers
            data={answers}
            currentAnswer={currentAnswer}
            handleClickAnswer={handleClickAnswer}
          />
        </div>
        <button
          className={styles.button}
          onClick={handleClickNext}
        >
          Продолжить
        </button>
      </div>
    </div>
  );
}

export default App;

const handleClickNext = () => {
  console.log('piu');
}
