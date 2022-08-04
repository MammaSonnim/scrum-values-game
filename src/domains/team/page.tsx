import React, { FC, useRef, useCallback } from 'react';
import { BrowserHistory } from 'history';
import { getOr } from 'lodash/fp';
import { Button } from '../../components';

type Props = {
  history: BrowserHistory;
  teamState: { names: string[], name: string };
  addTeamName: () => void;
  changeName: (s: string) => void;
}

export const TeamPage: FC<Props> = ({ teamState, addTeamName, changeName }) => {
  const teamInput = useRef(null);
  const { names, name } = teamState;

  const changeNameInput = useCallback(
    () => {
      const value = getOr('', ['current', 'value'], teamInput)

      changeName(value);
    },[changeName]
  )

  const submitTeam = useCallback(
    () => {
      addTeamName();
      console.log('!!!teamState!!!', teamState);

    },
    [addTeamName],
  );

  return (
    <div>
      <h2>Команда</h2>
      <input
        ref={teamInput}
        onChange={changeNameInput}
        placeholder='Имя команды'
        type='text'
        value={name}
      />
      <div>{names}</div>
      <Button onClick={submitTeam}>Подтвердить</Button>
    </div>
  );
};
