import { createDomain } from 'effector';
// TODO fix dts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { attachLogger } from 'effector-logger/attach';
import { IdT, TODO_ANY, DataT } from '../../types';
import { quizData } from '../../data';
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

export const setCurrentQuestionId = Domain.createEvent<IdT>('SET_CURRENT_QUESTION_ID')

export const setCurrentAnswerId = Domain.createEvent<IdT>('SET_CURRENT_ANSWER_ID')
export const selectAnswer = Domain.createEvent<IdT>('SELECT_ANSWER')
export const selectAnswerFx = Domain.createEffect<IdT, TODO_ANY>('SELECT_ANSWER/FX');

export const setError = Domain.createEvent<string>('SET_ERROR')
export const resetErrorFx = Domain.createEffect<string, void, void>('RESET_ERROR/FX');

export const goToNextQuestion = Domain.createEvent<void>('GO_TO_NEXT_QUESTION');
export const goToNextQuestionFx = Domain.createEffect<void, void, void>('GO_TO_NEXT_QUESTION/FX');

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

// QUIZ DATA
export const $data = Domain.createStore<DataT>(quizData)
