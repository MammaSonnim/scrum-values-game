// playground for redux-arch
import { BaseActionT, BaseThunkT, RootStateT } from '../../redux-store';
import { ratingApi } from './api';
import { GetRatingRequestParamsT, RatingItemT } from './types';

const NAMESPACE = 'RATING';

const LOAD_RAITING_WIP = `${NAMESPACE}/LOAD_RAITING_WIP` as const;
const LOAD_RAITING_SUCCESS = `${NAMESPACE}/LOAD_RAITING_SUCCESS` as const;
const LOAD_RAITING_FAILED = `${NAMESPACE}/LOAD_RAITING_FAILED` as const;
const SET_QUERY_PARAMS = `${NAMESPACE}/SET_QUERY_PARAMS` as const;

type QueryParamsT = GetRatingRequestParamsT | null | undefined;

export const ratingInitialState = {
  items: [] as RatingItemT[],
  isProcessing: false,
  totalCount: 0,
  // TODO maybe not in object, but in separate fields
  queryParams: null as QueryParamsT,
};

export type RaitingInitialStateT = typeof ratingInitialState;

export const ratingReducer = (
  state = ratingInitialState,
  action: ActionT
): RaitingInitialStateT => {
  switch (action.type) {
    case LOAD_RAITING_WIP:
      return {
        ...state,
        isProcessing: true,
      };

    case LOAD_RAITING_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
        totalCount: action.payload.totalCount,
        isProcessing: false,
      };

    case LOAD_RAITING_FAILED:
      return {
        ...state,
        items: [],
        isProcessing: false,
      };

    case SET_QUERY_PARAMS:
      return {
        ...state,
        queryParams: action.payload,
      };

    default:
      return state;
  }
};

export const actionCreators = {
  loadRatingWip: () =>
    ({
      type: LOAD_RAITING_WIP,
    } as const),

  loadRatingSuccess: ({
    items,
    totalCount,
  }: {
    items: RatingItemT[];
    totalCount: number;
  }) =>
    ({
      type: LOAD_RAITING_SUCCESS,
      payload: {
        items,
        totalCount,
      },
    } as const),

  loadRatingFailed: () =>
    ({
      type: LOAD_RAITING_FAILED,
    } as const),

  setQueryParams: (params?: QueryParamsT) =>
    ({
      type: SET_QUERY_PARAMS,
      payload: params,
    } as const),
};

// thunks
export const loadRating = (params?: GetRatingRequestParamsT): ThunkActionT => {
  return async (dispatch) => {
    dispatch(actionCreators.loadRatingWip());
    dispatch(actionCreators.setQueryParams(params));

    const result = await ratingApi.requestRating(params);

    if (!result.error) {
      const { items, totalCount } = result;

      return dispatch(
        actionCreators.loadRatingSuccess({
          items,
          totalCount,
        })
      );
    }

    return dispatch(actionCreators.loadRatingFailed());
  };
};

// selectors
export const selectRatingState = (state: RootStateT) => {
  return state.rating;
};

export const selectRatingItems = (state: RootStateT) => {
  return selectRatingState(state).items;
};

export const selectRatingTotalCount = (state: RootStateT) => {
  return selectRatingState(state).totalCount;
};

export const selectRatingisProcessing = (state: RootStateT) => {
  return selectRatingState(state).isProcessing;
};

// types
type ActionT = BaseActionT<typeof actionCreators>;
type ThunkActionT = BaseThunkT<ActionT>;
