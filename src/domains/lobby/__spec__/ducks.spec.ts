import {
  actionCreators,
  changeTeamName,
  LobbyInitialStateT,
  lobbyReducer,
} from '../ducks';

describe('teamReducer', () => {
  describe('CHANGE_TEAM_NAME', () => {
    it('should return new state with updated name', () => {
      const state: LobbyInitialStateT = {
        names: [],
        name: '',
        data: null,
        isChannelReady: false,
      };

      const newState = lobbyReducer(
        state,
        actionCreators.changeTeamName('piu')
      );

      expect(newState).toEqual({
        names: [],
        name: 'piu',
        data: null,
        isChannelReady: false,
      });
    });
  });

  describe('ADD_TEAM_NAME', () => {
    it('should return new state with updated names and clear name', () => {
      const state: LobbyInitialStateT = {
        names: [],
        name: 'piu',
        data: null,
        isChannelReady: false,
      };

      const newState = lobbyReducer(state, actionCreators.addTeamName());

      expect(newState).toEqual({
        names: ['piu'],
        name: '',
        data: null,
        isChannelReady: false,
      });
    });

    it('should return new state with several names and clear name', () => {
      const state: LobbyInitialStateT = {
        names: ['miu'],
        name: 'piu',
        data: null,
        isChannelReady: false,
      };

      const newState = lobbyReducer(state, actionCreators.addTeamName());

      expect(newState).toEqual({
        names: ['miu', 'piu'],
        name: '',
        data: null,
        isChannelReady: false,
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
