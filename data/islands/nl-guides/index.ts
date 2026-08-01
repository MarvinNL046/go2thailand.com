import { kohTaoIslandGuide } from './koh-tao';
import { kohSametIslandGuide } from './koh-samet';
import { kohPhanganIslandGuide } from './koh-phangan';
import { kohPhiPhiIslandGuide } from './koh-phi-phi';
import { kohLantaIslandGuide } from './koh-lanta';
import { kohChangIslandGuide } from './koh-chang';
import { kohLipeIslandGuide } from './koh-lipe';
import { kohYaoNoiIslandGuide } from './koh-yao-noi';
import { kohMakIslandGuide } from './koh-mak';

const guides = {
  'koh-tao': kohTaoIslandGuide,
  'koh-samet': kohSametIslandGuide,
  'koh-phangan': kohPhanganIslandGuide,
  'koh-phi-phi': kohPhiPhiIslandGuide,
  'koh-lanta': kohLantaIslandGuide,
  'koh-chang': kohChangIslandGuide,
  'koh-lipe': kohLipeIslandGuide,
  'koh-yao-noi': kohYaoNoiIslandGuide,
  'koh-mak': kohMakIslandGuide,
};

export function getNlIslandGuide(slug: string) {
  return guides[slug as keyof typeof guides];
}

export { kohChangIslandGuide, kohLantaIslandGuide, kohLipeIslandGuide, kohMakIslandGuide, kohPhanganIslandGuide, kohPhiPhiIslandGuide, kohSametIslandGuide, kohTaoIslandGuide, kohYaoNoiIslandGuide };
