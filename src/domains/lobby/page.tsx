import React, { FC, useRef, useEffect } from 'react';
import { getOr } from 'lodash/fp';
import { Button } from '../../components';
import { PropsT, TeammatePropsT } from './types';
import { useSearchParams } from 'react-router-dom';
import { TeamSessionIdT } from '../../types';

export const LobbyPage: FC<PropsT> = ({
  data,
  names,
  name,
  userInfo,
  onChangeTeamName,
  onAddTeamName,
  onStartDataListening,
  onStopDataListening,
  sendData,
}) => {
  const [searchParamsFromUrl, setSearchParamsToUrl] = useSearchParams();

  useEffect(() => {
    const teamSessionId = searchParamsFromUrl.get(
      'teamSessionId'
    ) as TeamSessionIdT | null;

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

  console.log('🐸 data:', data);

  const teamInput = useRef(null);
  const { login, isCreator, photoUrl } = userInfo;

  const changeNameInput = () => {
    const value = getOr('', ['current', 'value'], teamInput);

    onChangeTeamName(value);
  };

  const submitTeam = () => {
    onAddTeamName();
  };

  const onStartGame = () => {
    sendData(
      JSON.stringify({
        quizId: 1,
      })
    );
  };

  return (
    <div>
      <h2>Lobby</h2>
      <section>
        <h3>Teamname</h3>
        {isCreator && (
          <div>
            <input
              ref={teamInput}
              onChange={changeNameInput}
              placeholder='Teamname'
              type='text'
              value={name}
            />
            <Button onClick={submitTeam}>Submit</Button>
          </div>
        )}
        <div>{names}</div>
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
      <Button onClick={onStartGame}>Start game</Button>
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
