export {
  mapStateToProps as quizMapStateToProps,
  mapDispatchToProps as quizMapDispatchToProps
} from './containers/quiz';

// TODO use it for IdType?
export type Brand<T, U> = T & { __brand: U };

export type IdType = string;

export type TODO_ANY = any;

export type QuestionType = {
  id: IdType;
  title: string;
  text: string;
};

export type ScoreType = number;

export type ScoresType = {
  courage: ScoreType;
  focus: ScoreType;
  commitment: ScoreType;
  respect: ScoreType;
  opennes: ScoreType;
};

export type AnswerType = {
  id: IdType;
  text: string;
  scores: ScoresType | null;
  warning: string | null;
  note: string | null;
};

export type DataType = {
  question: QuestionType;
  answers: AnswerType[];
}[];
