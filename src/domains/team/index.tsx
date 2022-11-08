import React, { FC } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { RootStateT } from '../../redux-store';
import { withUserInfo } from '../../hocs';
import { WrapperWithAuthRedirect } from '../auth/rpc/withAuthRedirect';
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

export const Team: FC<OwnPropsT> = () => {
  const PageWithHocs = compose(
    withUserInfo,
    connect<StatePropsT, DispatchPropsT, OwnPropsT, RootStateT>(
      mapStateToProps,
      mapDispatchToProps
    )
  )(TeamPage);

  return <WrapperWithAuthRedirect render={() => <PageWithHocs />} />;
};
