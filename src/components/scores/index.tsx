import React, { FC } from 'react';
import { startCase, camelCase } from 'lodash';
import { ScoresType } from '../../types';
import styles from './styles.module.css';

type Props = {
  scores: ScoresType | null;
};

export const Scores: FC<Props> = ({ scores }) => {
  if (!scores) {
    return null;
  }

  return (
    <ul className={styles.scores}>
      {Object.entries(scores).map(score => {
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
            {value}
          </li>
        );
      })}
    </ul>
  );
};
