import { forward, sample } from 'effector';
import { find, getOr } from 'lodash/fp';
import {
  calcIsNeedToGameOver,
  calcTotalScores,
} from './utils';
import { AnswerT } from './types';
import {
  $quiz,
  toggleAnswerScoresVisibility,
  showAnswerScores,
  showAnswerScoresFx,
  showGameOver,
  setCurrentQuestionId,
  setCurrentAnswerId,
  selectAnswer,
  selectAnswerFx,
  setError,
  goToNextQuestion,
  goToNextQuestionFx,
  restartGame,
  $scores,
  updateTotalScores,
  $data, QuizAppGate,
} from '.';

$quiz.on(toggleAnswerScoresVisibility, (prevState, payload) => {
  return {
    ...prevState,
    isAnswerScoresVisible: payload,
  };
});

$quiz.on(showGameOver, (prevState, payload) => {
  return {
    ...prevState,
    isGameOverVisible: payload,
  };
});

$quiz.on(setCurrentQuestionId, (prevState, currentQuestionId) => {
  return {
    ...prevState,
    currentQuestionId,
  };
});

$quiz.on(setCurrentAnswerId, (prevState, currentAnswerId) => {
  return {
    ...prevState,
    currentAnswerId,
  };
});

$quiz.on(setError, (prevState, payload) => {
  return {
    ...prevState,
    error: payload,
  };
});

$scores.on(updateTotalScores, (prevScores, scores) => {
  return calcTotalScores(prevScores, scores);
});

$scores.reset(restartGame);
$quiz.reset(restartGame);

// On check scores
sample({
  clock: toggleAnswerScoresVisibility,
  source: $scores,
  fn: (scores, isAnswerScoresVisible) => {
    if (isAnswerScoresVisible) {
      return;
    }

    return {
      isGameOverVisible: calcIsNeedToGameOver(scores),
    };
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  target: $quiz,
});

// On select answer
forward({
  from: selectAnswer,
  to: selectAnswerFx,
});

selectAnswerFx.use((id) => {
  const { isAnswerScoresVisible } = $quiz.getState();

  if (isAnswerScoresVisible) {
    return;
  }

  setCurrentAnswerId(id);
  setError('');
});

// On show scores
forward({
  from: showAnswerScores,
  to: showAnswerScoresFx,
});

showAnswerScoresFx.use(() => {
  const {
    currentQuestionId,
    currentAnswerId,
  } = $quiz.getState();
  const quizData = $data.getState();

  if (!currentAnswerId) {
    setError('Выберите один из вариантов ответа');

    return;
  }

  const countableQuestionId = Number(currentQuestionId);
  // TODO grab from state
  const { answers } = quizData[countableQuestionId];

  // TODO create selector
  const currentAnswerData = find((answer: AnswerT) => {
    return answer.id === currentAnswerId;
  }, answers);

  const currentAnswerScores = getOr(null, 'scores', currentAnswerData);

  if (currentAnswerScores) {
    updateTotalScores(currentAnswerScores);
  }

  toggleAnswerScoresVisibility(true);

  return;
});

// On go to next question
forward({
  from: goToNextQuestion,
  to: goToNextQuestionFx,
});

goToNextQuestionFx.use(() => {
  const {
    currentQuestionId,
  } = $quiz.getState();
  const quizData = $data.getState();

  // it is not questionId now, but index – do refactor
  const countableQuestionId = Number(currentQuestionId);

  setCurrentAnswerId('');
  toggleAnswerScoresVisibility(false);

  if (countableQuestionId + 1 < quizData.length) {
    setCurrentQuestionId(String(countableQuestionId + 1));

    return;
  }

  // if questions are over, show gameOver
  showGameOver(true);
});

QuizAppGate.open.watch((payload) => {
  return payload;
});

QuizAppGate.close.watch((payload) => {
  return payload;
});
