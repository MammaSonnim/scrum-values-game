import React, { FC } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withFormik } from 'formik';
import { withAuthRedirect } from '../../hocs';
import { RootStateT } from '../../redux-store';
import { RatingPage } from './page';
import {
  loadRating,
  selectRatingItems,
  selectRatingisProcessing,
  selectRatingTotalCount,
} from './ducks';
import {
  DispatchPropsT,
  StatePropsT,
  OwnPropsT,
  FormikOuterPropsT,
  FormValuesT,
} from './types';
import { getFormikConfig } from './utils';

const mapStateToProps = (state: RootStateT): StatePropsT => {
  return {
    items: selectRatingItems(state),
    totalCount: selectRatingTotalCount(state),
    isProcessing: selectRatingisProcessing(state),
  };
};

const mapDispatchToProps: DispatchPropsT = {
  onMount: loadRating,
  onSubmit: loadRating,
};

const Rating: FC<OwnPropsT> = ({ history }) => {
  const PageWithHocs = compose(
    connect<StatePropsT, DispatchPropsT, OwnPropsT, RootStateT>(
      mapStateToProps,
      mapDispatchToProps
    ),
    withAuthRedirect,
    withFormik<FormikOuterPropsT, FormValuesT>(getFormikConfig())
  )(RatingPage);

  return <PageWithHocs history={history} />;
};

// default export for lazy load
export default Rating;
