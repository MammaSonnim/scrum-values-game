export {
  mapStateToProps as quizMapStateToProps,
  mapDispatchToProps as quizMapDispatchToProps
} from './containers/quiz';

// TODO use it for IdT?
export type Brand<T, U> = T & { __brand: U };

export type IdT = string;

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type TODO_ANY = any;

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

export type DataType = {
  question: QuestionType;
  answers: AnswerType[];
}[];
