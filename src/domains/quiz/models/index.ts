import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { attachLogger } from 'effector-logger/attach';
import { quizData } from '../../../data';
import { IdT, DataT, QuizT } from './types';
import { ScoresT } from './types';

export const Domain = createDomain('Quiz');

attachLogger(Domain);

export const QuizAppGate = createGate('QuizAppGate');

// QUIZ
export const $quiz = Domain.createStore<QuizT>({
  isAnswerScoresVisible: false,
  isGameOverVisible: false,
  currentQuestionId: '0',
  currentAnswerId: '',
  error: '',
});

export const toggleAnswerScoresVisibility = Domain.createEvent<boolean>(
  'TOGGLE_ANSWER_SCORES'
);

export const showAnswerScores = Domain.createEvent<void>('SHOW_ANSWER_SCORES');
export const showAnswerScoresFx = Domain.createEffect<void, void, void>(
  'SHOW_ANSWER_SCORES/FX'
);

export const showGameOver = Domain.createEvent<boolean>('SET_SHOW_GAME_OVER');

export const setCurrentQuestionId = Domain.createEvent<IdT>(
  'SET_CURRENT_QUESTION_ID'
);

export const setCurrentAnswerId = Domain.createEvent<IdT>(
  'SET_CURRENT_ANSWER_ID'
);
export const selectAnswer = Domain.createEvent<IdT>('SELECT_ANSWER');
export const selectAnswerFx = Domain.createEffect<IdT, void, void>(
  'SELECT_ANSWER/FX'
);

export const setError = Domain.createEvent<string>('SET_ERROR');
export const resetErrorFx = Domain.createEffect<string, void, void>(
  'RESET_ERROR/FX'
);

export const goToNextQuestion = Domain.createEvent<void>('GO_TO_NEXT_QUESTION');
export const goToNextQuestionFx = Domain.createEffect<void, void, void>(
  'GO_TO_NEXT_QUESTION/FX'
);

// SCORES
export const $scores = Domain.createStore<ScoresT>({
  courage: 2,
  focus: 2,
  commitment: 2,
  respect: 2,
  opennes: 2,
});

export const updateTotalScores = Domain.createEvent<ScoresT>(
  'UPDATE_TOTAL_SCORES'
);
export const updateTotalScoresFx = Domain.createEffect<ScoresT, void, void>(
  'UPDATE_TOTAL_SCORES/FX'
);

// COMMON
export const restartGame = Domain.createEvent<void>('RESTART_GAME');

// QUIZ DATA
export const $data = Domain.createStore<DataT>(quizData);
