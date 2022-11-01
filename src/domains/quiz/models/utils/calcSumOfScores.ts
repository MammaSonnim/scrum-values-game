import { ScoresT } from '../types';

export const calcSumOfScores = (scores: ScoresT) => {
  return Object.values(scores).reduce((a, b) => a + b, 0);
};
