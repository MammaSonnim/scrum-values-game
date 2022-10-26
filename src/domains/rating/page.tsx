import React, { FC, Fragment, useEffect } from 'react';
import { isEmpty } from 'lodash/fp';
import { format } from 'date-fns';
import { Button, Loader } from '../../components';
import { PropsT, RatingItemT } from './types';
import { Form, Field, ErrorMessage } from 'formik';

export const RatingPage: FC<PropsT> = ({
  items,
  isProcessing,
  isSubmitting,
  onMount,
}) => {
  useEffect(() => {
    // TODO MIRO
    onMount();
  }, []);

  return (
    <div>
      <h2>Top games</h2>
      {isProcessing && <Loader />}

      {!isEmpty(items) && (
        <Fragment>
          <RatingForm isSubmitting={isSubmitting} isProcessing={isProcessing} />
          {items.map((item) => {
            return <RatingItem {...item} />;
          })}
        </Fragment>
      )}
    </div>
  );
};

type FormPropsT = Pick<PropsT, 'isProcessing' | 'isSubmitting'>;

const RatingForm: FC<FormPropsT> = ({ isSubmitting, isProcessing }) => {
  return (
    <Form>
      <fieldset>
        <Field type='test' name='searchQuery' />
        <ErrorMessage name='searchQuery' component='div' />
      </fieldset>
      <Button type='submit' disabled={isSubmitting || isProcessing}>
        Подтвердить
      </Button>
    </Form>
  );
};

const RatingItem: FC<RatingItemT> = ({ teamName, scores, date, id }) => {
  return (
    <li key={id}>
      {teamName} {scores} {format(date, 'Pp')}
    </li>
  );
};
