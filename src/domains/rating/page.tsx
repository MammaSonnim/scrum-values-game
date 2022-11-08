import { AnyAction } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC, useEffect } from 'react';
import { isEmpty } from 'lodash/fp';
import { format } from 'date-fns';
import { Form, Field, ErrorMessage } from 'formik';
import { Button, Loader } from '../../components';
import { PropsT, RatingItemT } from './types';
import styles from './styles.module.css';
import {
  loadRating,
  selectRatingisProcessing,
  selectRatingItems,
  selectRatingTotalCount,
} from './ducks';

export const RatingPage: FC<PropsT> = ({ isSubmitting, touched }) => {
  const items = useSelector(selectRatingItems);
  const totalCount = useSelector(selectRatingTotalCount);
  const isProcessing = useSelector(selectRatingisProcessing);

  const dispatch = useDispatch();

  useEffect(() => {
    // to fix it, need to add AnyAction type to ThunkActionT, but I don't like such freedom
    dispatch(loadRating() as unknown as AnyAction);
  }, []);

  const hasItemsBeforeFiltered = !isEmpty(items) || touched.searchString;

  return (
    <div>
      <h2>Top games</h2>
      {isProcessing && <Loader />}
      {hasItemsBeforeFiltered && (
        <div className={styles.block}>
          <RatingForm isSubmitting={isSubmitting} isProcessing={isProcessing} />
        </div>
      )}

      {!isEmpty(items) && (
        <div className={styles.block}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Team</th>
                <th>Scores</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <RatingItem
                    {...item}
                    index={index}
                    key={`${item.id}/${index}`}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {hasItemsBeforeFiltered && (
        <div className={styles.block}>Total: {totalCount}</div>
      )}
    </div>
  );
};

type FormPropsT = Pick<PropsT, 'isSubmitting'> & { isProcessing: boolean };

const RatingForm: FC<FormPropsT> = ({ isSubmitting, isProcessing }) => {
  return (
    <Form>
      <fieldset>
        <Field type='text' name='searchString' />
        <ErrorMessage name='searchString' component='div' />
      </fieldset>
      <Button type='submit' disabled={isSubmitting || isProcessing}>
        Подтвердить
      </Button>
    </Form>
  );
};

const RatingItem: FC<RatingItemT & { index: number }> = ({
  teamName,
  scores,
  date,
  index,
}) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{teamName}</td>
      <td>{scores}</td>
      <td>{format(date, 'Pp')}</td>
    </tr>
  );
};
