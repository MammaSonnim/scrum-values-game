import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// TODO SVG-57: add function for path creation
import { dict as navDict } from './components/nav/dict';
import { dict as qaDict } from './domains/quiz/components/qa/dict';
import { dict as gameOverDict } from './domains/quiz/components/gameOver/dict';
import { dict as lobbyDict } from './domains/lobby/dict';
import { dict as ratingDict } from './domains/rating/dict';
import { dict as scoresDict } from './domains/quiz/components/scores/dict';
import { dict as teamPresetDict } from './domains/quiz/components/teamPreset/dict';
import { dict as mainPageDict } from './domains/main/dict';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'en',
    // interpolation: {
    //   escapeValue: false,
    // },
    resources: {
      en: {
        translation: {
          ...navDict.en,
          ...qaDict.en,
          ...gameOverDict.en,
          ...lobbyDict.en,
          ...ratingDict.en,
          ...scoresDict.en,
          ...teamPresetDict.en,
          ...mainPageDict.en,
        },
      },
      ru: {
        translation: {
          ...navDict.ru,
          ...qaDict.ru,
          ...gameOverDict.ru,
          ...lobbyDict.ru,
          ...ratingDict.ru,
          ...scoresDict.ru,
          ...teamPresetDict.ru,
          ...mainPageDict.ru,
        },
      },
    },
  });

export default i18n;
