import { ScoresT } from '../types';

/**
 * Возвращает конфиг Formik
 */
export const calcIsNeedToGameOver = (totalScores: ScoresT) => {
  return Object.values(totalScores).some(score => {
    return score <= 0;
  });
};