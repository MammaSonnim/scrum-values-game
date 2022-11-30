import React, { FC, ReactNode } from 'react';
import styles from './styles.module.css';

export type Props = {
  children: ReactNode;
};

export const Section: FC<Props> = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};
