import { getOr } from 'lodash/fp';
import { DataType, SavedAnswerType } from '../types';

export const getResults = (data: DataType, savedAnswers: SavedAnswerType[]) => {
  return savedAnswers.map(savedAnswer => {
    const dataItem = data.find(
      item => item.question.id === savedAnswer.questionId
    );

    const id = getOr(null, ['question', 'id'], dataItem);
    const title = getOr(null, ['question', 'title'], dataItem);
    const correctAnswerId = getOr(null, 'correctAnswerId', dataItem);

    return {
      id,
      title,
      isCorrectAnswer: correctAnswerId == savedAnswer.answerId
    };
  });
};
