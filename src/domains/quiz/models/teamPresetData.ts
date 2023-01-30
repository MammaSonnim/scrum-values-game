import { dictTitles, dictDescriptions } from '../preset.dict';
import { TeamPresetT } from './types';

export const teamPresetData: TeamPresetT[] = [
  {
    title: dictTitles.ru[0],
    description: dictDescriptions.ru[0],
    scores: {
      courage: 3,
      focus: 2,
      commitment: 1,
      respect: 4,
      opennes: 3,
    },
  },
  {
    title: dictTitles.ru[1],
    description: dictDescriptions.ru[1],
    scores: {
      courage: 4,
      focus: 1,
      commitment: 2,
      respect: 3,
      opennes: 3,
    },
  },
];
