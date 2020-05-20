import React, { FC } from 'react';

type Props = {
  error: string;
};

export const Error: FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }

  return <div className="nes-text is-error">{error}</div>;
};
