// playground for redux-arch
import { BaseActionT, BaseThunkT, RootStateT } from '../../redux-store';
import { ratingApi } from './api';
import { SavedFilterParamsT, RatingItemT, RatingFilterParamsT } from './types';

const NAMESPACE = 'RATING';

const LOAD_RAITING_WIP = `${NAMESPACE}/LOAD_RAITING_WIP` as const;
const LOAD_RAITING_SUCCESS = `${NAMESPACE}/LOAD_RAITING_SUCCESS` as const;
const LOAD_RAITING_FAILED = `${NAMESPACE}/LOAD_RAITING_FAILED` as const;
const SAVE_FILTER_PARAMS = `${NAMESPACE}/SAVE_FILTER_PARAMS` as const;

export const ratingInitialState = {
  items: [] as RatingItemT[],
  isProcessing: false,
  totalCount: 0,
  // Saved params when form is submitted
  // TODO maybe not in object, but in separate fields
  savedFilterParams: null as SavedFilterParamsT,
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

    case SAVE_FILTER_PARAMS:
      return {
        ...state,
        savedFilterParams: action.payload,
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

  saveFilterParams: (params?: SavedFilterParamsT) =>
    ({
      type: SAVE_FILTER_PARAMS,
      payload: params,
    } as const),
};

// thunks
// fetching data and saving params from UI (form or URL) to BLL
export const loadRatingAndSaveParams = (
  params?: RatingFilterParamsT
): ThunkActionT => {
  return async (dispatch) => {
    if (params) {
      dispatch(actionCreators.saveFilterParams(params));
    }

    dispatch(actionCreators.loadRatingWip());

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

export const selectRatingIsProcessing = (state: RootStateT) => {
  return selectRatingState(state).isProcessing;
};

export const selectSavedFilterParams = (state: RootStateT) => {
  return selectRatingState(state).savedFilterParams;
};

// types
export type ActionT = BaseActionT<typeof actionCreators>;
export type ThunkActionT = BaseThunkT<ActionT>;
