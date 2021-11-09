import { createDomain } from 'effector';
import { createGate } from 'effector-react';
import { attachLogger } from 'effector-logger/attach';
import { IdT } from '../../types';
import { ScoresT } from './types';

export const Domain = createDomain('Quiz');

attachLogger(Domain);

// QUIZ
type QuizT = {
    hasToShowAnswerScores: boolean;
    hasToShowGameOver: boolean;
    currentQuestionId: IdT;
    currentAnswerId: IdT;
    error: string;
}

export const $quiz = Domain.createStore<QuizT>({
    hasToShowAnswerScores: false,
    hasToShowGameOver: false,
    currentQuestionId: '0',
    currentAnswerId: '',
    error: '',
})

export const showAnswerScores = Domain.createEvent<boolean>('SHOW_ANSWER_SCORES');
export const showGameOver = Domain.createEvent<boolean>('SET_SHOW_GAME_OVER');
export const setCurrentQuestionId = Domain.createEvent<IdT>('SET_CURRENT_QUESTION')
export const setCurrentAnswerId = Domain.createEvent<IdT>('SET_CURRENT_ANSWER')
export const setError = Domain.createEvent<string>('SET_ERROR')

// SCORES
export const $scores = Domain.createStore<ScoresT>({
    courage: 2,
    focus: 2,
    commitment: 2,
    respect: 2,
    opennes: 2
});

export const updateTotalScores = Domain.createEvent<ScoresT>('UPDATE_TOTAL_SCORES');
export const updateTotalScoresFx = Domain.createEffect<ScoresT, void, void>('UPDATE_TOTAL_SCORES/FX');

// COMMON
export const resetQuizAndScores = Domain.createEvent<void>('RESET_QUIZ')
