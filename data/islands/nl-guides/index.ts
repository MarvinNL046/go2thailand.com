import { kohTaoIslandGuide } from './koh-tao';
import { kohSametIslandGuide } from './koh-samet';
import { kohPhanganIslandGuide } from './koh-phangan';
import { kohPhiPhiIslandGuide } from './koh-phi-phi';

const guides = {
  'koh-tao': kohTaoIslandGuide,
  'koh-samet': kohSametIslandGuide,
  'koh-phangan': kohPhanganIslandGuide,
  'koh-phi-phi': kohPhiPhiIslandGuide,
};

export function getNlIslandGuide(slug: string) {
  return guides[slug as keyof typeof guides];
}

export { kohPhanganIslandGuide, kohPhiPhiIslandGuide, kohSametIslandGuide, kohTaoIslandGuide };
