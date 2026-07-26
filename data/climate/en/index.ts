import { elNinoThailand2026GuideEn } from "./el-nino-2026";

const guides = {
  [elNinoThailand2026GuideEn.slug]: elNinoThailand2026GuideEn,
};

export function getEnClimateUpdateGuide(slug: string) {
  return guides[slug as keyof typeof guides];
}

export { elNinoThailand2026GuideEn };
