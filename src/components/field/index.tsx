// field for formik
import React, { FC } from 'react';
import cn from 'classnames';
import { TODO_ANY } from '../../types';
import styles from './styles.module.css';

export type Props = {
  field: TODO_ANY;
  className?: string;
};

export const Field: FC<Props> = ({ field, className, ...props }) => {
  return (
    <input {...field} {...props} className={cn([styles['field'], className])} />
  );
};
