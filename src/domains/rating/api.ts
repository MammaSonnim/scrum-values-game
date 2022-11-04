import { ApiResponseWithDataT, ApiResponseWithItemsT } from '../../types';
import { requestDev } from '../../utils/request';
import {
  GetRatingRequestParamsT,
  PostRatingRequestParamsT,
  RatingItemT,
} from './types';

export type GetRatingResponseT = ApiResponseWithItemsT<RatingItemT>;
export type PostRatingResponseT = ApiResponseWithDataT<RatingItemT>;

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
  postRatingItem: async (params: PostRatingRequestParamsT) => {
    const req = await requestDev.post('rating', params);

    return req.data;
  },
};
