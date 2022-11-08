import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'lodash/fp';
import { withFormik } from 'formik';
import { WrapperWithAuthRedirect } from '../auth/rpc/withAuthRedirect';
import { RatingPage } from './page';
import { OwnPropsT, FormikOuterPropsT, FormValuesT } from './types';
import { getFormikConfig } from './utils';

const Rating: FC<OwnPropsT> = ({ history }) => {
  const dispatch = useDispatch();

  const PageWithHocs = compose(
    withFormik<FormikOuterPropsT, FormValuesT>(getFormikConfig(dispatch))
  )(RatingPage);

  return (
    <WrapperWithAuthRedirect
      render={() => <PageWithHocs history={history} />}
    />
  );
};

// default export for lazy load
export default Rating;
