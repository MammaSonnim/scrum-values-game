import { ScoresType } from '../types';

export const calcIsNeedToGameOver = (totalScores: ScoresType) => {
  return Object.values(totalScores).some(score => {
    return score <= 0;
  });
};
