import { TODO_ANY } from '../../types';

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
      case 'CHANGE_NAME':
        teamState.name = action.payload;

        this._callSubscriber(this.getState());

        break;
      case 'ADD_TEAM_NAME':
        teamState.names.push(teamState.name);
        this.dispatch({ type: 'CHANGE_NAME', payload: '' })

        this._callSubscriber(this.getState());

        break;
    }
  }
}

// let rerenderDom = (state: TODO_ANY) => {
//   console.log(`rerender, ${state}`)
// };
//
// export const changeName = (s: string, needToRerender = true) => {
//   teamState.name = s;
//
//   if (needToRerender) {
//     rerenderDom(teamState);
//   }
// }

// export const addTeamName = () => {
//   teamState.names.push(teamState.name);
//   changeName('', false);
//
//   rerenderDom(teamState);
// }

// export const subscribe = (observer: (state: TODO_ANY) => void) => {
//   rerenderDom = observer;
// }
