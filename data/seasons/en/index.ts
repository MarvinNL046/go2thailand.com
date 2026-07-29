import type { SeasonDecisionGuideData } from '../types';
import { huaHinSeasonGuideEn } from './hua-hin';
import { khaoSokSeasonGuideEn } from './khao-sok';

const seasonDecisionGuidesEn: Record<string, SeasonDecisionGuideData> = {
  'hua-hin': huaHinSeasonGuideEn,
  'khao-sok': khaoSokSeasonGuideEn,
};

export function getEnSeasonDecisionGuide(citySlug: string): SeasonDecisionGuideData | undefined {
  return seasonDecisionGuidesEn[citySlug];
}

export { huaHinSeasonGuideEn, khaoSokSeasonGuideEn };
