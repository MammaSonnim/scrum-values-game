import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// TODO: add function for path creation
import { dict } from './components/nav/dict';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: { ...dict.en },
      },
      ru: {
        translation: { ...dict.ru },
      },
    },
  });

export default i18n;