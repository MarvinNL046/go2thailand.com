import { elNinoThailand2026Guide } from './el-nino-2026';

const guides = {
  [elNinoThailand2026Guide.slug]: elNinoThailand2026Guide,
};

export function getNlClimateUpdateGuide(slug: string) {
  return guides[slug as keyof typeof guides];
}

export { elNinoThailand2026Guide };

