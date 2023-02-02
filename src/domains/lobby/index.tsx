import React, { FC } from 'react';
import { connect } from 'react-redux';
import { compose } from 'lodash/fp';
import { RootStateT } from '../../redux-store';
import { withUserInfo, WrapperWithAuthRedirect } from '../../plugins';
import { LobbyPage } from './page';
import {
  changeTeamName,
  changeUserName,
  changeUserIcon,
  changeReadyForGameStatus,
  startDataListening,
  stopDataListening,
  sendData,
  initGame,
  selectTeamName,
  selectUserName,
  selectUserIcon,
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
    userName: selectUserName(state),
    userIcon: selectUserIcon(state),
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
  onChangeUserName: changeUserName,
  onChangeUserIcon: changeUserIcon,
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
