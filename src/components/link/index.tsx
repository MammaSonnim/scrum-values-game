import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

export type Props = {
  href: string;
  children: ReactNode;
  size?: 'xs' | 's' | 'm' | 'l';
  isBlank?: boolean;
  className?: string;
};

type AdditionalPropsT = {
  target?: '_blank';
  rel?: 'noopener noreferrer';
};

export const Link: FC<Props> = ({
  href,
  children,
  size = 'm',
  isBlank,
  className,
}) => {
  const sizeClass = styles[size];

  const additionalProps: AdditionalPropsT = {};

  if (isBlank) {
    additionalProps.target = '_blank';
    additionalProps.rel = 'noopener noreferrer';
  }

  return (
    <a
      href={href}
      className={cn(styles.link, sizeClass, className)}
      {...additionalProps}
    >
      {children}
    </a>
  );
};
