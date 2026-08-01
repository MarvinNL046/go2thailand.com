import { LayoutCanvas, type NlEditorialLayoutProps } from './LayoutCanvas';

export function ExperienceLayout({ document }: NlEditorialLayoutProps) {
  return <LayoutCanvas document={document} eyebrow="Kies de ervaring" answerTone="tonal" proseAfter={2} order={['comparison', 'steps', 'prose', 'checklist', 'callout', 'card-grid', 'affiliate', 'faq', 'related', 'sources']} />;
}
