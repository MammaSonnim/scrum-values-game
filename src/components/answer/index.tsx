import React from 'react';
import classnames from 'classnames/bind';
import { AnswerType } from '../../types';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

interface AnswerProps {
  data: AnswerType;
  isSelected: boolean;
  onAnswerClick: any;
}

export const Answer: React.FC<AnswerProps> = ({
  data,
  isSelected,
  onAnswerClick
}) => {
  const { id, text } = data;

  return (
    <div
      className={cx('answer', { answer_selected: isSelected })}
      data-id={id}
      onClick={onAnswerClick}
    >
      {id}) {text}
    </div>
  );
};
