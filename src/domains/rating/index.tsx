import React, { FC } from 'react';
import { BrowserHistory } from 'history';

type Props = {
  history: BrowserHistory;
};

const Rating: FC<Props> = () => {
  return <div>Топ-10 игр</div>;
};

export default Rating;
