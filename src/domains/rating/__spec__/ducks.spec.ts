import { fakeDate } from '../../../constants';
import {
  actionCreators,
  loadRating,
  RaitingInitialStateT,
  ratingReducer,
} from '../ducks';
import { RatingItemRawT, RatingItemT } from '../types';
import { GetRatingResponseT, ratingApi } from '../api';

const ratingItems: RatingItemT[] = [
  {
    id: 1,
    teamName: 'piu',
    scores: 12,
    date: fakeDate,
  },
];

describe('teamReducer', () => {
  describe('LOAD_RATING_WIP', () => {
    it('should return new state with isProcessing true', () => {
      const state: RaitingInitialStateT = {
        items: [],
        isProcessing: false,
      };

      const newState = ratingReducer(state, actionCreators.loadRatingWip());

      expect(newState).toEqual({
        items: [],
        isProcessing: true,
      });
    });
  });

  describe('LOAD_RATING_SUCCESS', () => {
    it('should return new state with isProcessing true', () => {
      const state: RaitingInitialStateT = {
        items: [],
        isProcessing: true,
      };

      const newState = ratingReducer(
        state,
        actionCreators.loadRatingSuccess(ratingItems)
      );

      expect(newState).toEqual({
        items: ratingItems,
        isProcessing: false,
      });
    });
  });

  describe('LOAD_RATING_FAILED', () => {
    it('should return new state with isProcessing true', () => {
      const state: RaitingInitialStateT = {
        items: [],
        isProcessing: true,
      };

      const newState = ratingReducer(state, actionCreators.loadRatingFailed());

      expect(newState).toEqual({
        items: [],
        isProcessing: false,
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
  const ratingItemsRaw: RatingItemRawT[] = [
    {
      id: 1,
      name: 'piu',
    },
  ];

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
        items: ratingItemsRaw,
        totalCount: 20,
        error: '',
      };

      mockedApi.requestRating.mockReturnValue(
        Promise.resolve(ratingRequestResponseSuccess)
      );

      const thunk = loadRating();

      await thunk(fakeDispatch, fakeGetState, null);

      expect(fakeDispatch).toBeCalledTimes(2);
      expect(fakeDispatch).toHaveBeenNthCalledWith(
        1,
        actionCreators.loadRatingWip()
      );
      expect(fakeDispatch).toHaveBeenNthCalledWith(
        2,
        actionCreators.loadRatingSuccess(ratingItems)
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

      const thunk = loadRating();

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
