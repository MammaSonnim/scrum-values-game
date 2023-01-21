import React, { FC } from 'react';
import { Text } from '../text';

type Props = {
  error: string;
};

export const Error: FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <Text type='warn'>{error}</Text>;
};
