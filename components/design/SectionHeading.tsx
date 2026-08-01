import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({ eyebrow, title, description, className = '', titleClassName = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`heading-redesign ${titleClassName}`.trim()}>{title}</h2>
      {description ? <div className="mt-5 max-w-[540px] text-sm font-medium leading-7 text-charcoal/68">{description}</div> : null}
    </div>
  );
}
