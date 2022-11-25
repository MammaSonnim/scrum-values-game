// playground for redux-arch
import { Dispatch } from 'react';
import { $userInfo } from '../../models/userInfo';
import { UserInfoT } from '../../models/userInfo/types';
import { BaseActionT, BaseThunkT, RootStateT } from '../../redux-store';
import { EmptyObjectT, TeamSessionIdT } from '../../types';
import { lobbiApi } from './api';
import {
  TeamSessionT,
  TeamSessionResponseT,
  TeamDataChangeRequestParamsT,
  TeammateAddRequestParamsT,
  TeammateT,
} from './types';

const NAMESPACE = 'LOBBY';

const CHANGE_TEAM_NAME = `${NAMESPACE}/CHANGE_TEAM_NAME` as const;

const SESSION_RECEIVED = `${NAMESPACE}/SESSION_RECEIVED` as const;
const TEAM_NAME_RECEIVED = `${NAMESPACE}/TEAM_NAME_RECEIVED` as const;
const SET_IS_CHANNEL_READY = `${NAMESPACE}/SET_IS_CHANNEL_READY` as const;

export const lobbyInitialState = {
  teamName: 'Super Puper Team',
  teammates: [] as TeammateT[],
  teamSessionId: null as TeamSessionIdT | null,
  isChannelReady: false,
};

export type LobbyInitialStateT = typeof lobbyInitialState;

export const lobbyReducer = (
  lobbyState = lobbyInitialState,
  action: ActionT
): LobbyInitialStateT => {
  switch (action.type) {
    case CHANGE_TEAM_NAME:
      return {
        ...lobbyState,
        teamName: action.payload,
      };

    case SESSION_RECEIVED:
      return {
        ...lobbyState,
        teammates: action.payload.teammates,
        teamSessionId: action.payload.teamSessionId,
        teamName: action.payload.teamName || lobbyState.teamName,
      };

    case TEAM_NAME_RECEIVED:
      return {
        ...lobbyState,
        teamName: action.payload,
      };

    case SET_IS_CHANNEL_READY:
      return {
        ...lobbyState,
        isChannelReady: action.payload,
      };

    default:
      return lobbyState;
  }
};

export const actionCreators = {
  changeTeamName: (value: string) =>
    ({
      type: CHANGE_TEAM_NAME,
      payload: value,
    } as const),
  sessionReceived: (data: TeamSessionT) =>
    ({
      type: SESSION_RECEIVED,
      payload: data,
    } as const),
  teamNameReceived: (data: string) =>
    ({
      type: TEAM_NAME_RECEIVED,
      payload: data,
    } as const),
  setIsChannelReady: (isChannelReady: boolean) =>
    ({
      type: SET_IS_CHANNEL_READY,
      payload: isChannelReady,
    } as const),
};

// thunks
export const changeTeamName = (value: string): ThunkActionT => {
  return (dispatch, getState) => {
    const teamSessionId = selectTeamSessionId(getState());

    dispatch(actionCreators.changeTeamName(value));

    if (teamSessionId) {
      const teamDataRequestParams: TeamDataChangeRequestParamsT = {
        type: 'change-team-name',
        teamName: value,
        teamSessionId,
      };

      dispatch(sendData(JSON.stringify(teamDataRequestParams)));
    }
  };
};

/** Cash handler for passing dispatch and unsubscribe (need same link to handler) */
let _dataHandlerCached: ((message: string) => void) | null = null;

const dataHandlerCreator = (dispatch: Dispatch<ActionT>) => {
  if (!_dataHandlerCached) {
    _dataHandlerCached = (message: string) => {
      let parsedData: TeamSessionResponseT | EmptyObjectT = {};

      try {
        parsedData = JSON.parse(message);
      } catch (_e) {
        if (message === 'string') {
          console.warn('Unsupported format of message from server:', message);
        }
      }

      if (parsedData.type === 'get-team-session') {
        const session: TeamSessionT = {
          teamSessionId: parsedData?.id || null,
          teammates: parsedData?.teammates || [],
          teamName: parsedData?.teamName,
        };

        dispatch(actionCreators.sessionReceived(session));
      }

      if (parsedData.type === 'change-team-name') {
        const teamName = parsedData?.teamName;

        if (teamName) {
          dispatch(actionCreators.teamNameReceived(teamName));
        }
      }
    };
  }

  return _dataHandlerCached;
};

/** Cash handler for passing dispatch and unsubscribe (need same link to handler) */
let _statusHandlerCached: ((status: number) => void) | null = null;

const statusHandlerCreator = (
  dispatch: Dispatch<ThunkActionT | ActionT>,
  userInfo?: UserInfoT,
  teamSessionId?: TeamSessionIdT | null
) => {
  if (!_statusHandlerCached) {
    _statusHandlerCached = (status: number) => {
      dispatch(actionCreators.setIsChannelReady(status === WebSocket.OPEN));

      if (
        status === WebSocket.OPEN &&
        userInfo &&
        userInfo.login &&
        userInfo.id
      ) {
        const newTeammate: TeammateAddRequestParamsT = {
          type: 'get-team-session',
          id: userInfo.id,
          name: userInfo.login,
          photoUrl: userInfo.photoUrl,
          teamSessionId,
        };

        dispatch(sendData(JSON.stringify(newTeammate)));
      }
    };
  }

  return _statusHandlerCached;
};

export const startDataListening = (
  teamSessionId: TeamSessionIdT | null
): ThunkActionT => {
  return (dispatch) => {
    lobbiApi.start();
    lobbiApi.subscribe('message_received', dataHandlerCreator(dispatch));
    lobbiApi.subscribe(
      'status_changed',
      statusHandlerCreator(dispatch, $userInfo.getState(), teamSessionId)
    );
  };
};

export const stopDataListening = (): ThunkActionT => {
  return (dispatch) => {
    lobbiApi.stop();
    lobbiApi.unsubscribe('message_received', dataHandlerCreator(dispatch));
    lobbiApi.unsubscribe('status_changed', statusHandlerCreator(dispatch));
  };
};

export const sendData = (message: string): ThunkActionT => {
  return () => {
    lobbiApi.sendMessage(message);
  };
};

// selectors
export const selectLobbyState = (state: RootStateT) => {
  return state.lobbyState;
};

export const selectTeamName = (state: RootStateT) => {
  return selectLobbyState(state).teamName;
};

export const selectIsChannelReady = (state: RootStateT) => {
  return selectLobbyState(state).isChannelReady;
};

export const selectTeammates = (state: RootStateT) => {
  return selectLobbyState(state).teammates;
};

export const selectTeamSessionId = (state: RootStateT) => {
  return selectLobbyState(state).teamSessionId;
};

// types
type ActionT = BaseActionT<typeof actionCreators>;
type ThunkActionT = BaseThunkT<ActionT>;
