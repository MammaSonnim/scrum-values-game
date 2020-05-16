import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import quizReducer from './ducks/quiz';
import logger from 'redux-logger';

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {
    quiz: quizReducer
  },
  middleware
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
