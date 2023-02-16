import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components';
import { ScoresT } from '../../models/types';
import styles from './styles.module.css';

type Props = {
  scores: ScoresT;
  onRestart: (e: MouseEvent) => void;
};

export const GameOver: FC<Props> = ({ scores, onRestart }) => {
  const { t } = useTranslation();
  const [winResult, setWinResult] = useState(false);
  const negotiveScore = Object.entries(scores).filter((item) => item[1] <= 0);

  useEffect(() => {
    if (!negotiveScore.length) {
      setWinResult(true);
    }
  }, [negotiveScore]);

  return (
    <>
      <div className={styles.content}>
        <h1>{winResult ? t('goWin') : t('goLost')}</h1>
        <Button onClick={onRestart}>{t('playAgain')}</Button>
      </div>
    </>
  );
};
