import { ScoresT } from '../types';

export const calcIsGameLost = (totalScores: ScoresT) => {
  return Object.values(totalScores).some((score) => {
    return score <= 0;
  });
};
