interface Props {
  className?: string;
}

export default function DottedPath({ className = '' }: Props) {
  return (
    <svg className={className} viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 80C40 80 50 20 100 50C150 80 160 20 190 20" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
