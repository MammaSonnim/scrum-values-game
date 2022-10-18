import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { teamReducer } from './ducks';

const reducers = combineReducers({
  teamState: teamReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export const initialState = store.getState();
