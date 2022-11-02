// playground for redux-arch
import { BaseActionT, BaseThunkT, RootStateT } from '../../redux-store';

const NAMESPACE = 'TEAM';

const CHANGE_TEAM_NAME = `${NAMESPACE}/CHANGE_TEAM_NAME` as const;
const ADD_TEAM_NAME = `${NAMESPACE}/ADD_TEAM_NAME` as const;

export const teamInitialState = {
  names: [] as string[],
  name: '',
};

export type TeamInitialStateT = typeof teamInitialState;

export const teamReducer = (
  teamState = teamInitialState,
  action: ActionT
): TeamInitialStateT => {
  switch (action.type) {
    case CHANGE_TEAM_NAME:
      return {
        ...teamState,
        name: action.payload,
      };

    case ADD_TEAM_NAME:
      return {
        ...teamState,
        names: [...teamState.names, teamState.name],
        name: '',
      };

    default:
      return teamState;
  }
};

export const actionCreators = {
  changeTeamName: (value: string) =>
    ({
      type: CHANGE_TEAM_NAME,
      payload: value,
    } as const),
  addTeamName: () =>
    ({
      type: ADD_TEAM_NAME,
    } as const),
};

// thunks
export const changeTeamName = (value: string): ThunkActionT => {
  return (dispatch) => {
    dispatch(actionCreators.changeTeamName(value));
  };
};

// selectors
export const selectTeamState = (state: RootStateT) => {
  return state.teamState;
};

// types
type ActionT = BaseActionT<typeof actionCreators>;
type ThunkActionT = BaseThunkT<ActionT>;
