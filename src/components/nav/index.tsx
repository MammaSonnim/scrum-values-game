import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useFeatureToggles } from '../../plugins';
import styles from './styles.module.css';

const getNavItems = (isTeamsEnabled: boolean) => {
  const navItems = [
    {
      link: '/game',
      title: isTeamsEnabled ? 'Solo' : 'Quiz',
    },
  ];

  if (isTeamsEnabled) {
    navItems.push(
      ...[
        {
          link: '/lobby',
          title: 'Teamplay',
        },
        {
          link: '/rating',
          title: 'Rating',
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
