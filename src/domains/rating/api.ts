import { ApiResponseWithItemsT } from '../../types';
import { requestDev } from '../../utils/request';
import { GetRatingRequestParamsT, RatingItemT } from './types';

export type GetRatingResponseT = ApiResponseWithItemsT<RatingItemT>;

export const ratingApi = {
  requestRating: async (params?: GetRatingRequestParamsT) => {
    const searchParams = new URLSearchParams(
      params as unknown as Record<string, string>
    );
    const queryString = searchParams.toString();

    const req = await requestDev.get<GetRatingResponseT>(
      `rating${queryString && '?'}${queryString}`
    );

    return req.data;
  },
};
