import React, { FC } from 'react';
import { ScoresT } from '../../models/types';
import { Scores } from '../scores';
import styles from './styles.module.css';

type Props = {
  scores: ScoresT;
};

export const Heading: FC<Props> = ({ scores }) => {
  return (
    <div className={styles.heading}>
      <div className={styles['scores-wrapper']}>
        <Scores scores={scores} />
      </div>
    </div>
  );
};
