export const destinationOptions = [
  { name: 'Bangkok', href: '/city/bangkok/', keywords: ['bangkok', 'central'] },
  { name: 'Chiang Mai', href: '/city/chiang-mai/', keywords: ['chiang mai', 'noord', 'north'] },
  { name: 'Phuket', href: '/city/phuket/', keywords: ['phuket', 'zuid', 'south'] },
  { name: 'Krabi', href: '/city/krabi/', keywords: ['krabi', 'ao nang', 'railay'] },
  { name: 'Koh Samui', href: '/city/koh-samui/', keywords: ['koh samui', 'samui', 'golf'] },
  { name: 'Koh Phangan', href: '/islands/koh-phangan/', keywords: ['koh phangan', 'phangan'] },
  { name: 'Koh Tao', href: '/islands/koh-tao/', keywords: ['koh tao', 'tao'] },
  { name: 'Pattaya', href: '/city/pattaya/', keywords: ['pattaya'] },
  { name: 'Ayutthaya', href: '/city/ayutthaya/', keywords: ['ayutthaya', 'tempels'] },
  { name: 'Khao Sok', href: '/travel-guides/hidden-gems-off-beaten-path-thailand/', keywords: ['khao sok', 'jungle'] },
  { name: 'Pai', href: '/city/pai/', keywords: ['pai', 'noord', 'north'] },
] as const;

export type DestinationOption = typeof destinationOptions[number];
