import React, { FC } from 'react';
import cn from 'classnames';
import { ScoresT } from '../../models/types';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';

type Props = {
  scores: ScoresT | null;
};

export const Scores: FC<Props> = ({ scores }) => {
  const { t } = useTranslation();

  if (!scores) {
    return null;
  }

  return (
    <ul className={styles.scores}>
      {Object.entries(scores).map((score) => {
        const [key, value] = score;

        return (
          <li
            className={styles.score}
            key={key}
            title={t(key.toString()) || ''}
          >
            <img
              className={styles.icon}
              src={require(`./assets/${key}.png`)}
              alt={key}
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
