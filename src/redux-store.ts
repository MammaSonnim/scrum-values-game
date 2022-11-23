import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  Action,
} from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { lobbyReducer } from './domains/lobby/ducks';
import { ratingReducer } from './domains/rating/ducks';

const rootReducer = combineReducers({
  lobbyState: lobbyReducer,
  rating: ratingReducer,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__
  ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export type RootStateT = ReturnType<typeof rootReducer>;

export type BaseActionT<T> = T extends {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type BaseThunkT<A extends Action, R = void> = ThunkAction<
  R,
  RootStateT,
  unknown,
  A
>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;
