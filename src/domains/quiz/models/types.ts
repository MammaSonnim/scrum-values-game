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

export type QuizDataT = {
  question: QuestionT;
  answers: AnswerT[];
}[];

export type GameModeT = 'solo' | 'democracy' | 'chosen-one' | 'ultimate';
export type ButtonTypeT = 'showAnswerScores' | 'nextQuestion';
export type GameStepT = 'quiz' | 'gameOver' | 'teamPreset';

export type TeamPresetT = {
  title: string;
  description: string;
  scores: ScoresT;
};
