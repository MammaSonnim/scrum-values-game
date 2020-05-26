import { connect } from 'react-redux';
import { Quiz } from '../../pages/quiz';
import { AppDispatch } from '../../store';
import {
  setCurrentQuestionId,
  setCurrentAnswerId,
  setError,
  setShowGameOver,
  resetQuiz,
  QuizStateType
} from '../../ducks/quiz';
import { IdType } from '../../types';

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
    setShowGameOver: (hasToShowGameOver: boolean) =>
      dispatch(setShowGameOver(hasToShowGameOver)),
    resetQuiz: () => dispatch(resetQuiz())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
