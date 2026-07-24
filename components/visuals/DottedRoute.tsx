interface DottedRouteProps {
  className?: string;
  light?: boolean;
}

export function DottedRoute({ className = '', light = false }: DottedRouteProps) {
  const stroke = light ? '#FFC36B' : '#F29A38';
  const pinFill = light ? '#F7F1E7' : '#123F36';

  return (
    <svg className={className} viewBox="0 0 420 170" fill="none" aria-hidden="true">
      <path d="M18 131C61 151 90 111 119 122C154 135 159 68 210 84C255 98 269 39 316 55C351 67 372 38 392 19" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 11" />
      <circle cx="18" cy="131" r="7" fill={stroke} />
      <circle cx="210" cy="84" r="6" fill={pinFill} stroke={stroke} strokeWidth="3" />
      <g transform="translate(374 0)">
        <path d="M18 0C8.1 0 0 8.1 0 18C0 31.5 18 50 18 50S36 31.5 36 18C36 8.1 27.9 0 18 0Z" fill={pinFill} stroke={stroke} strokeWidth="3" />
        <circle cx="18" cy="18" r="6" fill={stroke} />
      </g>
    </svg>
  );
}
