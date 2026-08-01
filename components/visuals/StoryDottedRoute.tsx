interface StoryDottedRouteProps {
  className?: string;
}

export function StoryDottedRoute({ className = '' }: StoryDottedRouteProps) {
  return (
    <svg className={className} viewBox="0 0 180 150" fill="none" aria-hidden="true">
      <path
        d="M8 132C43 114 63 139 91 119C113 103 111 78 96 79C82 80 82 107 105 112C139 119 157 89 153 48"
        stroke="#F29A38"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="2 6"
      />
      <circle cx="8" cy="132" r="3.5" fill="#F29A38" />
      <g transform="translate(145 18)">
        <path d="M8 0C3.6 0 0 3.6 0 8C0 14 8 22 8 22S16 14 16 8C16 3.6 12.4 0 8 0Z" fill="#F7F1E7" stroke="#F29A38" strokeWidth="1.6" />
        <circle cx="8" cy="8" r="2.5" fill="#F29A38" />
      </g>
    </svg>
  );
}
