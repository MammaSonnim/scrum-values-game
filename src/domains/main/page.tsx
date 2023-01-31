import React, { FC } from 'react';
// import { useTranslation } from 'react-i18next';
import { Page, Section, Text } from '../../components';
import styles from './styles.module.css';

export const MainPage: FC = () => {
  // const { t } = useTranslation();

  return (
    <Page className={styles.container}>
      <Text tag='h2'>SCRUM VALUES GAME 2.0</Text>
      <Section className={styles.description}>
        <div>
          Это настольная игра, цель которой дать вам возможность поговорить о
          том, как ценности Scrum влияют на жизнь команды.
        </div>
      </Section>
    </Page>
  );
};
