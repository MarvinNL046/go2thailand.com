import { kohTaoIslandGuide } from './koh-tao';
import { kohSametIslandGuide } from './koh-samet';
import { kohPhanganIslandGuide } from './koh-phangan';
import { kohPhiPhiIslandGuide } from './koh-phi-phi';
import { kohLantaIslandGuide } from './koh-lanta';
import { kohChangIslandGuide } from './koh-chang';
import { kohLipeIslandGuide } from './koh-lipe';

const guides = {
  'koh-tao': kohTaoIslandGuide,
  'koh-samet': kohSametIslandGuide,
  'koh-phangan': kohPhanganIslandGuide,
  'koh-phi-phi': kohPhiPhiIslandGuide,
  'koh-lanta': kohLantaIslandGuide,
  'koh-chang': kohChangIslandGuide,
  'koh-lipe': kohLipeIslandGuide,
};

export function getNlIslandGuide(slug: string) {
  return guides[slug as keyof typeof guides];
}

export { kohChangIslandGuide, kohLantaIslandGuide, kohLipeIslandGuide, kohPhanganIslandGuide, kohPhiPhiIslandGuide, kohSametIslandGuide, kohTaoIslandGuide };
