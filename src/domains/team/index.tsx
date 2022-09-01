import React, { FC } from 'react';
import { Dispatch, Store } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { BrowserHistory } from 'history';
import { withAuthRedirect, withUserInfo } from '../../hocs';
import { TeamPage } from './page';
import { addTeamNameAC, changeTeamNameAC } from './ducks';
import { StateT } from './types';

type Props = {
  history: BrowserHistory;
  store: Store;
}

const mapStateToProps = (state: StateT) => {
  return {
    teamState: state.teamState,
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChangeTeamName: (value: string) => {
      dispatch(changeTeamNameAC(value));
    },
    onAddTeamName: () => {
      dispatch(addTeamNameAC());
    },
  }
};

export const Team: FC<Props> = () => {
  const PageWithHocs = compose(
    withAuthRedirect,
    withUserInfo,
    connect(mapStateToProps, mapDispatchToProps)
  )(TeamPage)

  return (
    <PageWithHocs
      history={history}
    />
  );
};
