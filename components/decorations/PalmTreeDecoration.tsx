interface Props {
  className?: string;
}

export default function PalmTreeDecoration({ className = '' }: Props) {
  return (
    <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 120V55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M50 55C50 55 30 35 15 40C15 40 35 25 50 35C50 35 65 25 85 40C85 40 70 35 50 55Z" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M50 45C50 45 25 20 10 30C10 30 30 15 50 30" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M50 45C50 45 75 20 90 30C90 30 70 15 50 30" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M50 50C50 50 35 25 20 20C20 20 40 20 50 40" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M50 50C50 50 65 25 80 20C80 20 60 20 50 40" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
