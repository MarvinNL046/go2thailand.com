import { LayoutCanvas, type NlEditorialLayoutProps } from './LayoutCanvas';

export function StayLayout({ document }: NlEditorialLayoutProps) {
  return <LayoutCanvas document={document} eyebrow="Slaap op de juiste plek" proseAfter={2} order={['comparison', 'card-grid', 'prose', 'checklist', 'callout', 'affiliate', 'steps', 'faq', 'related', 'sources']} />;
}
