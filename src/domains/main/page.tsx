import React, { FC } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Page, Section, Text, Link, ValueIcon } from '../../components';
import { ScrumValues } from '../../constants';
import { ScrumValueT } from '../../types';
import styles from './styles.module.css';

type Props = {
  isTeamsFeatureEnabled: boolean;
};

export const MainPage: FC<Props> = ({ isTeamsFeatureEnabled }) => {
  const { t } = useTranslation();

  return (
    <Page className={styles.container}>
      <Text>
        <Trans i18nKey='mainText'>
          <Text tag='h2'>Scrum Values Game</Text> – online version of{' '}
          <Link href='https://www.agileverse.ru/scrumvaluesgame/ru' isBlank>
            board game
          </Link>{' '}
          by{' '}
          <Link href='https://www.agileverse.ru/' isBlank>
            Agile Verse.
          </Link>
        </Trans>
      </Text>
      <Section>
        <Text>{t('mainText2')}</Text>
        <Text>{t('mainText3')}</Text>
      </Section>
      <Section>
        <Text tag='h3'>
          <Trans i18nKey='mainText5'>How it works?</Trans>
        </Text>
        <ul>
          <Trans i18nKey='mainText10'>
            <li>1-1.5 hours of time</li>
            <li>5-7 people (up to 12)</li>
            <li>20 situations to solve</li>
            <li>5 team stories</li>
            <li>1 your team</li>
            <li>1 set of values</li>
          </Trans>
        </ul>
      </Section>
      <Section>
        <Text tag='h3'>
          <Trans i18nKey='mainText15'>How to play:</Trans>
        </Text>
        {isTeamsFeatureEnabled && <Text>{t('mainText16')}</Text>}
        <ul>
          {isTeamsFeatureEnabled ? (
            <>
              <li>
                <Trans i18nKey='mainText17'>
                  HOTSEAT: get everyone together and have one of the
                  participants
                  <Link href='/game'>run the quiz</Link>.
                </Trans>
              </li>
              <li>
                <Trans i18nKey='mainText18'>
                  MULTIPLAYER: one of the participants{' '}
                  <Link href='/lobby'>enteres the lobby</Link> and sends the
                  link to the others, and when everyone is ready, starts the
                  game.
                </Trans>
              </li>
            </>
          ) : (
            <li>
              <Trans i18nKey='mainText19'>
                get everyone together (preferably in the same room) and have one
                of the participants <Link href='/game'>run the quiz</Link>
              </Trans>
            </li>
          )}
          <Trans i18nKey='mainText20'>
            <li>
              you'll get one of 5 presets of the team history and initial Scrum
              Values – discuss its strengths and weaknesses
            </li>
            <li>
              move on to the cases – discuss each one and choose the best answer
            </li>
            <li>after you confirm your choice, discuss where it lead to</li>
          </Trans>
        </ul>
      </Section>
      <Section>
        <Text>
          <Trans i18nKey='mainText25'>
            <b>Fail:</b> if any of the values is less than or equal to 0
          </Trans>
        </Text>
        <Text>
          <Trans i18nKey='mainText30'>
            <b>Win:</b> if questions are over
          </Trans>
        </Text>
      </Section>
      <Section>
        <Text tag='h3'>
          <Trans i18nKey='mainText35'>Scrum Values:</Trans>
        </Text>

        <ul className={styles.values}>
          {ScrumValues.map((value) => {
            return <ScrumValue type={value} key={value} />;
          })}
        </ul>
      </Section>
    </Page>
  );
};

type ValueIconProps = {
  type: ScrumValueT;
};

export const ScrumValue: FC<ValueIconProps> = ({ type }) => {
  const { t } = useTranslation();

  return (
    <li className={styles.value}>
      <ValueIcon type={type} />
      <span>
        <b>{type}</b> – {t(`scrumValueDesc_${type}`)}
      </span>
    </li>
  );
};
