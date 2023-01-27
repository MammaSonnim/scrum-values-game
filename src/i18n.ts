import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// TODO: add function for path creation
import { dict as navDict } from './components/nav/dict';
import { dict as qaDict } from './domains/quiz/components/qa/dict';
import { dict as lobbyDict } from './domains/lobby/dict';
import { dict as ratingDict } from './domains/rating/dict';
import { dict as scoresDict } from './domains/quiz/components/scores/dict';

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
        translation: { ...navDict.en, ...qaDict.en, ...lobbyDict.en, ...ratingDict.en, ...scoresDict.en },
      },
      ru: {
        translation: { ...navDict.ru, ...qaDict.ru, ...lobbyDict.ru, ...ratingDict.ru, ...scoresDict.ru },
      },
    },
  });

export default i18n;