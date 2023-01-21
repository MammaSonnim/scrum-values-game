import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

const navItems = [
  {
    link: '/game',
    title: 'Solo',
  },
  {
    link: '/lobby',
    title: 'Teamplay',
  },
  {
    link: '/rating',
    title: 'Rating',
  },
];

export const Nav: FC = () => {
  return (
    <div className={styles.nav}>
      <nav className={styles['nav__list']}>
        {navItems.map((item) => {
          return (
            <NavLink
              className={styles['nav__item']}
              key={item.link}
              //activeClassName={styles.active}
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
