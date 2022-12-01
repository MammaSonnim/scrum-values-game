import React, { FC } from 'react';
import { isEmpty } from 'lodash/fp';
import { format } from 'date-fns';
import { Form, Field, ErrorMessage } from 'formik';
import { Button, Loader, Page, Section, Text } from '../../components';
import { PropsT, RatingItemT } from './types';

export const RatingPage: FC<PropsT> = ({
  isSubmitting,
  touched,
  items,
  totalCount,
  isProcessing,
}) => {
  const hasItemsBeforeFiltered = !isEmpty(items) || touched.searchString;

  return (
    <Page>
      <Text tag='h2'>Top games</Text>
      {isProcessing && <Loader />}
      {hasItemsBeforeFiltered && (
        <Section>
          <RatingForm isSubmitting={isSubmitting} isProcessing={isProcessing} />
        </Section>
      )}

      {!isEmpty(items) && (
        <Section>
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
        </Section>
      )}

      {hasItemsBeforeFiltered && (
        <Section>
          <Text>Total: {totalCount}</Text>
        </Section>
      )}
    </Page>
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
