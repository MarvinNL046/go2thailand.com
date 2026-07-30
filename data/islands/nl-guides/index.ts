import { kohTaoIslandGuide } from './koh-tao';
import { kohSametIslandGuide } from './koh-samet';
import { kohPhanganIslandGuide } from './koh-phangan';

const guides = {
  'koh-tao': kohTaoIslandGuide,
  'koh-samet': kohSametIslandGuide,
  'koh-phangan': kohPhanganIslandGuide,
};

export function getNlIslandGuide(slug: string) {
  return guides[slug as keyof typeof guides];
}

export { kohPhanganIslandGuide, kohSametIslandGuide, kohTaoIslandGuide };
