import { TODO_ANY } from '../../types';

const CHANGE_TEAM_NAME = 'CHANGE_TEAM_NAME';
const ADD_TEAM_NAME = 'ADD_TEAM_NAME';

// playground for redux-arch
export const store = {
  _state: {
    teamState: {
      names: [] as string[],
      name: '',
    },
  },
  _callSubscriber (f: TODO_ANY) {
    console.log(`rerender, ${this.getState()}`, f)
  },
  getState () {
    return this._state;
  },
  subscribe (observer: () => void) {
    this._callSubscriber = observer;
  },
  dispatch (action: { type: string, payload: TODO_ANY }) {
    const { teamState } = this._state;
    switch (action.type) {
      case CHANGE_TEAM_NAME:
        teamState.name = action.payload;

        this._callSubscriber(this.getState());

        break;
      case ADD_TEAM_NAME:
        teamState.names.push(teamState.name);
        this.dispatch({ type: 'CHANGE_NAME', payload: '' })

        this._callSubscriber(this.getState());

        break;
    }
  }
}

export const changeTeamNameAC = (value: string) => ({
  type: CHANGE_TEAM_NAME,
  payload: value,
})

export const addTeamNameAC = () => ({
  type: ADD_TEAM_NAME
})
