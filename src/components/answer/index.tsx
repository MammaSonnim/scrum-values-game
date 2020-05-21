import React, { FC, MouseEvent } from 'react';
import classnames from 'classnames/bind';
import { AnswerType } from '../../types';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

type Props = {
  data: AnswerType;
  isSelected: boolean;
  onAnswerClick: (e: MouseEvent) => void;
};

export const Answer: FC<Props> = ({ data, isSelected, onAnswerClick }) => {
  const { id, text } = data;

  return (
    <label
      data-id={id}
      onClick={onAnswerClick}
      className={cx('answer', {
        'nes-text is-primary': isSelected
      })}
    >
      <input type="radio" className="nes-radio" name="answer" />
      <span>
        {id}){text}
      </span>
    </label>
  );
};
