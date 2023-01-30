import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../button';
import styles from './styles.module.css';

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  const handleClick = () => {
    const currentLang = localStorage.getItem('i18nextLng');

    i18n.changeLanguage(currentLang === 'ru' ? 'en' : 'ru');
  };

  return (
    <div className={styles.container}>
      <Button
        children={'RU'}
        className={styles.button}
        asLink
        onClick={handleClick}
      />
      /
      <Button
        children={'EN'}
        className={styles.button}
        asLink
        onClick={handleClick}
      />
    </div>
  );
};
