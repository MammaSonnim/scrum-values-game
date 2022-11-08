import { fakeDate } from '../../../constants';
import {
  actionCreators,
  loadRatingAndSaveParams,
  RaitingInitialStateT,
  ratingReducer,
} from '../ducks';
import { RatingItemT } from '../types';
import { GetRatingResponseT, ratingApi } from '../api';

const ratingItems: RatingItemT[] = [
  {
    id: 1,
    teamName: 'piu',
    scores: 12,
    date: fakeDate,
  },
];

const ratingData = {
  items: ratingItems,
  totalCount: 1,
};

describe('teamReducer', () => {
  describe('LOAD_RATING_WIP', () => {
    it('should return new state with isProcessing true', () => {
      const state: RaitingInitialStateT = {
        items: [],
        totalCount: 0,
        isProcessing: false,
        savedFilterParams: null,
      };

      const newState = ratingReducer(state, actionCreators.loadRatingWip());

      expect(newState).toEqual({
        items: [],
        totalCount: 0,
        isProcessing: true,
        savedFilterParams: null,
      });
    });
  });

  describe('LOAD_RATING_SUCCESS', () => {
    it('should return new state with isProcessing true', () => {
      const state: RaitingInitialStateT = {
        items: [],
        totalCount: 0,
        isProcessing: true,
        savedFilterParams: null,
      };

      const newState = ratingReducer(
        state,
        actionCreators.loadRatingSuccess(ratingData)
      );

      expect(newState).toEqual({
        items: ratingItems,
        totalCount: 1,
        isProcessing: false,
        savedFilterParams: null,
      });
    });
  });

  describe('LOAD_RATING_FAILED', () => {
    it('should return new state with isProcessing true', () => {
      const state: RaitingInitialStateT = {
        items: [],
        totalCount: 0,
        isProcessing: true,
        savedFilterParams: null,
      };

      const newState = ratingReducer(state, actionCreators.loadRatingFailed());

      expect(newState).toEqual({
        items: [],
        totalCount: 0,
        isProcessing: false,
        savedFilterParams: null,
      });
    });
  });

  describe('SET_QUERY_PARAMS', () => {
    it('should return new state with savedFilterParams', () => {
      const state: RaitingInitialStateT = {
        items: [],
        totalCount: 0,
        isProcessing: false,
        savedFilterParams: null,
      };

      const newState = ratingReducer(
        state,
        actionCreators.saveFilterParams({
          searchString: 'Hej',
        })
      );

      expect(newState).toEqual({
        items: [],
        totalCount: 0,
        isProcessing: false,
        savedFilterParams: {
          searchString: 'Hej',
        },
      });
    });
  });
});

// thunks
jest.mock('../api');
const mockedApi = ratingApi as jest.Mocked<typeof ratingApi>;

const fakeDispatch = jest.fn();
const fakeGetState = jest.fn();

describe('thunks', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    jest.spyOn(Date, 'now').mockImplementation(() => fakeDate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadRating', () => {
    it('should call dispatch specific times with specific actionCreators when SUCCESS', async () => {
      const ratingRequestResponseSuccess: GetRatingResponseT = {
        items: ratingItems,
        totalCount: 1,
        error: '',
      };

      mockedApi.requestRating.mockReturnValue(
        Promise.resolve(ratingRequestResponseSuccess)
      );

      const thunk = loadRatingAndSaveParams();

      await thunk(fakeDispatch, fakeGetState, null);

      expect(fakeDispatch).toBeCalledTimes(2);
      expect(fakeDispatch).toHaveBeenNthCalledWith(
        1,
        actionCreators.loadRatingWip()
      );
      expect(fakeDispatch).toHaveBeenNthCalledWith(
        2,
        actionCreators.loadRatingSuccess(ratingData)
      );
    });

    it('should call dispatch specific times with specific actionCreators when FAILED', async () => {
      const ratingRequestResponseFailed: GetRatingResponseT = {
        items: [],
        totalCount: 0,
        error: 'piu!',
      };

      mockedApi.requestRating.mockReturnValue(
        Promise.resolve(ratingRequestResponseFailed)
      );

      const thunk = loadRatingAndSaveParams();

      await thunk(fakeDispatch, fakeGetState, null);

      expect(fakeDispatch).toBeCalledTimes(2);
      expect(fakeDispatch).toHaveBeenNthCalledWith(
        1,
        actionCreators.loadRatingWip()
      );
      expect(fakeDispatch).toHaveBeenNthCalledWith(
        2,
        actionCreators.loadRatingFailed()
      );
    });
  });
});
