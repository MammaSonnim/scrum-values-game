// playground for redux-arch
import { Dispatch } from 'react';
import { $userInfo } from '../../models/userInfo';
import { UserInfoT } from '../../models/userInfo/types';
import { BaseActionT, BaseThunkT, RootStateT } from '../../redux-store';
import { TeamSessionIdT } from '../../types';
import { lobbiApi } from './api';
import { LobbyDataT, ResponseDataT } from './types';

const NAMESPACE = 'LOBBY';

const CHANGE_TEAM_NAME = `${NAMESPACE}/CHANGE_TEAM_NAME` as const;

const DATA_RECEIVED = `${NAMESPACE}/DATA_RECEIVED` as const;
const SET_IS_CHANNEL_READY = `${NAMESPACE}/SET_IS_CHANNEL_READY` as const;

export const lobbyInitialState = {
  teamName: 'Super Puper Team',
  data: null as LobbyDataT | null,
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

    case DATA_RECEIVED:
      return {
        ...lobbyState,
        data: action.payload,
        teamName: action.payload.teamName || lobbyState.teamName,
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
  dataReceived: (data: LobbyDataT) =>
    ({
      type: DATA_RECEIVED,
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
    dispatch(
      sendData(
        JSON.stringify({
          type: 'change-teamdata',
          teamName: value,
          teamSessionId: teamSessionId || null,
        })
      )
    );
  };
};

/** Cash handler for passing dispatch and unsubscribe (need same link to handler) */
let _dataHandlerCached: ((message: string) => void) | null = null;

const dataHandlerCreator = (dispatch: Dispatch<ActionT>) => {
  if (!_dataHandlerCached) {
    _dataHandlerCached = (message: string) => {
      let parsedData: ResponseDataT | null = null;

      try {
        parsedData = JSON.parse(message);
      } catch (_e) {
        if (message === 'string') {
          console.warn('Unsupported format of message from server:', message);
        }
      }

      dispatch(
        actionCreators.dataReceived({
          teamSessionId: parsedData?.id || null,
          teammates: parsedData?.teammates || [],
          teamName: parsedData?.teamName,
        })
      );
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

      if (status === WebSocket.OPEN && userInfo) {
        dispatch(
          sendData(
            JSON.stringify({
              type: 'add-teammate',
              // TODO SVG-8 NOT PRODUCTION CODE!
              id: Date.now() / 100,
              name: userInfo.login,
              isCreator: userInfo.isCreator,
              photoUrl: userInfo.photoUrl,
              teamSessionId: teamSessionId || null,
            })
          )
        );
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

export const selectLobbyData = (state: RootStateT) => {
  return selectLobbyState(state).data;
};

export const selectIsChannelReady = (state: RootStateT) => {
  return selectLobbyState(state).isChannelReady;
};

export const selectTeamSessionId = (state: RootStateT) => {
  return selectLobbyState(state)?.data?.teamSessionId;
};

// types
type ActionT = BaseActionT<typeof actionCreators>;
type ThunkActionT = BaseThunkT<ActionT>;
