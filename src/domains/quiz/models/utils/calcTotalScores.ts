import { ScoresT } from '../types';

export const calcTotalScores = (
  totalScores: ScoresT,
  currentAnswerScores: ScoresT
) => {
  return {
    courage: totalScores.courage + currentAnswerScores.courage,
    focus: totalScores.focus + currentAnswerScores.focus,
    commitment: totalScores.commitment + currentAnswerScores.commitment,
    respect: totalScores.respect + currentAnswerScores.respect,
    opennes: totalScores.opennes + currentAnswerScores.opennes,
  };
};
