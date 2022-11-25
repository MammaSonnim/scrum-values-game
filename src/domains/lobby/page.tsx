import React, { FC, useRef, useEffect, useState, Fragment, memo } from 'react';
import { getOr } from 'lodash/fp';
import { Button } from '../../components';
import { PropsT, TeammatePropsT, TeamNamePropsT } from './types';
import { useSearchParams } from 'react-router-dom';
import { TeamSessionIdT } from '../../types';

const teamSessionQueryParam = 'tsid';

export const LobbyPage: FC<PropsT> = ({
  teammates,
  teamSessionId,
  teamName,
  userInfo,
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

    // TODO SVG-8 set from url to state, grab from state
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

  const { login, isCreator, photoUrl } = userInfo;

  return (
    <div>
      <h2>Lobby</h2>
      <section>
        <h3>Teamname</h3>
        <TeamName
          isCreator={isCreator}
          teamName={teamName}
          onChangeTeamName={onChangeTeamName}
        />
      </section>
      <section>
        <h3>Me</h3>
        {photoUrl && <img src={photoUrl} width={50} height={50} />}
        <span>{login}</span>
        <Button>Edit my info</Button>
      </section>
      <section>
        <h3>Teammates</h3>
        <a href={`lobby?${teamSessionQueryParam}=${teamSessionId}`}>
          Copy invitation link
        </a>
        <ul>
          {teammates?.map((teammate) => (
            <Teammate data={teammate} />
          ))}
        </ul>
      </section>
      <Button onClick={startGame}>Start game</Button>
    </div>
  );
};

export const TeamName: FC<TeamNamePropsT> = memo(
  ({ isCreator, teamName, onChangeTeamName }) => {
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
      const value = getOr('', ['current', 'value'], teamNameInput);

      setTempName(value);
    };

    const submitName = () => {
      disableEditMode();
      onChangeTeamName(tempName);
    };

    return (
      <Fragment>
        {isCreator && (
          <div>
            {!isEditMode && (
              <Fragment>
                <div>{teamName}</div>
                <Button onClick={enableEditMode}>Edit</Button>
              </Fragment>
            )}

            {isEditMode && (
              <Fragment>
                <input
                  ref={teamNameInput}
                  placeholder='Teamname'
                  type='text'
                  value={tempName}
                  autoFocus
                  onChange={changeNameInput}
                  onFocus={(e) => e.currentTarget.select()}
                />
                <Button onClick={submitName}>Submit</Button>
              </Fragment>
            )}
          </div>
        )}
        {!isCreator && <div>{teamName}</div>}
      </Fragment>
    );
  }
);

export const Teammate: FC<TeammatePropsT> = ({ data }) => {
  const { photoUrl, login, isReady, isCreator } = data;

  return (
    <li>
      {isCreator && <span>SM</span>}
      {photoUrl && <img src={photoUrl} width={50} height={50} />}
      <span>{login}</span>
      {isReady && <span>Ready</span>}
    </li>
  );
};
