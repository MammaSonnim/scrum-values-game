import React, { FC } from 'react';
import classnames from 'classnames/bind';
import { AnswerType, TODO_ANY } from '../../types';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

type Props = {
  data: AnswerType;
  isSelected: boolean;
  onAnswerClick: TODO_ANY;
};

export const Answer: FC<Props> = ({ data, isSelected, onAnswerClick }) => {
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
