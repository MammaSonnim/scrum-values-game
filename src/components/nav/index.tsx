import React, { useState, useCallback, FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './styles.module.css';

const navItems = [
  {
    link: '/game',
    title: 'Игра',
  },
  {
    link: '/team',
    title: 'Команда',
  },
  {
    link: '/rating',
    title: 'Рейтинг',
  },
];

export const Nav: FC = () => {
  const [isExpanded, setExpand] = useState(false);

  const handleIconClick = useCallback(() => {
    setExpand(!isExpanded);
  }, [isExpanded]);

  const rootClasses = cn(styles['nav'], {
    [styles.nav_expanded]: isExpanded,
  });

  return (
    <div className={rootClasses}>
      {isExpanded && (
        <nav className={styles['list']}>
          {navItems.map((item) => {
            return (
              <NavLink
                key={item.link}
                exact
                activeClassName={styles.active}
                to={item.link}
              >
                {item.title}
              </NavLink>
            )
          })}
        </nav>
      )}
      <div className={styles['icon']} onClick={handleIconClick}>
        {isExpanded ? 'Закрыть' : 'Открыть'}
      </div>
    </div>
  );
};
