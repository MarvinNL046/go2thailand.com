import { ChevronDown } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSplitSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: readonly FaqItem[];
  openFirst?: boolean;
}

export function FaqSplitSection({
  id = "vragen",
  eyebrow,
  title,
  description = "",
  items,
  openFirst = true,
}: FaqSplitSectionProps) {
  return (
    <section
      id={id}
      className="section-divider-bottom scroll-mt-24 py-14 lg:py-20"
    >
      <div className="container-custom grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className="divide-y divide-jade/10 border-y border-jade/10">
          {items.map((item, index) => (
            <details
              key={item.question}
              className="group py-1"
              open={openFirst && index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left text-sm font-extrabold text-jade marker:content-none sm:text-base [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-jade/15 bg-white text-jade transition group-open:rotate-180">
                  <ChevronDown size={15} aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-[820px] pb-6 pr-10 text-sm font-medium leading-7 text-charcoal/78">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
