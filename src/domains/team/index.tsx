import React, { FC } from 'react';
import { BrowserHistory } from 'history';
import { withAuthRedirect } from '../../hocs';

type Props = {
  history: BrowserHistory;
}

const TeamPage: FC<Props> = () => {
  return (
    <div>Команда</div>
  );
};

export const Team = withAuthRedirect(TeamPage);
