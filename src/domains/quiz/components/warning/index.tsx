import React, { FC } from 'react';
import { Text } from '../../../../components';

// TODO add normal type
type PropsT = {
  warning: string | null;
  note: string | null;
};

export const Warning: FC<PropsT> = ({ warning, note }) => {
  if (!warning) {
    return null;
  }

  return (
    <div>
      <Text type='warn'>{warning}</Text>
      <Text type='warn'>{note}</Text>
    </div>
  );
};
