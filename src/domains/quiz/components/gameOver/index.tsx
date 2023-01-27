import React, { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components';
import styles from './styles.module.css';

type Props = {
  onRestart: (e: MouseEvent) => void;
};

export const GameOver: FC<Props> = ({ onRestart }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h1>{t('gameOver')}</h1>
      <Button onClick={onRestart}>{t('playAgain')}</Button>
    </div>
  );
};
