import { sample, forward } from 'effector';
import { find } from 'lodash/fp';
import {
  $buttonType,
  $currentAnswerId,
  $currentQuestionId,
  $quizData,
  $gameStep,
  $teamPreset,
  $gameMode,
  $isAnswerScoresVisible,
  $isAnyAnswerSelected,
  $isButtonDisabled,
  $scores,
  $isGameLost,
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
  changeGameStep,
} from '.';
import { quizData } from '../../../data';
import { ratingApi } from '../../rating/api';
import { teamPresetData } from './teamPresetData';
import { AnswerT, GameStepT } from './types';
import {
  calcIsGameLost,
  calcSumOfScores,
  calcTotalScores,
  getTeamPreset,
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
$gameMode.on(initQuiz, (mode) => mode);

forward({
  from: initQuiz,
  to: initQuizFx,
});

initQuizFx.use(() => {
  return quizData;
});

sample({
  clock: initQuizFx.done,
  fn: (effect) => {
    return effect.result;
  },
  target: $quizData,
});

// TEAM PRESET
$teamPreset
  .on(initQuiz, () => getTeamPreset(teamPresetData))
  .on(restartGame, () => getTeamPreset(teamPresetData));

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
$scores.on(updateTotalScores, (totalScores, answerScores) => {
  if (answerScores) {
    return calcTotalScores(totalScores, answerScores);
  }
});

sample({
  clock: [initQuiz, restartGame],
  source: $teamPreset,
  target: $scores,
  fn: (teamPreset) => {
    return teamPreset.scores;
  },
});

sample({
  // TODO
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clock: showAnswerScores,
  source: {
    data: $quizData,
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

// GAME STEP
$gameStep
  .on(changeGameStep, (_prevState, gameStep: GameStepT) => gameStep)
  .on(showGameOver, (_prevState, isShowGameOver: boolean) => {
    if (isShowGameOver) {
      return 'gameOver';
    }
  })
  .reset(restartGame);

// GAME OVER
sample({
  clock: goToNextQuestion,
  source: {
    scores: $scores,
  },
  target: $isGameLost,
  fn: ({ scores }) => {
    return calcIsGameLost(scores);
  }
});

sample({
  clock: goToNextQuestion,
  source: {
    data: $quizData,
    currentQuestionId: $currentQuestionId,
    scores: $scores,
  },
  target: showGameOver,
  fn: ({ data, currentQuestionId, scores }) => {
    return data.length === currentQuestionId || calcIsGameLost(scores);
  },
});

sample({
  clock: showGameOver,
  source: {
    data: $quizData,
    currentQuestionId: $currentQuestionId,
    scores: $scores,
    gameMode: $gameMode,
  },
  target: showGameOverFx,
  fn: ({ data, currentQuestionId, scores, gameMode }, isShowGameOver) => {
    const sumOfScores = calcSumOfScores(scores);

    // form result for rating if all conditions are met
    return isShowGameOver &&
      sumOfScores > 0 &&
      data.length === currentQuestionId &&
      gameMode !== 'solo'
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
