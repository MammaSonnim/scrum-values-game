import { UserInfoT } from '../../models/userInfo/types';
import {
  EmptyObjectT,
  FunctionWithoutParamsT,
  TeamSessionIdT,
} from '../../types';

export type TeammateT = {
  photoUrl: string;
  login: string;
  id: number;
  isReady: boolean;
  isCreator: boolean;
};

export type ResponseDataT = {
  id: TeamSessionIdT;
  teammates: TeammateT[];
};

export type LobbyDataT = {
  teamSessionId: TeamSessionIdT | null;
  teammates: TeammateT[];
};

export type LobbyStateT = {
  names: string[];
  name: string;
  data: LobbyDataT | null;
  isChannelReady: boolean;
};

export type EventNameT = 'message_received' | 'status_changed';

// PROPS
export type StatePropsT = LobbyStateT;

export type DispatchPropsT = {
  onAddTeamName: FunctionWithoutParamsT;
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
