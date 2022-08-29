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
      teamState.name = action.payload;

      return teamState;
    case ADD_TEAM_NAME:
      teamState.names.push(teamState.name);
      teamState.name = '';

      return teamState

    default:
      return teamState;
  }
}

export const changeTeamNameAC = (value: string) => ({
  type: CHANGE_TEAM_NAME,
  payload: value,
})

export const addTeamNameAC = () => ({
  type: ADD_TEAM_NAME
})


// export const store = {
//   _state: {
//     teamState: {
//       names: [] as string[],
//       name: '',
//     },
//   },
//   _callSubscriber (f: TODO_ANY) {
//     console.log(`rerender, ${this.getState()}`, f)
//   },
//   getState () {
//     return this._state;
//   },
//   subscribe (observer: () => void) {
//     this._callSubscriber = observer;
//   },
//   dispatch (action: { type: string, payload: TODO_ANY }) {
//     const state = this.getState();
//     this._state.teamState = teamReducer(state.teamState, action);
//
//     this._callSubscriber(state);
//   }
// }
