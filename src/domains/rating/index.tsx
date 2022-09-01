import React, { FC } from 'react';
import { BrowserHistory } from 'history';

type Props = {
  history: BrowserHistory;
}

export const Rating: FC<Props> = () => {
  return <div>Топ-10 игр</div>;
};
