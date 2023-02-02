import React, { FC } from 'react';
import cn from 'classnames';
import { ScrumValueT } from '../../types';
import styles from './styles.module.css';

type Props = {
  type: ScrumValueT;
  className?: string;
};

export const ValueIcon: FC<Props> = ({ type, className }) => {
  return (
    <img
      className={cn(styles.icon, className)}
      src={require(`./assets/${type}.png`)}
      alt={type}
    />
  );
};
