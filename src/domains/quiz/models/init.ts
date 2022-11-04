import { sample, forward } from 'effector';
import { find } from 'lodash/fp';
import {
  $buttonType,
  $currentAnswerId,
  $currentQuestionId,
  $data,
  $isAnswerScoresVisible,
  $isAnyAnswerSelected,
  $isButtonDisabled,
  $isGameOver,
  $scores,
  goToNextQuestion,
  initQuiz,
  initQuizFx,
  QuizAppGate,
  restartGame,
  selectAnswer,
  showAnswerScores,
  showGameOver,
  showGameOverFx,
  updateTotalScores,
} from '.';
import { quizData } from '../../../data';
import { ratingApi } from '../../rating/api';
import { AnswerT } from './types';
import {
  calcIsNeedToGameOver,
  calcSumOfScores,
  calcTotalScores,
} from './utils';

// MOUNT / UNMOUNT
QuizAppGate.open.watch((payload) => {
  initQuiz('solo');

  return payload;
});

QuizAppGate.close.watch((payload) => {
  return payload;
});

// INIT
forward({
  from: initQuiz,
  to: initQuizFx,
});

initQuizFx.use((mode) => {
  console.log('🐸 QuizMode:', mode);

  return quizData;
});

sample({
  clock: initQuizFx.done,
  fn: (effect) => {
    return effect.result;
  },
  target: $data,
});

// QUESTIONS / ANSWERS
$buttonType.on(showAnswerScores, () => 'nextQuestion').reset(goToNextQuestion);
$currentQuestionId.on(goToNextQuestion, (id) => id + 1).reset(restartGame);
$isAnswerScoresVisible.on(showAnswerScores, () => true).reset(goToNextQuestion);
$isButtonDisabled.on(selectAnswer, () => false).reset(goToNextQuestion);
$isAnyAnswerSelected.on(selectAnswer, () => true).reset(goToNextQuestion);
$currentAnswerId
  .on(selectAnswer, (_id, newId) => newId)
  .reset(goToNextQuestion);

// TOTAL SCORES
$scores
  .on(updateTotalScores, (totalScores, answerScores) => {
    if (answerScores) {
      return calcTotalScores(totalScores, answerScores);
    }
  })
  .reset(restartGame);

sample({
  // TODO
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clock: showAnswerScores,
  source: {
    data: $data,
    currentQuestionId: $currentQuestionId,
    currentAnswerId: $currentAnswerId,
  },
  target: updateTotalScores,
  fn: ({ data, currentQuestionId, currentAnswerId }) => {
    const { answers } = data[currentQuestionId - 1];

    const answerData: AnswerT | undefined = find((answer: AnswerT) => {
      return Number(answer.id) === currentAnswerId;
    }, answers);

    return answerData && answerData.scores;
  },
});

// GAME OVER
$isGameOver
  .on(showGameOver, (_prevState, isShowGameOver: boolean) => isShowGameOver)
  .reset(restartGame);

sample({
  clock: goToNextQuestion,
  source: {
    data: $data,
    currentQuestionId: $currentQuestionId,
    scores: $scores,
  },
  target: showGameOver,
  fn: ({ data, currentQuestionId, scores }) => {
    return data.length === currentQuestionId || calcIsNeedToGameOver(scores);
  },
});

sample({
  clock: showGameOver,
  source: {
    data: $data,
    currentQuestionId: $currentQuestionId,
    scores: $scores,
  },
  target: showGameOverFx,
  fn: ({ data, currentQuestionId, scores }, isShowGameOver) => {
    const sumOfScores = calcSumOfScores(scores);

    return isShowGameOver &&
      sumOfScores > 0 &&
      data.length === currentQuestionId
      ? sumOfScores
      : 0;
  },
});

showGameOverFx.use(async (sumOfScores) => {
  if (sumOfScores) {
    return await ratingApi.postRatingItem({
      teamName: 'From FE with ❤️!',
      scores: sumOfScores,
    });
  }
});
