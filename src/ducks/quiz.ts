import { createReducer, createAction } from '@reduxjs/toolkit';
import { IdType } from '../types';

/**
 * Constants
 */
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const SET_CURRENT_ANSWER = 'SET_CURRENT_ANSWER';
export const SET_ERROR = 'SET_ERROR';
export const SET_SHOW_RESULTS = 'SET_SHOW_RESULTS';
export const SET_SAVED_ANSWERS = 'SET_ANSWERS';
export const RESET_QUIZ = 'RESET_QUIZ';

/**
 * Actions
 */
export const setCurrentQuestionId = createAction<IdType>(SET_CURRENT_QUESTION);
export const setCurrentAnswerId = createAction<IdType>(SET_CURRENT_ANSWER);
export const setError = createAction<string>(SET_ERROR);
export const setShowGameOver = createAction<boolean>(SET_SHOW_RESULTS);
export const resetQuiz = createAction(RESET_QUIZ);

/**
 * Reducer
 */
const initialState = {
  currentQuestionId: '0',
  currentAnswerId: '',
  error: '',
  hasToShowGameOver: false
};

export type QuizStateType = {
  quiz: typeof initialState;
};

const quizReducer = createReducer(initialState, builder =>
  builder
    .addCase(setCurrentQuestionId, (state, action) => {
      state.currentQuestionId = action.payload;
    })
    .addCase(setCurrentAnswerId, (state, action) => {
      state.currentAnswerId = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setShowGameOver, (state, action) => {
      state.hasToShowGameOver = action.payload;
    })
    .addCase(resetQuiz, () => initialState)
);

// Can try to use this kind of notation
// const quizReducer2 = createReducer(initialState, {
//   [SET_CURRENT_ANSWER]: (
//     state,
//     action: ReturnType<typeof setCurrentAnswerId>
//   ) => {}
// });

export default quizReducer;
