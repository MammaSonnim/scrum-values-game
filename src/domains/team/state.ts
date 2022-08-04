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
  changeName (s: string) {
    // eslint-disable-next-line no-debugger
    const teamState = this.getState().teamState;
    teamState.name = s;

    this._callSubscriber(this.getState());
  },
  addTeamName () {
    const teamState = this.getState().teamState;

    teamState.names.push(teamState.name);
    this.changeName('');

    this._callSubscriber(this.getState());
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
