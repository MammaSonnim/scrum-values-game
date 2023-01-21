import React, { FC } from 'react';
import { Text } from '../../../../components';

type Props = {
  currentCount: number;
  total: number;
};

export const Progress: FC<Props> = ({ currentCount, total }) => {
  return (
    <Text size='l'>
      {currentCount} / {total}
    </Text>
  );
};
