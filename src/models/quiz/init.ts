import { forward } from 'effector';
import { find, getOr } from 'lodash/fp';
import {
    calcIsNeedToGameOver,
    calcTotalScores
} from './helpers';
import { AnswerT } from './types';
import {
    $quiz,
    showAnswerScores,
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
    checkScores,
    checkScoresFx,
    $data,
} from '.';

$quiz.on(showAnswerScores, (prevState, payload) => {
    return {
        ...prevState,
        hasToShowAnswerScores: payload
    };
})

$quiz.on(showGameOver, (prevState, payload) => {
    return {
        ...prevState,
        hasToShowGameOver: payload
    };
})

$quiz.on(setCurrentQuestionId, (prevState, currentQuestionId) => {
    return {
        ...prevState,
        currentQuestionId
    };
})

$quiz.on(setCurrentAnswerId, (prevState, currentAnswerId) => {
    return {
        ...prevState,
        currentAnswerId
    };
})

$quiz.on(setError, (prevState, payload) => {
    return {
        ...prevState,
        error: payload
    };
})

$scores.on(updateTotalScores, (prevScores, scores) => {
    return calcTotalScores(prevScores, scores);
})

$scores.reset(restartGame)
$quiz.reset(restartGame)

// On check scores
forward({
    from: checkScores,
    to: checkScoresFx,
})

checkScoresFx.use(() => {
    const scores = $scores.getState();
    const { hasToShowAnswerScores } = $quiz.getState();

    if (hasToShowAnswerScores) {
        return;
    }

    if (calcIsNeedToGameOver(scores)) {
        showGameOver(true);
    }
})

// On select answer
forward({
    from: selectAnswer,
    to: selectAnswerFx,
})

selectAnswerFx.use((id) => {
    const { hasToShowAnswerScores } = $quiz.getState();

    if (hasToShowAnswerScores) {
        return;
    }

    setCurrentAnswerId(id);
    setError('');
})

// On go to next question
forward({
    from: goToNextQuestion,
    to: goToNextQuestionFx,
})

goToNextQuestionFx.use(() => {
    const {
        currentQuestionId,
        currentAnswerId,
        hasToShowAnswerScores
    } = $quiz.getState();
    const quizData = $data.getState();

    if (!currentAnswerId) {
        setError('Выберите один из вариантов ответа');

        return;
    }

    const countableQuestionId = Number(currentQuestionId);
    // TODO grab from state
    const { answers } = quizData[countableQuestionId];

    if (!hasToShowAnswerScores) {
        // TODO create selector
        const currentAnswerData = find((answer: AnswerT) => {
            return answer.id === currentAnswerId;
        }, answers);

        const currentAnswerScores = getOr(null, 'scores', currentAnswerData);

        if (currentAnswerScores) {
            updateTotalScores(currentAnswerScores);
        }

        showAnswerScores(true);

        return;
    }

    setCurrentAnswerId('');
    showAnswerScores(false);

    if (countableQuestionId + 1 < quizData.length) {
        setCurrentQuestionId(String(countableQuestionId + 1));

        return;
    }

    // if questions are over, show gameOver
    showGameOver(true);
})
