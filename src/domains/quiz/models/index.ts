import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { attachLogger } from 'effector-logger/attach';
import {
  ButtonTypeT,
  QuizDataT,
  GameStepT,
  GameModeT,
  ScoresT,
  TeamPresetT,
} from './types';

export const Domain = createDomain('Quiz');

attachLogger(Domain);

export const QuizAppGate = createGate('QuizAppGate');

export const $quizData = Domain.createStore<QuizDataT>([]);

export const $gameMode = Domain.createStore<GameModeT>('solo');

export const initQuiz = Domain.createEvent<GameModeT>('INIT_QUIZ');
export const initQuizFx = Domain.createEffect<GameModeT, QuizDataT, Error>(
  'INIT_QUIZ/FX'
);

// QUESTIONS / ANSWERS
export const selectAnswer = Domain.createEvent<number>('SELECT_ANSWER');
export const goToNextQuestion = Domain.createEvent('GO_TO_NEXT_QUESTION');
export const showAnswerScores = Domain.createEvent('SHOW_ANSWER_SCORES');

export const $isAnswerScoresVisible = Domain.createStore<boolean>(false);
export const $isButtonDisabled = Domain.createStore<boolean>(true);
export const $isAnyAnswerSelected = Domain.createStore<boolean>(false);
export const $currentAnswerId = Domain.createStore<number | null>(null);
export const $currentQuestionId = Domain.createStore<number>(1);

// TOTAL SCORES
export const updateTotalScores = Domain.createEvent<ScoresT | undefined>(
  'UPDATE_TOTAL_SCORES'
);

export const $scores = Domain.createStore<ScoresT>({
  courage: 0,
  focus: 0,
  commitment: 0,
  respect: 0,
  opennes: 0,
});

export const $teamPreset = Domain.createStore<TeamPresetT>({
  title: '',
  description: '',
  scores: {
    courage: 0,
    focus: 0,
    commitment: 0,
    respect: 0,
    opennes: 0,
  },
});

// GAME STEP
export const $gameStep = Domain.createStore<GameStepT>('teamPreset');
export const changeGameStep = Domain.createEvent<GameStepT>('CHANGE_GAME_STEP');

// GAME OVER
export const showGameOver = Domain.createEvent<boolean>('SHOW_GAME_OVER');
export const showGameOverFx = Domain.createEffect<number, void, void>(
  'SHOW_GAME_OVER/FX'
);
export const restartGame = Domain.createEvent('RESTART_GAME');
