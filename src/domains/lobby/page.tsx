import React, { FC, useRef, useEffect, useState, Fragment, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Page, Section, Text } from '../../components';
import { TeamSessionIdT } from '../../types';
import { PropsT, TeammatePropsT, TeamNamePropsT } from './types';
import { Link } from '../../components/link';

const teamSessionQueryParam = 'tsid';

export const LobbyPage: FC<PropsT> = ({
  teammates,
  teamSessionId,
  teamName,
  userInfo,
  isUserCreator,
  onChangeTeamName,
  onStartDataListening,
  onStopDataListening,
  sendData,
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
        tsid: teamSessionId,
      });
    }
  }, [teamSessionId]);

  const startGame = () => {
    sendData(
      JSON.stringify({
        quizId: 1,
      })
    );
  };

  const { login, photoUrl } = userInfo;

  return (
    <Page>
      <Text tag='h2'>Lobby</Text>
      <Section>
        <Text tag='h3'>Teamname</Text>
        <TeamName
          isUserCreator={isUserCreator}
          teamName={teamName}
          onChangeTeamName={onChangeTeamName}
        />
      </Section>
      <Section>
        <Text tag='h3'>Me</Text>
        {photoUrl && <img src={photoUrl} width={50} height={50} />}
        <Text>{login}</Text>
        <Button isIcon={true}>Edit</Button>
      </Section>
      <Section>
        <Text tag='h3'>Teammates</Text>
        <Link href={`lobby?${teamSessionQueryParam}=${teamSessionId}`}>
          Copy invitation link
        </Link>
        <ul>
          {teammates?.map((teammate) => (
            <Teammate data={teammate} />
          ))}
        </ul>
      </Section>
      <Button onClick={startGame}>Start game</Button>
    </Page>
  );
};

export const TeamName: FC<TeamNamePropsT> = memo(
  ({ isUserCreator, teamName, onChangeTeamName }) => {
    const [isEditMode, setEditMode] = useState(false);
    const [tempName, setTempName] = useState(teamName);

    useEffect(() => {
      setTempName(teamName);
    }, [teamName]);

    const teamNameInput = useRef(null);

    const enableEditMode = () => {
      setEditMode(true);
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
                  Edit
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
                <Button onClick={submitName}>Submit</Button>
              </Fragment>
            )}
          </div>
        )}
        {!isUserCreator && <div>{teamName}</div>}
      </Fragment>
    );
  }
);

export const Teammate: FC<TeammatePropsT> = ({ data }) => {
  const { photoUrl, login, isReady, isCreator } = data;

  return (
    <li>
      {isCreator && <Text isInline={true}>SM</Text>}
      {photoUrl && <img src={photoUrl} width={50} height={50} />}
      <Text isInline={true}>{login}</Text>
      {isReady && <Text isInline={true}>Ready</Text>}
    </li>
  );
};
