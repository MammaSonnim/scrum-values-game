import React, { FC, useRef, useEffect, useState, Fragment } from 'react';
import { getOr } from 'lodash/fp';
import { Button } from '../../components';
import { PropsT, TeammatePropsT } from './types';
import { useSearchParams } from 'react-router-dom';
import { TeamSessionIdT } from '../../types';

export const LobbyPage: FC<PropsT> = ({
  data,
  teamName,
  userInfo,
  onChangeTeamName,
  onStartDataListening,
  onStopDataListening,
  sendData,
}) => {
  const [searchParamsFromUrl, setSearchParamsToUrl] = useSearchParams();
  const [isEditMode, setEditMode] = useState(false);
  const [tempName, setTempName] = useState(teamName);

  useEffect(() => {
    const teamSessionId = searchParamsFromUrl.get(
      'teamSessionId'
    ) as TeamSessionIdT | null;

    // TODO SVG-8 set from url to state, grab from state
    onStartDataListening(teamSessionId);

    return onStopDataListening;
  }, []);

  useEffect(() => {
    const teamSessionId = searchParamsFromUrl.get('teamSessionId');

    if (!teamSessionId && data?.teamSessionId) {
      setSearchParamsToUrl({
        teamSessionId: data?.teamSessionId,
      });
    }
  }, [data?.teamSessionId]);

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
      </section>
      <section>
        <h3>Me</h3>
        {photoUrl && <img src={photoUrl} width={50} height={50} />}
        <span>{login}</span>
        <Button>Edit my info</Button>
      </section>
      <section>
        <h3>Teammates</h3>
        <a href={`lobby?teamSessionId=${data?.teamSessionId}`}>
          Copy invitation link
        </a>
        <ul>
          {data?.teammates?.map((teammate) => (
            <Teammate data={teammate} />
          ))}
        </ul>
      </section>
      <Button onClick={startGame}>Start game</Button>
    </div>
  );
};

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
