import React, { Fragment, FC, MouseEvent } from 'react';
import classnames from 'classnames/bind';
import { Scores } from '../scores';
import { Warning } from '../warning';
import { AnswerType } from '../../types';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

type Props = {
  data: AnswerType;
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
        onClick={onAnswerClick}
        className={cx('answer', {
          'nes-text is-primary': isSelected
        })}
      >
        <input
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
