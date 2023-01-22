import React, { FC, MouseEvent } from 'react';
import cn from 'classnames';
import { Text } from '../../../../components';
import { AnswerT } from '../../models/types';
import { Scores } from '../scores';
import { Warning } from '../warning';
import styles from './styles.module.css';

type Props = {
  data: AnswerT;
  isSelected: boolean;
  isAnswerScoresVisible: boolean;
  onAnswerClick: (e: MouseEvent) => void;
};

export const Answer: FC<Props> = ({
  data,
  isSelected,
  isAnswerScoresVisible,
  onAnswerClick,
}) => {
  const { id, text, scores, warning, note } = data;

  return (
    <div
      className={cn(styles.answer, {
        [styles['answer_with-visible-scores']]: isAnswerScoresVisible,
        [styles['answer_selected']]: isSelected,
      })}
    >
      <label data-id={id} className={cn(styles['answer__text'])}>
        <input
          className={styles['answer__radio']}
          onClick={onAnswerClick}
          value={id}
          type='radio'
          name='answer'
          disabled={isAnswerScoresVisible}
        />
        <Text>
          {id}) {text}
        </Text>
      </label>
      {isAnswerScoresVisible && (
        <div className={styles['answer__scores']}>
          <Warning warning={warning} note={note} />
          <Scores scores={scores} />
        </div>
      )}
    </div>
  );
};
