import React, { FC, MouseEvent } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Button, Text } from '../../../../components';
import styles from './styles.module.css';

type Props = {
  isGameLost: boolean;
  onRestart: (e: MouseEvent) => void;
};

export const GameOver: FC<Props> = ({ isGameLost, onRestart }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.content}>
        <Text size='m'>
          {isGameLost ? (
            <Trans i18nKey='goLost'>
              Oops, seems like you lost.
              <br />
              Try one more time
            </Trans>
          ) : (
            t('goWin')
          )}
        </Text>
        <Button
          testid='playAgain'
          onClick={onRestart}
          className={styles.button}
        >
          {t('playAgain')}
        </Button>
      </div>
    </>
  );
};
