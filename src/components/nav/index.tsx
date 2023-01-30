import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useFeatureToggles } from '../../plugins';
import styles from './styles.module.css';
import { useTranslation } from 'react-i18next';
import { Translation } from '../../types';

const getNavItems = (isTeamsEnabled: boolean, translate: Translation) => {
  const navItems = [
    {
      link: '/game',
      title: translate(isTeamsEnabled ? 'solo' : 'quiz'),
    },
  ];

  if (isTeamsEnabled) {
    navItems.push(
      ...[
        {
          link: '/lobby',
          title: translate('teamPlay'),
        },
        {
          link: '/rating',
          title: translate('rating'),
        },
      ]
    );
  }

  return navItems;
};

export const Nav: FC = () => {
  const featureToggles = useFeatureToggles<{
    teams?: boolean;
  }>();

  const { t } = useTranslation();
  const navItems = getNavItems(Boolean(featureToggles.teams), t);

  return (
    <div className={styles.nav}>
      <nav className={styles['nav__list']}>
        {navItems.map((item) => {
          return (
            <NavLink
              className={styles['nav__item']}
              key={item.link}
              // activeClassName={styles.active}
              to={item.link}
            >
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
