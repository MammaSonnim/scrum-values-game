import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// TODO: add function for path creation
import { dict } from './components/nav/dict';
import { dict as dict1 } from './domains/quiz/components/qa/dict';
import { dict as dict2 } from './domains/lobby/dict';
import { dict as dict3 } from './domains/rating/dict';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: { ...dict.en, ...dict1.en, ...dict2.en, ...dict3.en },
      },
      ru: {
        translation: { ...dict.ru, ...dict1.ru, ...dict2.ru, ...dict3.ru },
      },
    },
  });

export default i18n;