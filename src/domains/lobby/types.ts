import { UserInfoT } from '../../models/userInfo/types';
import { EmptyObjectT, TeamSessionIdT } from '../../types';
import { LobbyInitialStateT } from './ducks';

export type TeammateT = {
  photoUrl: string;
  login: string;
  id: number;
  isReady: boolean;
  isCreator: boolean;
};

export type TeammateAddRequestParamsT = {
  type: 'get-team-session';
  id: number;
  name: string;
  photoUrl?: string | null;
  teamSessionId?: TeamSessionIdT | null;
};

export type TeamDataChangeRequestParamsT = {
  type: 'change-team-name';
  teamName: string;
  teamSessionId: TeamSessionIdT;
};

export type TeamSessionResponseT = {
  type: 'get-team-session' | 'change-team-name';
  id: TeamSessionIdT;
  teammates: TeammateT[];
  teamName?: string;
};

export type TeamSessionT = {
  teamSessionId: TeamSessionIdT | null;
  teammates: TeammateT[];
  teamName?: string;
};

export type EventNameT = 'message_received' | 'status_changed';

// PROPS
export type StatePropsT = Pick<
  LobbyInitialStateT,
  'teamName' | 'teamSessionId' | 'teammates' | 'isUserCreator'
>;

export type DispatchPropsT = {
  onChangeTeamName: (value: string) => void;
  onStartDataListening: (teamSessionId: TeamSessionIdT | null) => void;
  onStopDataListening: () => void;
  sendData: (message: string) => void;
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
  'teamName' | 'onChangeTeamName' | 'isUserCreator'
>;
