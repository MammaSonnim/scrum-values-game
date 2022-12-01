import React, { FC } from 'react';
import styles from './styles.module.css';

export type Props = {
  photoUrl?: string;
};

export const Avatar: FC<Props> = ({ photoUrl }) => {
  return photoUrl ? (
    <img src={photoUrl} width={50} height={50} />
  ) : (
    <div className={styles['no-image']} />
  );
};
