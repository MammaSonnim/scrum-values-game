import React, { FC, MouseEvent } from 'react';
import cn from 'classnames/bind';
import { Error, Button } from '../../../../components';
import { AnswerT, QuestionT, IdT } from '../../models/types';
import { Progress } from '../progress';
import { Question } from '../question';
import { Answers } from '../answers';
import styles from './styles.module.css';

type Props = {
  quizDataLength: number;
  question: QuestionT;
  answers: AnswerT[];
  currentQuestionId: IdT;
  currentAnswerId: IdT;
  error: string;
  isAnswerScoresVisible: boolean;
  onAnswerClick: (e: MouseEvent) => void;
  onShowScoresClick: (e: MouseEvent) => void;
  onNextClick: (e: MouseEvent) => void;
};

export const QA: FC<Props> = ({
  quizDataLength,
  currentQuestionId,
  question,
  answers,
  currentAnswerId,
  isAnswerScoresVisible,
  error,
  onAnswerClick,
  onShowScoresClick,
  onNextClick,
}) => {
  return (
    <div>
      <div className={styles.row}>
        <Progress
          total={quizDataLength}
          currentCount={Number(currentQuestionId) + 1}
        />
      </div>
      <div className={styles.row}>
        <Question data={question}/>
      </div>
      <div className={styles.row}>
        <Answers
          data={answers}
          currentAnswerId={currentAnswerId}
          isAnswerScoresVisible={isAnswerScoresVisible}
          onAnswerClick={onAnswerClick}
        />
      </div>
      <div className={cn(styles.row, { [styles['row_with-cols']]: error })}>
        {isAnswerScoresVisible ? (
          <Button onClick={onNextClick}>Следующий вопрос</Button>

        ) : (
          <Button onClick={onShowScoresClick}>Показать ответ</Button>
        )}
        <span className={cn({ [styles.col]: error })}>
          <Error error={error}/>
        </span>
      </div>
    </div>
  );
};
