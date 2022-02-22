import React, { useState, useCallback, FC } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import styles from './styles.module.css';

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
          <NavLink exact activeClassName={styles.active} to='/game'>Игра</NavLink>
          <NavLink exact activeClassName={styles.active} to='/team'>Команда</NavLink>
          <NavLink exact activeClassName={styles.active} to='/rating'>Рейтинг</NavLink>
        </nav>
      )}
      <div className={styles['icon']} onClick={handleIconClick}>
        {isExpanded ? 'Закрыть' : 'Открыть'}
      </div>
    </div>
  );
};
