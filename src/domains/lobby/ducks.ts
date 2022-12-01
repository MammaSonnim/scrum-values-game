// playground for redux-arch
import { Dispatch } from 'react';
import { $userInfo } from '../../models/userInfo';
import { UserInfoT } from '../../models/userInfo/types';
import { BaseActionT, BaseThunkT, RootStateT } from '../../redux-store';
import { EmptyObjectT } from '../../types';
import { lobbiApi } from './api';
import {
  TeamSessionT,
  TeamSessionGetResponseT,
  TeamNameChangeResponseT,
  TeamNameChangeRequestParamsT,
  TeamSessionGetRequestParamsT,
  TeammateT,
  TeamReadyStatusChangeRequestParamsT,
  TeammateDataChangeResponseT,
  TeamSessionIdT,
  CanTeammateStartGameUpdateResponseT,
} from './types';

const NAMESPACE = 'LOBBY';

const SET_IS_CHANNEL_READY = `${NAMESPACE}/SET_IS_CHANNEL_READY` as const;

// actions started from UI
const INIT_SEND_DATA = `${NAMESPACE}/INIT_SEND_DATA` as const;
const CHANGE_TEAM_NAME = `${NAMESPACE}/CHANGE_TEAM_NAME` as const;
const CHANGE_READY_FOR_GAME_STATUS =
  `${NAMESPACE}/CHANGE_READY_FOR_GAME_STATUS` as const;
const INIT_START_GAME = `${NAMESPACE}/INIT_START_GAME` as const;

// received messages from server
const SESSION_RECEIVED = `${NAMESPACE}/SESSION_RECEIVED` as const;
const TEAM_NAME_RECEIVED = `${NAMESPACE}/TEAM_NAME_RECEIVED` as const;
const TEAMMATES_RECEIVED = `${NAMESPACE}/TEAMMATES_RECEIVED` as const;
const CAN_START_GAME_STATUS_RECEIVED =
  `${NAMESPACE}/CAN_START_GAME_STATUS_RECEIVED` as const;

// additional setters after parsing message from server
const SET_IS_USER_CREATOR = `${NAMESPACE}/SET_IS_USER_CREATOR` as const;

export const lobbyInitialState = {
  teamName: 'Super Puper Team',
  teammates: [] as TeammateT[],
  teamSessionId: null as TeamSessionIdT | null,
  isChannelReady: false,
  isUserCreator: false,
  isReadyForGame: false,
  canStartGame: false,
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

    case CHANGE_READY_FOR_GAME_STATUS:
      return {
        ...lobbyState,
        isReadyForGame: action.payload,
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

    case TEAMMATES_RECEIVED:
      return {
        ...lobbyState,
        teammates: action.payload,
      };

    case CAN_START_GAME_STATUS_RECEIVED:
      return {
        ...lobbyState,
        canStartGame: action.payload,
      };

    case SET_IS_USER_CREATOR:
      return {
        ...lobbyState,
        isUserCreator: action.payload,
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
  changeReadyForGameStatus: (value: boolean) =>
    ({
      type: CHANGE_READY_FOR_GAME_STATUS,
      payload: value,
    } as const),
  sessionReceived: (data: TeamSessionT) =>
    ({
      type: SESSION_RECEIVED,
      payload: data,
    } as const),
  initSendData: () => ({
    type: INIT_SEND_DATA,
    payload: null,
  }),
  initStartGame: () => ({
    type: INIT_START_GAME,
    payload: null,
  }),
  teamNameReceived: (data: string) =>
    ({
      type: TEAM_NAME_RECEIVED,
      payload: data,
    } as const),
  teammatesReceived: (data: TeammateT[]) =>
    ({
      type: TEAMMATES_RECEIVED,
      payload: data,
    } as const),
  canStartGameStatusReceived: (data: boolean) => ({
    type: CAN_START_GAME_STATUS_RECEIVED,
    payload: data,
  }),
  setIsUserCreator: (data: boolean) =>
    ({
      type: SET_IS_USER_CREATOR,
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
      const teamDataRequestParams: TeamNameChangeRequestParamsT = {
        type: 'change-team-name',
        teamName: value,
        teamSessionId,
      };

      dispatch(sendData(JSON.stringify(teamDataRequestParams)));
    }
  };
};

export const changeReadyForGameStatus = (value: boolean): ThunkActionT => {
  return (dispatch, getState) => {
    const teamSessionId = selectTeamSessionId(getState());
    const userId = $userInfo.getState().id;

    if (userId && teamSessionId) {
      // SVG-32 TODO add error handlers
      dispatch(actionCreators.changeReadyForGameStatus(value));

      const requestParams: TeamReadyStatusChangeRequestParamsT = {
        type: 'change-teammate-ready-for-game-status',
        isReadyForGame: value,
        teamSessionId,
        teammateId: userId,
      };

      dispatch(sendData(JSON.stringify(requestParams)));
    }
  };
};

/** Cash handler for passing dispatch and unsubscribe (need same link to handler) */
let _dataHandlerCached: ((message: string) => void) | null = null;

const dataHandlerCreator = (
  dispatch: Dispatch<ActionT>,
  userInfo?: UserInfoT
) => {
  if (!_dataHandlerCached) {
    /** Handle data received from server */
    _dataHandlerCached = (message: string) => {
      let parsedData:
        | TeamSessionGetResponseT
        | TeamNameChangeResponseT
        | TeammateDataChangeResponseT
        | CanTeammateStartGameUpdateResponseT
        | EmptyObjectT = {};

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

        session.teammates.forEach((teammate) => {
          if (userInfo?.id === teammate.id) {
            dispatch(actionCreators.setIsUserCreator(teammate.isCreator));
          }
        });
      }

      if (parsedData.type === 'change-team-name') {
        const teamName = parsedData?.teamName;

        if (teamName) {
          dispatch(actionCreators.teamNameReceived(teamName));
        }
      }

      if (parsedData.type === 'change-teammate-data') {
        const teammates = parsedData?.teammates;

        if (teammates) {
          dispatch(actionCreators.teammatesReceived(teammates));
        }
      }

      if (parsedData.type === 'update-can-teammate-start-game') {
        const canStartGame = parsedData?.canStartGame;

        dispatch(actionCreators.canStartGameStatusReceived(canStartGame));
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
        const newTeammate: TeamSessionGetRequestParamsT = {
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
    lobbiApi.subscribe(
      'message_received',
      dataHandlerCreator(dispatch, $userInfo.getState())
    );
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

export const initGame = (): ThunkActionT => {
  return (dispatch, getState) => {
    const teamSessionId = selectTeamSessionId(getState());

    dispatch(
      sendData(
        JSON.stringify({
          teamSessionId,
        })
      )
    );
  };
};

export const sendData = (message: string): ThunkActionT => {
  return (dispatch) => {
    dispatch(actionCreators.initSendData());

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

export const selectIsUserCreator = (state: RootStateT) => {
  return selectLobbyState(state).isUserCreator;
};

export const selectIsReadyForGame = (state: RootStateT) => {
  return selectLobbyState(state).isReadyForGame;
};

export const selectCanStartGame = (state: RootStateT) => {
  return selectLobbyState(state).canStartGame;
};

// types
type ActionT = BaseActionT<typeof actionCreators>;
type ThunkActionT = BaseThunkT<ActionT>;
