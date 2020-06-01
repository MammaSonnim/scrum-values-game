import { connect } from 'react-redux';
import { Quiz } from '../../pages/quiz';
import { AppDispatch } from '../../store';
import {
  setCurrentQuestionId,
  setCurrentAnswerId,
  setError,
  showAnswerScores,
  updateTotalScores,
  showGameOver,
  resetQuiz,
  QuizStateType
} from '../../ducks/quiz';
import { IdType, ScoresType } from '../../types';

export const mapStateToProps = (state: QuizStateType) => {
  // TODO add selectors

  return {
    ...state.quiz
  };
};

export const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    setCurrentQuestionId: (id: IdType) => dispatch(setCurrentQuestionId(id)),
    setCurrentAnswerId: (id: IdType) => dispatch(setCurrentAnswerId(id)),
    setError: (error: string) => dispatch(setError(error)),
    showAnswerScores: (hasToShowAnswerScores: boolean) =>
      dispatch(showAnswerScores(hasToShowAnswerScores)),
    updateTotalScores: (scores: ScoresType) =>
      dispatch(updateTotalScores(scores)),
    showGameOver: (hasToShowGameOver: boolean) =>
      dispatch(showGameOver(hasToShowGameOver)),
    resetQuiz: () => dispatch(resetQuiz())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
