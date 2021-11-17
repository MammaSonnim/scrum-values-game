import React, { FC, MouseEvent } from 'react';
import classnames from 'classnames/bind';
import { AnswerT, QuestionT, IdT } from '../../models/quiz/types';
import { Progress } from '../progress';
import { Question } from '../question';
import { Answers } from '../answers';
import { Error } from '../error';
import { Button } from '../button';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

type Props = {
  quizDataLength: number;
  question: QuestionT;
  answers: AnswerT[];
  currentQuestionId: IdT;
  currentAnswerId: IdT;
  error: string;
  hasToShowAnswerScores: boolean;
  onAnswerClick: (e: MouseEvent) => void;
  onNextClick: (e: MouseEvent) => void;
};

export const QA: FC<Props> = ({
  quizDataLength,
  currentQuestionId,
  question,
  answers,
  currentAnswerId,
  hasToShowAnswerScores,
  error,
  onAnswerClick,
  onNextClick
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
        <Question data={question} />
      </div>
      <div className={styles.row}>
        <Answers
          data={answers}
          currentAnswerId={currentAnswerId}
          hasToShowAnswerScores={hasToShowAnswerScores}
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
