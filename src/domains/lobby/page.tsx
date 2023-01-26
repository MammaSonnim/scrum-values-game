import React, { FC, useEffect, Fragment, memo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Button, Page, Section, Text, Link, Avatar } from '../../components';
import { EditOnPlaceField } from './components/editOnPlaceField';
import {
  PropsT,
  TeammatePropsT,
  TeamNamePropsT,
  TeamSessionIdT,
} from './types';

const teamSessionQueryParam = 'tsid';

export const LobbyPage: FC<PropsT> = ({
  teammates,
  teamSessionId,
  teamName,
  userName,
  userInfo,
  isUserCreator,
  isReadyForGame,
  canStartGame,
  isGameInited,
  onChangeTeamName,
  onChangeUserName,
  onStartDataListening,
  onStopDataListening,
  changeReadyForGameStatus,
  initGame,
  resetInitGame,
}) => {
  const [searchParamsFromUrl, setSearchParamsToUrl] = useSearchParams();

  useEffect(() => {
    const teamSessionIdInUrl = searchParamsFromUrl.get(
      teamSessionQueryParam
    ) as TeamSessionIdT | null;

    onStartDataListening(teamSessionIdInUrl);

    return onStopDataListening;
  }, []);

  useEffect(() => {
    const teamSessionIdInUrl = searchParamsFromUrl.get(teamSessionQueryParam);

    if (!teamSessionIdInUrl && teamSessionId) {
      setSearchParamsToUrl({
        [teamSessionQueryParam]: teamSessionId,
      });
    }
  }, [teamSessionId]);

  const handleClickReadyButton = () => {
    changeReadyForGameStatus(true);
  };

  const onStartEditField = () => {
    changeReadyForGameStatus(false);
  };

  const handleClickStartButton = () => {
    initGame();
  };

  const { login, photoUrl } = userInfo;

  if (isGameInited) {
    resetInitGame();

    return <Navigate to={`/game?${teamSessionQueryParam}=${teamSessionId}`} />;
  }

  return (
    <Page>
      <Text tag='h2'>Lobby</Text>
      <Section>
        <Link href={`lobby?${teamSessionQueryParam}=${teamSessionId}`}>
          Copy invitation link
        </Link>
      </Section>
      <Section>
        <Text tag='h3'>Team Info</Text>
        <TeamName
          isUserCreator={isUserCreator}
          teamName={teamName}
          onChangeTeamName={onChangeTeamName}
          onStartEditField={onStartEditField}
        />
      </Section>
      <Section>
        <Text tag='h3'>Me</Text>
        {photoUrl && <img src={photoUrl} width={50} height={50} />}
        <EditOnPlaceField
          initValue={userName || login || 'User'}
          placeholder='My name'
          onChangeValue={onChangeUserName}
          onStartEditField={onStartEditField}
        />
      </Section>
      <Section>
        <Text tag='h3'>Teammates</Text>
        <table>
          <tbody>
            {teammates?.map((teammate) => (
              <Teammate data={teammate} key={teammate.id} />
            ))}
          </tbody>
        </table>
      </Section>
      <Button onClick={handleClickReadyButton} disabled={isReadyForGame}>
        I am ready for game!
      </Button>
      {isReadyForGame && !canStartGame && (
        <Text>Wait for other teammates...</Text>
      )}
      {canStartGame && (
        <Button onClick={handleClickStartButton}>Start game</Button>
      )}
    </Page>
  );
};

export const TeamName: FC<TeamNamePropsT> = memo(
  ({ isUserCreator, teamName, onChangeTeamName, onStartEditField }) => {
    return (
      <Fragment>
        {isUserCreator && (
          <EditOnPlaceField
            initValue={teamName}
            placeholder='Team name'
            onChangeValue={onChangeTeamName}
            onStartEditField={onStartEditField}
          />
        )}
        {!isUserCreator && <Text>{teamName}</Text>}
      </Fragment>
    );
  }
);

export const Teammate: FC<TeammatePropsT> = ({ data }) => {
  const { photoUrl, name, isReady, isCreator } = data;

  return (
    <tr>
      <td>
        <Avatar photoUrl={photoUrl} />
      </td>

      <td>
        <Text isInline={true}>{name}</Text>{' '}
      </td>
      <td>
        <Text isInline={true}>{isReady ? 'Ready' : 'Not ready'}</Text>
      </td>
      <td>{isCreator && <Text isInline={true}>⭐</Text>}</td>
    </tr>
  );
};
