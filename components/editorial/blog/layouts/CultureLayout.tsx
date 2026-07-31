import { LayoutCanvas, type NlEditorialLayoutProps } from './LayoutCanvas';

export function CultureLayout({ document }: NlEditorialLayoutProps) {
  return <LayoutCanvas document={document} eyebrow="Begrijp de context" proseAfter={1} order={['callout', 'prose', 'card-grid', 'steps', 'checklist', 'comparison', 'affiliate', 'faq', 'related', 'sources']} />;
}
