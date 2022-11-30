import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import styles from './styles.module.css';

export type Props = {
  children: ReactNode;
  size?: 'xs' | 's' | 'm' | 'l';
  tag?: 'p' | 'h2' | 'h3' | 'h4';
  isInline?: boolean;
};

export const Text: FC<Props> = ({
  children,
  size = 'm',
  tag = 'p',
  isInline,
}) => {
  const sizeClass = styles[size];
  const isHeading = ['h2', 'h3', 'h4'].includes(tag);

  const classes = cn(styles.text, {
    [sizeClass]: !isHeading,
    [styles.inline]: isInline,
  });

  return React.createElement(
    tag,
    {
      className: cn(classes),
    },
    children
  );
};
