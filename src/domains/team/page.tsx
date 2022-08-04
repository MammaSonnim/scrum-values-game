import React, { FC, useRef, useCallback } from 'react';
import { BrowserHistory } from 'history';
import { getOr } from 'lodash/fp';
import { Button } from '../../components';
import { TODO_ANY } from '../../types';
import { addTeamNameAC, changeTeamNameAC } from './state';

type Props = {
  history: BrowserHistory;
  teamState: { names: string[], name: string };
  dispatch: (action: {
    type: string;
    payload?: TODO_ANY;
  }) => void;
}

export const TeamPage: FC<Props> = ({ teamState, dispatch }) => {
  const teamInput = useRef(null);
  const { names, name } = teamState;

  const changeNameInput = useCallback(
    () => {
      const value = getOr('', ['current', 'value'], teamInput)

      dispatch(changeTeamNameAC(value));
    },[dispatch]
  )

  const submitTeam = useCallback(
    () => {
      dispatch(addTeamNameAC());
    },
    [dispatch],
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
