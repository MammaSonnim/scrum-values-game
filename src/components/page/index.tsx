import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

export type Props = {
  children: ReactNode;
  className?: string;
};

export const Page: FC<Props> = ({ children, className }) => {
  return <section className={cn(styles.page, className)}>{children}</section>;
};
