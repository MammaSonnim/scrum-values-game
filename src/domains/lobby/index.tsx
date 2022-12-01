import React, { FC } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { RootStateT } from '../../redux-store';
import { withUserInfo } from '../../hocs';
import { WrapperWithAuthRedirect } from '../auth/rpc/withAuthRedirect';
import { LobbyPage } from './page';
import {
  changeTeamName,
  changeReadyForGameStatus,
  startDataListening,
  stopDataListening,
  sendData,
  initGame,
  selectTeamName,
  selectTeammates,
  selectTeamSessionId,
  selectIsUserCreator,
  selectIsReadyForGame,
  selectCanStartGame,
  selectIsGameInited,
  actionCreators,
} from './ducks';
import { DispatchPropsT, StatePropsT, OwnPropsT } from './types';

const mapStateToProps = (state: RootStateT): StatePropsT => {
  return {
    teamName: selectTeamName(state),
    teammates: selectTeammates(state),
    teamSessionId: selectTeamSessionId(state),
    isUserCreator: selectIsUserCreator(state),
    isReadyForGame: selectIsReadyForGame(state),
    canStartGame: selectCanStartGame(state),
    isGameInited: selectIsGameInited(state),
  };
};

const mapDispatchToProps: DispatchPropsT = {
  onChangeTeamName: changeTeamName,
  onStartDataListening: startDataListening,
  onStopDataListening: stopDataListening,
  sendData,
  changeReadyForGameStatus,
  initGame,
  resetInitGame: actionCreators.resetInitGame,
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
