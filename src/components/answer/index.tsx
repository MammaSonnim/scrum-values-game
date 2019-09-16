import React from 'react';
import classnames from 'classnames/bind';
import { AnswerType } from '../../types';
import styles from './style.module.css';

const cx = classnames.bind(styles);

interface AnswerProps {
  data: AnswerType,
  isSelected: boolean,
  handleClickAnswer: any,
}

export const Answer: React.FC<AnswerProps> = ({
  data,
  isSelected,
  handleClickAnswer,
}) => {
  const { id, text } = data;

  return (
    <div
      className={cx('answer', { answer_selected: isSelected })}
      id={String(id)} // move to data-attr?
      onClick={handleClickAnswer}
    >
      {id}) {text}
    </div>
  )
}
