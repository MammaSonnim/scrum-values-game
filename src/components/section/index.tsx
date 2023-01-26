import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

export type Props = {
  children: ReactNode;
  className?: string;
};

export const Section: FC<Props> = ({ className, children }) => {
  return (
    <section className={cn(styles.section, className)}>{children}</section>
  );
};
