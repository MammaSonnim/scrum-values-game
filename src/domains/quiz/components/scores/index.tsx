import React, { FC } from 'react';
import cn from 'classnames';
import { startCase, camelCase } from 'lodash';
import { ScoresT } from '../../models/types';
import styles from './styles.module.css';

type Props = {
  scores: ScoresT | null;
};

export const Scores: FC<Props> = ({ scores }) => {
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
            title={startCase(camelCase(key))}
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
