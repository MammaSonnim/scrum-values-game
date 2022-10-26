import React, { FC } from 'react';
import { connect } from 'react-redux';
import { compose, noop } from 'lodash/fp';
import { withFormik } from 'formik';
import { withAuthRedirect } from '../../hocs';
import { RootStateT } from '../../redux-store';
import { RatingPage } from './page';
import {
  loadRating,
  selectRatingItems,
  selectRatingisProcessing,
} from './ducks';
import {
  DispatchPropsT,
  StatePropsT,
  OwnPropsT,
  WithFormikPropsT,
  FormValuesT,
} from './types';
import { getFormikConfig } from './utils';

const mapStateToProps = (state: RootStateT): StatePropsT => {
  return {
    items: selectRatingItems(state),
    isProcessing: selectRatingisProcessing(state),
  };
};

const mapDispatchToProps: DispatchPropsT = {
  onMount: loadRating,
};

const Rating: FC<OwnPropsT> = ({ history }) => {
  const PageWithHocs = compose(
    withFormik<WithFormikPropsT, FormValuesT>(
      getFormikConfig({ onSubmit: loadRating })
    ),
    withAuthRedirect,
    connect<StatePropsT, DispatchPropsT, OwnPropsT, RootStateT>(
      mapStateToProps,
      mapDispatchToProps
    )
  )(RatingPage);

  return <PageWithHocs history={history} />;
};

// default export for lazy load
export default Rating;
