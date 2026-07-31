import { LayoutCanvas, type NlEditorialLayoutProps } from './LayoutCanvas';

export function FoodLayout({ document }: NlEditorialLayoutProps) {
  return <LayoutCanvas document={document} eyebrow="Bestel met context" answerTone="tonal" proseAfter={1} order={['card-grid', 'prose', 'comparison', 'checklist', 'steps', 'callout', 'affiliate', 'faq', 'related', 'sources']} />;
}
