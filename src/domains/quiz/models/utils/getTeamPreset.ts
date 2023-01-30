import { TeamPresetT } from '../types';

export const getTeamPreset = (presets: TeamPresetT[]) => {
  return presets[Math.floor(Math.random() * presets.length)];
};
