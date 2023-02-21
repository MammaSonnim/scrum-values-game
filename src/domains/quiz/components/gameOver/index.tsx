import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Button, Text } from '../../../../components';
import { ScoresT } from '../../models/types';
import styles from './styles.module.css';

type Props = {
  scores: ScoresT;
  onRestart: (e: MouseEvent) => void;
};

export const GameOver: FC<Props> = ({ scores, onRestart }) => {
  const { t } = useTranslation();
  const [winResult, setWinResult] = useState(false);
  const negativeScore = Object.entries(scores).filter((item) => item[1] <= 0);

  useEffect(() => {
    if (!negativeScore.length) {
      setWinResult(true);
    }
  }, [negativeScore]);

  return (
    <>
      <div className={styles.content}>
        <Text size='m'>
          {winResult ? (
            t('goWin')
          ) : (
            <Trans i18nKey='goLost'>
              Oops, seems like you lost.
              <br />
              Try one more time
            </Trans>
          )}
        </Text>
        <Button onClick={onRestart} className={styles.button}>{t('playAgain')}</Button>
      </div>
    </>
  );
};
