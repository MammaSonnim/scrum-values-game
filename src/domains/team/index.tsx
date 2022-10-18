import React, { FC } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { BrowserHistory } from 'history';
import { withAuthRedirect, withUserInfo } from '../../hocs';
import { TeamPage } from './page';
import { addTeamNameAC, changeTeamNameAC } from './ducks';
import { StateT } from './types';

type Props = {
  history: BrowserHistory;
};

const mapStateToProps = (state: StateT) => {
  return {
    teamState: state.teamState,
  };
};

const mapDispatchToProps = {
  onChangeTeamName: changeTeamNameAC,
  onAddTeamName: addTeamNameAC,
};

export const Team: FC<Props> = ({ history }) => {
  const PageWithHocs = compose(
    withAuthRedirect,
    withUserInfo,
    connect(mapStateToProps, mapDispatchToProps)
  )(TeamPage);

  return <PageWithHocs history={history} />;
};
