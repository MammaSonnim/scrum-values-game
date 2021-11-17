import React, { Fragment, FC, MouseEvent } from 'react';
import classnames from 'classnames/bind';
import { Scores } from '../scores';
import { Warning } from '../warning';
import { AnswerT } from '../../models/quiz/types';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

type Props = {
  data: AnswerT;
  isSelected: boolean;
  hasToShowAnswerScores: boolean;
  onAnswerClick: (e: MouseEvent) => void;
};

export const Answer: FC<Props> = ({
  data,
  isSelected,
  hasToShowAnswerScores,
  onAnswerClick
}) => {
  const { id, text, scores, warning, note } = data;

  return (
    <Fragment>
      <label
        data-id={id}
        className={cx('answer', {
          'nes-text is-primary': isSelected
        })}
      >
        <input
          onClick={onAnswerClick}
          value={id}
          type="radio"
          className="nes-radio"
          name="answer"
          disabled={hasToShowAnswerScores}
        />
        <span>
          {id}) {text}
        </span>
      </label>
      {hasToShowAnswerScores && (
        <Fragment>
          <Warning warning={warning} note={note} />
          <Scores scores={scores} />
        </Fragment>
      )}
    </Fragment>
  );
};
