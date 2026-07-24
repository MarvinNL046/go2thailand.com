import type { ReactNode } from 'react';

interface AffiliateDisclosureProps {
  children: ReactNode;
  className?: string;
}

export function AffiliateDisclosure({ children, className = '' }: AffiliateDisclosureProps) {
  return <p className={`text-[10px] font-medium leading-4 text-charcoal/50 ${className}`.trim()}>{children}</p>;
}
