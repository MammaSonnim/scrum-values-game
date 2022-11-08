import React, { FC } from 'react';
import { isEmpty } from 'lodash/fp';
import { format } from 'date-fns';
import { Form, Field, ErrorMessage } from 'formik';
import { Button, Loader } from '../../components';
import { PropsT, RatingItemT } from './types';
import styles from './styles.module.css';

export const RatingPage: FC<PropsT> = ({
  isSubmitting,
  touched,
  items,
  totalCount,
  isProcessing,
}) => {
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
