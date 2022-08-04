import React, { FC, useRef, useCallback } from 'react';
import { BrowserHistory } from 'history';
import { getOr } from 'lodash/fp';
import { Button } from '../../components';
import { TODO_ANY } from '../../types';

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

      dispatch({ type: 'CHANGE_NAME', payload: value });
    },[dispatch]
  )

  const submitTeam = useCallback(
    () => {
      dispatch({ type: 'ADD_TEAM_NAME' });
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
