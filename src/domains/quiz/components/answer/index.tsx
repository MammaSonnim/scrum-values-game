import React, { Fragment, FC, MouseEvent } from 'react';
import cn from 'classnames';
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
    <Fragment>
      <label
        data-id={id}
        className={cn(styles.answer, {
          [`nes-text is-primary ${styles.answer_selected}`]: isSelected,
        })}
      >
        <input
          onClick={onAnswerClick}
          value={id}
          type='radio'
          className='nes-radio'
          name='answer'
          disabled={isAnswerScoresVisible}
        />
        <span>
          {id}) {text}
        </span>
      </label>
      {isAnswerScoresVisible && (
        <Fragment>
          <Warning warning={warning} note={note} />
          <Scores scores={scores} />
        </Fragment>
      )}
    </Fragment>
  );
};
