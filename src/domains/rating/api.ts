import { ApiResponseWithItemsT } from '../../types';
import { request } from '../../utils/request';
import { GetRatingRequestParamsT, RatingItemRawT } from './types';

export type GetRatingResponseT = ApiResponseWithItemsT<RatingItemRawT>;

export const ratingApi = {
  requestRating: async (params?: GetRatingRequestParamsT) => {
    const searchParams = new URLSearchParams(
      params as unknown as Record<string, string>
    );
    const searchQueryString = searchParams.toString();

    // temp random API, unless I have own BE
    const req = await request.get<GetRatingResponseT>(
      `users?${searchQueryString}`
    );

    return req.data;
  },
};
