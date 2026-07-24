import { kohTaoIslandGuide } from './koh-tao';
import { kohSametIslandGuide } from './koh-samet';

const guides = {
  'koh-tao': kohTaoIslandGuide,
  'koh-samet': kohSametIslandGuide,
};

export function getNlIslandGuide(slug: string) {
  return guides[slug as keyof typeof guides];
}

export { kohSametIslandGuide, kohTaoIslandGuide };
