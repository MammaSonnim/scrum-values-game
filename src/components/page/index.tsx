import React, { FC, ReactNode } from 'react';
import styles from './styles.module.css';

export type Props = {
  children: ReactNode;
};

export const Page: FC<Props> = ({ children }) => {
  return <p className={styles.page}>{children}</p>;
};
