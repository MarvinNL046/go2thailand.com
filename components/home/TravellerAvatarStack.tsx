const travellers = [1, 2, 3, 4, 5];

export function TravellerAvatarStack({ label }: { label: string }) {
  return (
    <span className="flex -space-x-2" role="img" aria-label={label}>
      {travellers.map(traveller => <span key={traveller} aria-hidden="true" className="traveller-avatar" />)}
    </span>
  );
}
