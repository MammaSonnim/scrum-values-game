import {
  actionCreators,
  changeTeamName,
  TeamInitialStateT,
  teamReducer,
} from '../ducks';

describe('teamReducer', () => {
  describe('CHANGE_TEAM_NAME', () => {
    it('should return new state with updated name', () => {
      const state: TeamInitialStateT = {
        names: [],
        name: '',
      };

      const newState = teamReducer(state, actionCreators.changeTeamName('piu'));

      expect(newState).toEqual({
        names: [],
        name: 'piu',
      });
    });
  });

  describe('ADD_TEAM_NAME', () => {
    it('should return new state with updated names and clear name', () => {
      const state: TeamInitialStateT = {
        names: [],
        name: 'piu',
      };

      const newState = teamReducer(state, actionCreators.addTeamName());

      expect(newState).toEqual({
        names: ['piu'],
        name: '',
      });
    });

    it('should return new state with several names and clear name', () => {
      const state: TeamInitialStateT = {
        names: ['miu'],
        name: 'piu',
      };

      const newState = teamReducer(state, actionCreators.addTeamName());

      expect(newState).toEqual({
        names: ['miu', 'piu'],
        name: '',
      });
    });
  });
});

describe('thunks', () => {
  const fakeDispatch = jest.fn();
  const fakeGetState = jest.fn();

  beforeEach(() => {
    fakeDispatch.mockClear();
    fakeGetState.mockClear();
  });

  describe('changeTeamName', () => {
    it('should call dispatch specific times with specific actionCreator', () => {
      const thunk = changeTeamName('piu');

      thunk(fakeDispatch, fakeGetState, null);

      expect(fakeDispatch).toBeCalledTimes(1);
      expect(fakeDispatch).toHaveBeenNthCalledWith(
        1,
        actionCreators.changeTeamName('piu')
      );
    });
  });
});
