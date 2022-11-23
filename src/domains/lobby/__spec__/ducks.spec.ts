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
        teamName: '',
        data: null,
        isChannelReady: false,
      };

      const newState = lobbyReducer(
        state,
        actionCreators.changeTeamName('piu')
      );

      expect(newState).toEqual({
        teamName: 'piu',
        data: null,
        isChannelReady: false,
      });
    });
  });
});

describe('thunks', () => {
  const fakeDispatch = jest.fn();
  let fakeGetState = jest.fn();

  beforeEach(() => {
    fakeDispatch.mockClear();
    fakeGetState.mockClear();
  });

  describe('changeTeamName', () => {
    it('should call dispatch specific times with specific actionCreator', () => {
      fakeGetState = jest.fn(() => {
        return {
          data: {
            teamSessionId: '1',
          },
        };
      });

      const thunk = changeTeamName('piu');

      thunk(fakeDispatch, fakeGetState, null);

      expect(fakeDispatch).toBeCalledTimes(2);
      expect(fakeDispatch).toHaveBeenNthCalledWith(
        1,
        actionCreators.changeTeamName('piu')
      );
    });
  });
});
