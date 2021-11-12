import { IdT } from '../../types';

export type QuestionType = {
    id: IdT;
    title: string;
    text: string;
};

export type ScoreType = number;

export type ScoresT = {
    courage: ScoreType;
    focus: ScoreType;
    commitment: ScoreType;
    respect: ScoreType;
    opennes: ScoreType;
};

export type AnswerType = {
    id: IdT;
    text: string;
    scores: ScoresT | null;
    warning: string | null;
    note: string | null;
};

export type DataT = {
    question: QuestionType;
    answers: AnswerType[];
}[];
