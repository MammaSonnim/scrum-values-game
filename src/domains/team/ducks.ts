// playground for redux-arch
import { TODO_ANY } from '../../types';

const CHANGE_TEAM_NAME = 'CHANGE_TEAM_NAME';
const ADD_TEAM_NAME = 'ADD_TEAM_NAME';

export const teamInitialState = {
  names: [] as string[],
  name: '',
};

export const teamReducer = (teamState = teamInitialState, action: TODO_ANY) => {
  switch (action.type) {
    case CHANGE_TEAM_NAME:
      return {
        ...teamState,
        name: action.payload,
      };

    case ADD_TEAM_NAME:
      return {
        ...teamState,
        names: [
          ...teamState.names,
          teamState.name,
        ],
        name: '',
      }

    default:
      return teamState;
  }
}

export const changeTeamNameAC = (value: string) => ({
  type: CHANGE_TEAM_NAME,
  payload: value,
})

export const addTeamNameAC = () => ({
  type: ADD_TEAM_NAME,
})
