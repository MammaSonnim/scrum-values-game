import React, { FC, useEffect, memo } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Button, Page, Section, Text, Link, Avatar } from '../../components';
import { EditOnPlaceField } from './components/editOnPlaceField';
import { EditDropdown } from './components/editDropdown';
import {
  PropsT,
  TeammatePropsT,
  TeamNamePropsT,
  TeamSessionIdT,
} from './types';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.css';

const teamSessionQueryParam = 'tsid';

export const LobbyPage: FC<PropsT> = ({
  teammates,
  teamSessionId,
  teamName,
  userName,
  userIcon,
  userInfo,
  isUserCreator,
  isReadyForGame,
  canStartGame,
  isGameInited,
  onChangeTeamName,
  onChangeUserName,
  onChangeUserIcon,
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

  const handleEditField = () => {
    changeReadyForGameStatus(false);
  };

  const handleClickStartButton = () => {
    initGame();
  };

  const { login } = userInfo;

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
        <TeamName
          isUserCreator={isUserCreator}
          teamName={teamName}
          onChangeTeamName={onChangeTeamName}
          onStartEditField={handleEditField}
        />
        <div className={styles.field}>
          <Text className={styles['field__name']}>{t('myName')}:</Text>
          <EditOnPlaceField
            initValue={userName || login || 'User'}
            placeholder={t('myName')}
            onChangeValue={onChangeUserName}
            onStartEditField={handleEditField}
          />
        </div>
        <div className={styles.field}>
          <Text className={styles['field__name']}>{t('myIcon')}:</Text>
          <EditDropdown
            initValue={userIcon}
            onChangeIcon={onChangeUserIcon}
            onStartEditDropdown={onStartEditField}
          />
        </div>
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
      </Section>
      <Section className={styles.status}>
        <Button onClick={handleClickReadyButton} disabled={isReadyForGame}>
          {t('iAmReady')}
        </Button>
        {isReadyForGame && !canStartGame && (
          <Text size='s' className={styles['status__text']}>
            {t('waitTeam')}
          </Text>
        )}
        {canStartGame && (
          <Button onClick={handleClickStartButton}>{t('startGame')}</Button>
        )}
      </Section>
    </Page>
  );
};

export const TeamName: FC<TeamNamePropsT> = memo(
  ({ isUserCreator, teamName, onChangeTeamName, onStartEditField }) => {
    const { t } = useTranslation();

    return (
      <div className={styles.field}>
        <Text className={styles['field__name']}>{t('lobbyTeamName')}</Text>
        {isUserCreator && (
          <EditOnPlaceField
            initValue={teamName}
            placeholder={t('lobbyTeamName')}
            onChangeValue={onChangeTeamName}
            onStartEditField={onStartEditField}
          />
        )}
        {!isUserCreator && <Text>{teamName}</Text>}
      </div>
    );
  }
);

export const Teammate: FC<TeammatePropsT> = ({ data }) => {
  const { name, isReady, isCreator } = data;
  const { t } = useTranslation();

  return (
    <tr className={styles.teammate}>
      <td className={styles['teammate__cell_avatar']}>
        <Avatar userIcon='🦄' />
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


