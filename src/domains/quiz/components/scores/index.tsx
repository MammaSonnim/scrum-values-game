import React, { FC } from 'react';
import cn from 'classnames';
import { ScoresT } from '../../models/types';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { ValueIcon } from '../../../../components';
import { useStore } from 'effector-react';
import { $gameStep } from '../../models';

type Props = {
  isGameOver?: boolean;
  scores: ScoresT | null;
};

export const Scores: FC<Props> = ({ scores, isGameOver }) => {
  const { t } = useTranslation();
  const gameStep = useStore($gameStep);

  if (!scores) {
    return null;
  }

  return (
    <ul className={styles.scores}>
      {Object.entries(scores).map((score) => {
        const [key, value] = score;

        return (
          <li
            className={
              gameStep === 'gameOver'
                ? cn(styles.score, {
                    [styles['score__value_zeroOrNegative']]: value <= 0,
                  })
                : styles.score
            }
            key={key}
            title={t(key.toString()) || ''}
          >
            <ValueIcon
              type={key as keyof ScoresT}
              className={styles['score__icon']}
            />
            <span
              className={cn(styles['score__value'], {
                [styles['score__value_negative']]: value < 0,
              })}
            ></span>
            {value}
          </li>
        );
      })}
    </ul>
  );
};
