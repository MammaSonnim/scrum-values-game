import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// TODO: add function for path creation
import { dict } from './components/nav/dict';
import { dict as dict1 } from './domains/quiz/components/qa/dict';
import { dict as dict2 } from './domains/lobby/dict';
import { dict as dict3 } from './domains/rating/dict';
import { dict as dict4 } from './domains/quiz/components/scores/dict';

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
        translation: { ...dict.en, ...dict1.en, ...dict2.en, ...dict3.en, ...dict4.en },
      },
      ru: {
        translation: { ...dict.ru, ...dict1.ru, ...dict2.ru, ...dict3.ru, ...dict4.ru },
      },
    },
  });

export default i18n;