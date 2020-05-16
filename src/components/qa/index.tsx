import React, { FC } from 'react';
import classnames from 'classnames/bind';
import { AnswerType, QuestionType, IdType, TODO_ANY } from '../../types';
import { Progress } from '../progress';
import { Question } from '../question';
import { Answers } from '../answers';
import { Error } from '../error';
import { Button } from '../button';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

type Props = {
  quizDataLength: number;
  question: QuestionType;
  answers: AnswerType[];
  currentQuestionId: IdType;
  currentAnswerId: IdType;
  error: string;
  onAnswerClick: TODO_ANY;
  onNextClick: TODO_ANY;
};

export const QA: FC<Props> = ({
  quizDataLength,
  currentQuestionId,
  question,
  answers,
  currentAnswerId,
  error,
  onAnswerClick,
  onNextClick
}) => {
  return (
    <div className={styles.content}>
      <div className={styles.row}>
        <Progress
          total={quizDataLength}
          currentCount={Number(currentQuestionId) + 1}
        />
      </div>
      <div className={styles.row}>
        <Question data={question} />
      </div>
      <div className={styles.row}>
        <Answers
          data={answers}
          currentAnswerId={currentAnswerId}
          onAnswerClick={onAnswerClick}
        />
      </div>
      <div className={cx('row', { 'row_with-cols': error })}>
        <Button onClick={onNextClick}>Продолжить</Button>
        <span className={cx({ col: error })}>
          <Error error={error} />
        </span>
      </div>
    </div>
  );
};
