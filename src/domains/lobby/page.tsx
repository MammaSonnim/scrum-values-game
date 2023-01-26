import React, { FC, useRef, useEffect, useState, Fragment, memo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Button, Page, Section, Text } from '../../components';
import {
  PropsT,
  TeammatePropsT,
  TeamNamePropsT,
  TeamSessionIdT,
} from './types';
import { Link } from '../../components/link';
import { Avatar } from '../../components/avatar';
import { useTranslation } from 'react-i18next';

const teamSessionQueryParam = 'tsid';

export const LobbyPage: FC<PropsT> = ({
  teammates,
  teamSessionId,
  teamName,
  userInfo,
  isUserCreator,
  isReadyForGame,
  canStartGame,
  isGameInited,
  onChangeTeamName,
  onStartDataListening,
  onStopDataListening,
  changeReadyForGameStatus,
  initGame,
  resetInitGame,
}) => {
  const { t } = useTranslation();
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
      <Text tag='h2'>{t('lobby')}</Text>
      <Section>
        <Link href={`lobby?${teamSessionQueryParam}=${teamSessionId}`}>
          {t('copyLink')}
        </Link>
      </Section>
      <Section>
        <Text tag='h3'>{t('teamInfo')}</Text>
        <TeamName
          isUserCreator={isUserCreator}
          teamName={teamName}
          onChangeTeamName={onChangeTeamName}
          changeReadyForGameStatus={changeReadyForGameStatus}
        />
      </Section>
      <Section>
        <Text tag='h3'>{t('me')}</Text>
        {photoUrl && <img src={photoUrl} width={50} height={50} />}
        <Text>{login}</Text>
        <Button isIcon={true}>{t('edit')}</Button>
      </Section>
      <Section>
        <Text tag='h3'>{t('teammates')}</Text>
        <table>
          <tbody>
            {teammates?.map((teammate) => (
              <Teammate data={teammate} key={teammate.id} />
            ))}
          </tbody>
        </table>
        <ul></ul>
      </Section>
      <Button onClick={handleClickReadyButton} disabled={isReadyForGame}>
        {t('iAmReady')}
      </Button>
      {isReadyForGame && !canStartGame && <Text>{t('waitTeam')}</Text>}
      {canStartGame && (
        <Button onClick={handleClickStartButton}>{t('startGame')}</Button>
      )}
    </Page>
  );
};

export const TeamName: FC<TeamNamePropsT> = memo(
  ({ isUserCreator, teamName, onChangeTeamName, changeReadyForGameStatus }) => {
    const [isEditMode, setEditMode] = useState(false);
    const [tempName, setTempName] = useState(teamName);
    const { t } = useTranslation();

    useEffect(() => {
      setTempName(teamName);
    }, [teamName]);

    const teamNameInput = useRef(null);

    const enableEditMode = () => {
      setEditMode(true);

      // TODO SVG-32 make all this stuff in parent
      changeReadyForGameStatus(false);
    };

    const disableEditMode = () => {
      setEditMode(false);
    };

    const changeNameInput = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setTempName(teamNameInput?.current?.value ?? '');
    };

    const submitName = () => {
      disableEditMode();
      onChangeTeamName(tempName);
    };

    return (
      <Fragment>
        {isUserCreator && (
          <div>
            {!isEditMode && (
              <Fragment>
                <Text>{teamName}</Text>
                <Button isIcon={true} onClick={enableEditMode}>
                  {t('edit')}
                </Button>
              </Fragment>
            )}

            {isEditMode && (
              <Fragment>
                <div>
                  <input
                    ref={teamNameInput}
                    placeholder='Teamname'
                    type='text'
                    value={tempName}
                    autoFocus
                    onChange={changeNameInput}
                    onFocus={(e) => e.currentTarget.select()}
                  />
                </div>
                <Button onClick={submitName}>{t('submit')}</Button>
              </Fragment>
            )}
          </div>
        )}
        {!isUserCreator && <Text>{teamName}</Text>}
      </Fragment>
    );
  }
);

export const Teammate: FC<TeammatePropsT> = ({ data }) => {
  const { photoUrl, name, isReady, isCreator } = data;
  const { t } = useTranslation();

  return (
    <tr>
      <td>
        <Avatar photoUrl={photoUrl} />
      </td>

      <td>
        <Text isInline={true}>{name}</Text>{' '}
      </td>
      <td>
        <Text isInline={true}>{isReady ? t('ready') : t('notReady')}</Text>
      </td>
      <td>{isCreator && <Text isInline={true}>⭐</Text>}</td>
    </tr>
  );
};
