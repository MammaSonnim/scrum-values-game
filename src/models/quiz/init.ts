import { calcTotalScores } from '../../helpers';
import {
    $quiz,
    showAnswerScores,
    showGameOver,
    setCurrentQuestionId,
    setCurrentAnswerId,
    setError,
    resetQuizAndScores,
    $scores,
    updateTotalScores,
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

$quiz.on(setCurrentQuestionId, (prevState, payload) => {
    return {
        ...prevState,
        currentQuestionId: payload
    };
})

$quiz.on(setCurrentAnswerId, (prevState, payload) => {
    return {
        ...prevState,
        currentAnswerId: payload
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

$scores.reset(resetQuizAndScores)
$quiz.reset(resetQuizAndScores)
