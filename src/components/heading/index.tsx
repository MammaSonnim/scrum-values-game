import React, { FC } from 'react';
import classnames from 'classnames/bind';
import { ScoresType } from '../../types';
import { Scores } from '../scores';
import styles from './styles.module.css';

const cx = classnames.bind(styles);

type Props = {
  scores: ScoresType;
};

export const Heading: FC<Props> = ({ scores }) => {
  return (
    <div className={cx(styles.heading)}>
      <div className={styles['scores-wrapper']}>
        <Scores scores={scores} />
      </div>
    </div>
  );
};
