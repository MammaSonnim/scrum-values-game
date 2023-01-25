import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useFeatureToggles } from '../../plugins';
import styles from './styles.module.css';
import i18next from '../../i18n';

const getNavItems = (isTeamsEnabled: boolean) => {
  const navItems = [
    {
      link: '/game',
      title: isTeamsEnabled ? i18next.t('solo') : i18next.t('quiz'),
    },
  ];

  if (isTeamsEnabled) {
    navItems.push(
      ...[
        {
          link: '/lobby',
          title: i18next.t('teamPlay'),
        },
        {
          link: '/rating',
          title: i18next.t('rating'),
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

  const navItems = getNavItems(Boolean(featureToggles.teams));

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
