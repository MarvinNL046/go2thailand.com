import { LayoutCanvas, type NlEditorialLayoutProps } from './LayoutCanvas';

export function UpdateLayout({ document }: NlEditorialLayoutProps) {
  return <LayoutCanvas document={document} eyebrow="Dit is de huidige stand" answerTone="jade" proseAfter={2} order={['callout', 'steps', 'card-grid', 'prose', 'comparison', 'checklist', 'affiliate', 'faq', 'sources', 'related']} />;
}
