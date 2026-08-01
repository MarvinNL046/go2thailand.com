import { LayoutCanvas, type NlEditorialLayoutProps } from './LayoutCanvas';

export function DestinationLayout({ document }: NlEditorialLayoutProps) {
  return <LayoutCanvas document={document} eyebrow="Past deze plek bij jou?" proseAfter={2} order={['card-grid', 'comparison', 'prose', 'steps', 'callout', 'checklist', 'affiliate', 'faq', 'related', 'sources']} />;
}
