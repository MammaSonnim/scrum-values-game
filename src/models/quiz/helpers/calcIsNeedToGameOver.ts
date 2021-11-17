import { ScoresT } from '../types';

export const calcIsNeedToGameOver = (totalScores: ScoresT) => {
  return Object.values(totalScores).some(score => {
    return score <= 0;
  });
};
