import { RatingItemRawT } from '../types';

// TODO remove, when my BE is ready
export const transformRatingData = (rawItems: RatingItemRawT[]) => {
  return rawItems.map((item) => {
    const { id, name } = item;

    return {
      id,
      teamName: name,
      scores: Math.round(Math.random() * 100),
      date: Date.now(),
    };
  });
};
