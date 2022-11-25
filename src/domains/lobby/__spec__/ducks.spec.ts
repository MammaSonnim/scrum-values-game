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
        teammates: [],
        teamSessionId: null,
        isChannelReady: false,
        isUserCreator: false,
      };

      const newState = lobbyReducer(
        state,
        actionCreators.changeTeamName('piu')
      );

      expect(newState).toEqual({
        teamName: 'piu',
        teammates: [],
        teamSessionId: null,
        isChannelReady: false,
        isUserCreator: false,
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
    it('should call dispatch specific times with specific actionCreator when there is no teamSessionId', () => {
      fakeGetState = jest.fn(() => {
        return {
          lobbyState: {
            teamSessionId: null,
          },
        };
      });

      const changeTeamNameThunk = changeTeamName('piu');

      changeTeamNameThunk(fakeDispatch, fakeGetState, null);

      expect(fakeDispatch).toBeCalledTimes(1);
      expect(fakeDispatch).toHaveBeenNthCalledWith(
        1,
        actionCreators.changeTeamName('piu')
      );
    });
  });
});
