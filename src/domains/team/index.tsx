import React, { FC } from 'react';
import { compose } from 'lodash/fp';
import { BrowserHistory } from 'history';
import { withAuthRedirect } from '../../hocs';
import { TeamPage } from './page';
import { store } from './state';

type Props = {
  history: BrowserHistory;
  teamState: { name: string }
}

export const Team: FC<Props> = ({ teamState }) => {
  const PageWithHocs = compose(
    withAuthRedirect
  )(TeamPage)

  return (
    <PageWithHocs
      history={history}
      teamState={teamState}
      dispatch={store.dispatch.bind(store)}
    />
  );
};
