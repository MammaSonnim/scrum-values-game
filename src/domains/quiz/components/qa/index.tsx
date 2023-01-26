import React, { FC, MouseEvent } from 'react';
import cn from 'classnames';
import { Text, Button } from '../../../../components';
import { AnswerT, QuestionT } from '../../models/types';
import { Progress } from '../progress';
import { Question } from '../question';
import { Answers } from '../answers';
import styles from './styles.module.css';

type Props = {
  buttonType: string;
  isButtonDisabled: boolean;
  isAnyAnswerSelected: boolean;

  quizDataLength: number;
  question: QuestionT;
  answers: AnswerT[];
  currentQuestionId: number;
  currentAnswerId: number | null;
  error: string;
  isAnswerScoresVisible: boolean;
  onAnswerClick: (e: MouseEvent) => void;
  onShowScoresClick: (e: MouseEvent) => void;
  onNextClick: (e: MouseEvent) => void;
};

export const QA: FC<Props> = ({
  isAnswerScoresVisible,
  isButtonDisabled,
  quizDataLength,
  currentQuestionId,
  question,
  answers,
  currentAnswerId,
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
          currentCount={Number(currentQuestionId)}
        />
        <Question data={question} />
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
          <Button onClick={onNextClick}>Next</Button>
        ) : (
          <Button onClick={onShowScoresClick} disabled={isButtonDisabled}>
            Show answers
          </Button>
        )}
        <span className={cn({ [styles.col]: error })}>
          <Text type='warn'>{error}</Text>
        </span>
      </div>
    </div>
  );
};
