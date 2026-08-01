import type { DeepReadonly, NlEditorialBlock, NlEditorialDocument } from '../../../../data/editorial/blog/types';
import { NlEditorialModuleRenderer } from '../NlEditorialModuleRenderer';
import { NlEditorialProse } from '../NlEditorialProse';

export interface NlEditorialLayoutProps {
  document: DeepReadonly<NlEditorialDocument>;
}

interface LayoutCanvasProps extends NlEditorialLayoutProps {
  eyebrow: string;
  order: readonly NlEditorialBlock['kind'][];
  proseAfter: number;
  answerTone?: 'canvas' | 'tonal' | 'jade';
}

export function LayoutCanvas({ document, eyebrow, order, proseAfter, answerTone = 'canvas' }: LayoutCanvasProps) {
  const { profile, markdown } = document;
  const rank = (kind: NlEditorialBlock['kind']) => {
    const position = order.indexOf(kind);
    return position < 0 ? order.length : position;
  };
  const blocks = [...profile.blocks].sort((a, b) => rank(a.kind) - rank(b.kind));
  const beforeProse = blocks.slice(0, proseAfter);
  const afterProse = blocks.slice(proseAfter);
  const answerClass = answerTone === 'jade'
    ? 'bg-jade text-ivory'
    : answerTone === 'tonal'
      ? 'bg-tonal text-jade'
      : 'bg-canvas text-jade';

  return (
    <>
      {profile.quickAnswer ? (
        <section aria-label="Kort antwoord" className={`section-divider-bottom py-9 ${answerClass}`}>
          <div className="container-custom grid gap-4 lg:grid-cols-[0.32fr_1fr] lg:items-start">
            <p className={`text-[9px] font-extrabold uppercase tracking-[0.16em] ${answerTone === 'jade' ? 'text-saffron-light' : 'text-saffron-dark'}`}>{eyebrow}</p>
            <p className="max-w-[900px] font-display text-[1.8rem] font-semibold leading-[1.08] sm:text-[2.2rem]">{profile.quickAnswer}</p>
          </div>
        </section>
      ) : null}
      {beforeProse.map((block) => <NlEditorialModuleRenderer key={block.id} block={block} fallbackImage={profile.hero.image} />)}
      <NlEditorialProse html={markdown.contentHtml} />
      {afterProse.map((block) => <NlEditorialModuleRenderer key={block.id} block={block} fallbackImage={profile.hero.image} />)}
    </>
  );
}
