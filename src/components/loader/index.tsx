import React, { FC } from 'react';

type Props = {
  className?: string;
};

export const Loader: FC<Props> = ({ className }) => {
  return <div className={className}>Loading...</div>;
};
