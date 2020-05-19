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

export type AnswerType = {
  id: IdType;
  text: string;
};

export type SavedAnswerType = {
  questionId: IdType;
  answerId: IdType;
};

export type DataType = {
  correctAnswerId: IdType;
  question: QuestionType;
  answers: AnswerType[];
}[];
