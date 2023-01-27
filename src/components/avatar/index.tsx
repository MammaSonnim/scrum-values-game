import React, { FC } from 'react';
import { Text } from '../text';

export type Props = {
  userIcon?: string;
  className?: string;
};

export const Avatar: FC<Props> = ({ userIcon, className }) => {
  return <Text className={className}>{userIcon || '🦄'}</Text>;
};
