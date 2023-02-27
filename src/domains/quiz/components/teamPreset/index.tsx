import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text } from '../../../../components';
import { GameStepT, TeamPresetT } from '../../models/types';
import styles from './styles.module.css';

type Props = {
  teamPreset: TeamPresetT;
  onChangeGameStep: (nextStep: GameStepT) => void;
};

export const TeamPreset: FC<Props> = ({ teamPreset, onChangeGameStep }) => {
  const { t } = useTranslation();

  const handleClickButton = () => {
    onChangeGameStep('quiz');
  };

  return (
    <>
      <Text size='l' tag='h3'>{`"${teamPreset.title}"`}</Text>
      <Text className={styles.description}>{teamPreset.description}</Text>
      <Button
        testid='nextPresetBtn'
        onClick={handleClickButton}
        className={styles.button}
      >
        {t('nextPresetBtn')}
      </Button>
    </>
  );
};
