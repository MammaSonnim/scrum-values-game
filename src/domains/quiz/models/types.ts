export type IdT = string;

export type QuestionT = {
  id: IdT;
  title: string;
  text: string;
};

export type ScoreT = number;

export type ScoresT = {
  courage: ScoreT;
  focus: ScoreT;
  commitment: ScoreT;
  respect: ScoreT;
  opennes: ScoreT;
};

export type AnswerT = {
  id: IdT;
  text: string;
  scores: ScoresT | null;
  warning: string | null;
  note: string | null;
};

export type DataT = {
  question: QuestionT;
  answers: AnswerT[];
}[];

export type QuizT = {
  isAnswerScoresVisible: boolean;
  isGameOverVisible: boolean;
  currentQuestionId: IdT;
  currentAnswerId: IdT;
  error: string;
};

export type QuizModeT = 'solo' | 'democracy' | 'chosen-one' | 'ultimate';
export type ButtonTypeT = 'showAnswerScores' | 'nextQuestion';
