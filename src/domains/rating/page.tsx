import React, { FC, Fragment, useEffect } from 'react';
import { isEmpty } from 'lodash/fp';
import { format } from 'date-fns';
import { Form, Field, ErrorMessage } from 'formik';
import { Button, Loader } from '../../components';
import { PropsT, RatingItemT } from './types';
import styles from './styles.module.css';

export const RatingPage: FC<PropsT> = ({
  items,
  totalCount,
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
          <div className={styles.block}>
            <RatingForm
              isSubmitting={isSubmitting}
              isProcessing={isProcessing}
            />
          </div>
          <div className={styles.block}>
            <table>
              <thead>
                <th>#</th>
                <th>Team</th>
                <th>Scores</th>
                <th>Date</th>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  return <RatingItem {...item} index={index} />;
                })}
              </tbody>
            </table>
          </div>
        </Fragment>
      )}

      <div className={styles.block}>Total: {totalCount}</div>
    </div>
  );
};

type FormPropsT = Pick<PropsT, 'isProcessing' | 'isSubmitting'>;

const RatingForm: FC<FormPropsT> = ({ isSubmitting, isProcessing }) => {
  return (
    <Form>
      <fieldset>
        <Field type='text' name='searchString' />
        {/* TODO SVG-35 */}
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
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
  id,
  index,
}) => {
  return (
    <tr key={id}>
      <td>{index}</td>
      <td>{teamName}</td>
      <td>{scores}</td>
      <td>{format(date, 'Pp')}</td>
    </tr>
  );
};
