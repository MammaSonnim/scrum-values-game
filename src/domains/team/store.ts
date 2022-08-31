import { combineReducers, legacy_createStore as createStore } from 'redux';
import { teamReducer } from './ducks';

const reducers = combineReducers({
  teamState: teamReducer,
})

export const store = createStore(reducers);
export const initialState = store.getState();
