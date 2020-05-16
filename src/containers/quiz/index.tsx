import { connect } from 'react-redux';
import { Quiz } from '../../pages/quiz';
import {
  setCurrentQuestionId,
  setCurrentAnswerId,
  setSavedAnswer,
  setError,
  setShowResults,
  resetQuiz,
  QuizStateType
} from '../../ducks/quiz';
import { SavedAnswerType, IdType } from '../../types';

const mapStateToProps = (state: QuizStateType) => {
  // TODO add selectors

  return {
    ...state.quiz
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setCurrentQuestionId: (id: IdType) => dispatch(setCurrentQuestionId(id)),
    setCurrentAnswerId: (id: IdType) => dispatch(setCurrentAnswerId(id)),
    setSavedAnswer: (answer: SavedAnswerType) => {
      return dispatch(setSavedAnswer(answer));
    },
    setError: (error: string) => dispatch(setError(error)),
    setShowResults: (hasToShowResults: boolean) =>
      dispatch(setShowResults(hasToShowResults)),
    resetQuiz: () => dispatch(resetQuiz())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
