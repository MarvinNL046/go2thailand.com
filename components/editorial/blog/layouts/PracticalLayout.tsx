import { LayoutCanvas, type NlEditorialLayoutProps } from './LayoutCanvas';

export function PracticalLayout({ document }: NlEditorialLayoutProps) {
  return <LayoutCanvas document={document} eyebrow="Antwoord voor vertrek" answerTone="jade" proseAfter={2} order={['steps', 'checklist', 'prose', 'callout', 'comparison', 'card-grid', 'affiliate', 'faq', 'related', 'sources']} />;
}
