// playground for redux-arch
// import { TODO_ANY } from '../../types';

const CHANGE_TEAM_NAME = 'CHANGE_TEAM_NAME' as const;
const ADD_TEAM_NAME = 'ADD_TEAM_NAME' as const;

export const teamInitialState = {
  names: [] as string[],
  name: '',
};

export const teamReducer = (
  teamState = teamInitialState,
  action: teamActionType
): typeof teamInitialState => {
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

type changeTeamNameACT = {
  type: typeof CHANGE_TEAM_NAME;
  payload: string;
};

export const changeTeamNameAC = (value: string): changeTeamNameACT => ({
  type: CHANGE_TEAM_NAME,
  payload: value,
});

type addTeamNameACT = {
  type: typeof ADD_TEAM_NAME;
};

export const addTeamNameAC = (): addTeamNameACT => ({
  type: ADD_TEAM_NAME,
});

type teamActionType = changeTeamNameACT | addTeamNameACT;
