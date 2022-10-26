import { BrowserHistory } from 'history';
import { UserInfoT } from '../../models/userInfo/types';
import { FunctionWithoutParamsT } from '../../types';

export type TeamStateT = {
  names: string[];
  name: string;
};

// PROPS
export type StatePropsT = {
  teamState: TeamStateT;
};

export type DispatchPropsT = {
  onAddTeamName: FunctionWithoutParamsT;
  onChangeTeamName: (value: string) => void;
};

export type OwnPropsT = {
  history: BrowserHistory;
};

export type HocsPropsT = {
  userInfo: UserInfoT;
};

export type PropsT = StatePropsT & DispatchPropsT & OwnPropsT & HocsPropsT;
