export type IdType = string | number;

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
