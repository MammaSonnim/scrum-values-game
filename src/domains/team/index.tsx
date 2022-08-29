import React, { FC } from 'react';
import { Store } from 'redux';
import { compose } from 'lodash/fp';
import { BrowserHistory } from 'history';
import { withAuthRedirect } from '../../hocs';
import { TeamPage } from './page';
import { addTeamNameAC, changeTeamNameAC } from './ducks';
import { StoreContext } from '../../context/store';

type Props = {
  history: BrowserHistory;
  store: Store
}

export const Team: FC<Props> = () => {
  const PageWithHocs = compose(
    withAuthRedirect
  )(TeamPage)

  return (
    <StoreContext.Consumer>
      {store => {
          const changeTeamName = (value: string) => {
            store.dispatch(changeTeamNameAC(value));
          }
        
          const addTeamName = () => {
            store.dispatch(addTeamNameAC());
          }

        return (
          (
            <PageWithHocs
            history={history}
            teamState={store.getState().teamState}
            onChangeTeamName={changeTeamName}
            onAddTeamName={addTeamName}
          />
          )
        )
      }}
    </StoreContext.Consumer>
    
  );
};
