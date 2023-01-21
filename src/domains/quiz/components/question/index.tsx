import React, { FC } from 'react';
import { QuestionT } from '../../models/types';
import { Text } from '../../../../components';

type Props = {
  data: QuestionT;
};

export const Question: FC<Props> = ({ data }) => {
  const { text } = data;

  return <Text size='l'>{text}</Text>;
};
