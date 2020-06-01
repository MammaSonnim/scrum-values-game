import { createReducer, createAction } from '@reduxjs/toolkit';
import { IdType, ScoresType } from '../types';
import { calcTotalScores } from '../helpers/calcTotalScores';

/**
 * Constants
 */
export const SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION';
export const SET_CURRENT_ANSWER = 'SET_CURRENT_ANSWER';
export const SET_ERROR = 'SET_ERROR';
export const SHOW_ANSWER_SCORES = 'SHOW_ANSWER_SCORES';
export const UPDATE_TOTAL_SCORES = 'SET_CURRENT_SCORES';
export const SHOW_GAME_OVER = 'SET_SHOW_GAME_OVER';
export const RESET_QUIZ = 'RESET_QUIZ';

/**
 * Actions
 */
export const setCurrentQuestionId = createAction<IdType>(SET_CURRENT_QUESTION);
export const setCurrentAnswerId = createAction<IdType>(SET_CURRENT_ANSWER);
export const setError = createAction<string>(SET_ERROR);
export const showAnswerScores = createAction<boolean>(SHOW_ANSWER_SCORES);
export const updateTotalScores = createAction<ScoresType>(UPDATE_TOTAL_SCORES);
export const showGameOver = createAction<boolean>(SHOW_GAME_OVER);
export const resetQuiz = createAction(RESET_QUIZ);

/**
 * Reducer
 */
const initialState = {
  currentQuestionId: '0',
  currentAnswerId: '',
  error: '',
  hasToShowAnswerScores: false,
  hasToShowGameOver: false,
  scores: {
    courage: 0,
    focus: 0,
    commitment: 0,
    respect: 0,
    opennes: 0
  }
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
    .addCase(showAnswerScores, (state, action) => {
      state.hasToShowAnswerScores = action.payload;
    })
    .addCase(updateTotalScores, (state, action) => {
      state.scores = calcTotalScores(state.scores, action.payload);
    })
    .addCase(showGameOver, (state, action) => {
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
