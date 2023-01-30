import React, { FC } from 'react';
import { Button, Text } from '../../../../components';
import { GameStepT, TeamPresetT } from '../../models/types';
import styles from './styles.module.css';

type Props = {
  teamPreset: TeamPresetT;
  onChangeGameStep: (nextStep: GameStepT) => void;
};

export const TeamPreset: FC<Props> = ({ teamPreset, onChangeGameStep }) => {
  const handleClickButton = () => {
    onChangeGameStep('quiz');
  };

  return (
    <div>
      <Text size='l'>{teamPreset.title}</Text>
      <Text className={styles.description}>{teamPreset.description}</Text>
      <Button onClick={handleClickButton} className={styles.button}>
        Next
      </Button>
    </div>
  );
};
