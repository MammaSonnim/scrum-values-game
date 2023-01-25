import React, { FC } from 'react';
import { isEmpty } from 'lodash/fp';
import { format } from 'date-fns';
import { Form, Field as FormikField, ErrorMessage } from 'formik';
import { Button, Loader, Page, Section, Text, Field } from '../../components';
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
          <table className={styles.table}>
            <thead>
              <tr className={styles['table__header']}>
                <th className={styles['table__cell_index']}>#</th>
                <th>Team</th>
                <th className={styles['table__cell_right']}>Scores</th>
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
          <Text size='l'>Total: {totalCount}</Text>
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
    <tr className={styles['table__row']}>
      <td className={styles['table__cell_index']}>
        <Text>{index + 1}</Text>
      </td>
      <td>
        <Text>{teamName}</Text>
      </td>
      <td className={styles['table__cell_right']}>
        <Text>{scores}</Text>
      </td>
      <td>
        <Text>{format(date, 'P')}</Text>
      </td>
    </tr>
  );
};

type FormPropsT = Pick<PropsT, 'isSubmitting'> & { isProcessing: boolean };

const RatingForm: FC<FormPropsT> = ({ isSubmitting, isProcessing }) => {
  return (
    <Form className={styles.form}>
      <fieldset className={styles['form__fieldset']}>
        <FormikField
          type='text'
          name='searchString'
          placeholder='Team name'
          className={styles['form__field']}
          component={Field}
        />
        <ErrorMessage
          name='searchString'
          render={(message) => {
            return (
              <div className={styles['form__error']}>
                <Text size='s' type='warn'>
                  {message}
                </Text>
              </div>
            );
          }}
        />
      </fieldset>
      <Button type='submit' disabled={isSubmitting || isProcessing}>
        Search
      </Button>
    </Form>
  );
};
