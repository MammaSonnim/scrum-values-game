import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

export type Props = {
  href: string;
  children: ReactNode;
  size?: 'xs' | 's' | 'm' | 'l';
  className?: string;
};

export const Link: FC<Props> = ({ href, children, size = 'm', className }) => {
  const sizeClass = styles[size];

  return (
    <a href={href} className={cn(styles.link, sizeClass, className)}>
      {children}
    </a>
  );
};
