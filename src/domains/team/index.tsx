import React, { FC } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { withAuthRedirect, withUserInfo } from '../../hocs';
import { RootStateT } from '../../redux-store';
import { TeamPage } from './page';
import { actionCreators, changeTeamName, selectTeamState } from './ducks';
import { DispatchPropsT, StatePropsT, OwnPropsT } from './types';

const mapStateToProps = (state: RootStateT): StatePropsT => {
  return {
    teamState: selectTeamState(state),
  };
};

const mapDispatchToProps: DispatchPropsT = {
  onChangeTeamName: changeTeamName,
  onAddTeamName: actionCreators.addTeamName,
};

export const Team: FC<OwnPropsT> = ({ history }) => {
  const PageWithHocs = compose(
    withAuthRedirect,
    withUserInfo,
    connect<StatePropsT, DispatchPropsT, OwnPropsT, RootStateT>(
      mapStateToProps,
      mapDispatchToProps
    )
  )(TeamPage);

  return <PageWithHocs history={history} />;
};
