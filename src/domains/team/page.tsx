import React, { FC, useRef, useCallback } from 'react';
import { noop } from 'lodash/fp';
import { getOr } from 'lodash/fp';
import { Button } from '../../components';
import { PropsT } from './types';

export const TeamPage: FC<PropsT> = ({
  teamState,
  userInfo,
  onChangeTeamName,
  onAddTeamName,
}) => {
  const teamInput = useRef(null);
  const { names, name } = teamState;
  const { login, isCreator, photoUrl } = userInfo;

  const changeNameInput = useCallback(() => {
    const value = getOr('', ['current', 'value'], teamInput);

    onChangeTeamName(value);
  }, []);

  const submitTeam = useCallback(() => {
    onAddTeamName();
  }, []);

  return (
    <div>
      <h2>Команда</h2>
      <section>
        <h3>Название команды</h3>
        {isCreator && (
          <div>
            <input
              ref={teamInput}
              onChange={changeNameInput}
              placeholder='Название команды'
              type='text'
              value={name}
            />
            <Button onClick={submitTeam}>Подтвердить</Button>
          </div>
        )}
        <div>{names}</div>
      </section>
      <section>
        <h3>Участники</h3>
        <a href='#'>Скопировать ссылку-приглашение</a>
        <ul>
          <li>
            {photoUrl && <img src={photoUrl} width={50} height={50} />}
            <span>{login}</span>
          </li>
        </ul>
      </section>
      <Button onClick={noop}>Начать игру</Button>
    </div>
  );
};
