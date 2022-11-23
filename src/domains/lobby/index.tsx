import React, { FC } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { RootStateT } from '../../redux-store';
import { withUserInfo } from '../../hocs';
import { WrapperWithAuthRedirect } from '../auth/rpc/withAuthRedirect';
import { LobbyPage } from './page';
import {
  changeTeamName,
  startDataListening,
  stopDataListening,
  sendData,
  selectTeamName,
  selectLobbyData,
  selectIsChannelReady,
} from './ducks';
import { DispatchPropsT, StatePropsT, OwnPropsT } from './types';

const mapStateToProps = (state: RootStateT): StatePropsT => {
  return {
    teamName: selectTeamName(state),
    data: selectLobbyData(state),
    isChannelReady: selectIsChannelReady(state),
  };
};

const mapDispatchToProps: DispatchPropsT = {
  onChangeTeamName: changeTeamName,
  onStartDataListening: startDataListening,
  onStopDataListening: stopDataListening,
  sendData,
};

export const Lobby: FC<OwnPropsT> = () => {
  const PageWithHocs = compose(
    withUserInfo,
    connect<StatePropsT, DispatchPropsT, OwnPropsT, RootStateT>(
      mapStateToProps,
      mapDispatchToProps
    )
  )(LobbyPage);

  return <WrapperWithAuthRedirect render={() => <PageWithHocs />} />;
};
