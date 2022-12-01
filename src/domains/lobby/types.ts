import { UserInfoT, UserIdT } from '../../models/userInfo/types';
import { Brand, EmptyObjectT } from '../../types';
import { LobbyInitialStateT } from './ducks';

export type TeamSessionIdT = Brand<string, 'TeamSidT'>;

export type TeammateT = {
  photoUrl: string;
  login: string;
  id: UserIdT;
  isReady: boolean;
  isCreator: boolean;
};

export type TeamSessionGetRequestParamsT = {
  type: 'get-team-session';
  id: number;
  name: string;
  photoUrl?: string | null;
  teamSessionId?: TeamSessionIdT | null;
};

export type TeamNameChangeRequestParamsT = {
  type: 'change-team-name';
  teamName: string;
  teamSessionId: TeamSessionIdT;
};

export type TeamNameChangeResponseT = {
  type: 'change-team-name';
  teamName?: string;
};

export type TeamReadyStatusChangeRequestParamsT = {
  type: 'change-teammate-ready-for-game-status';
  isReadyForGame: boolean;
  teamSessionId: TeamSessionIdT;
  teammateId: UserIdT;
};

// isReady, name, avatar, etc
export type TeammateDataChangeResponseT = {
  type: 'change-teammate-data';
  teammates: TeammateT[];
  canStartGame: boolean;
};

export type TeamSessionGetResponseT = {
  type: 'get-team-session';
  id: TeamSessionIdT;
  teammates: TeammateT[];
  teamName?: string;
};

export type TeamSessionT = {
  teamSessionId: TeamSessionIdT | null;
  teammates: TeammateT[];
  teamName?: string;
};

export type CanTeammateStartGameUpdateResponseT = {
  type: 'update-can-teammate-start-game';
  canStartGame: boolean;
};

export type EventNameT = 'message_received' | 'status_changed';

// PROPS
export type StatePropsT = Pick<
  LobbyInitialStateT,
  | 'teamName'
  | 'teamSessionId'
  | 'teammates'
  | 'isUserCreator'
  | 'isReadyForGame'
  | 'canStartGame'
>;

export type DispatchPropsT = {
  onChangeTeamName: (value: string) => void;
  onStartDataListening: (teamSessionId: TeamSessionIdT | null) => void;
  onStopDataListening: () => void;
  sendData: (message: string) => void;
  changeReadyForGameStatus: (value: boolean) => void;
  initGame: () => void;
};

export type OwnPropsT = EmptyObjectT;

export type HocsPropsT = {
  userInfo: UserInfoT;
};

export type PropsT = StatePropsT & DispatchPropsT & OwnPropsT & HocsPropsT;

export type TeammatePropsT = {
  data: TeammateT;
};

export type TeamNamePropsT = Pick<
  PropsT,
  'teamName' | 'onChangeTeamName' | 'isUserCreator' | 'changeReadyForGameStatus'
>;
