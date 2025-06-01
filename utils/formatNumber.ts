// Safe number formatting that works consistently on server and client
export function formatNumber(num: number | string, locale?: string): string {
  const number = typeof num === 'string' ? parseInt(num, 10) : num;
  
  if (isNaN(number)) {
    return '0';
  }
  
  // Use a consistent formatter that doesn't depend on system locale
  // This prevents hydration errors
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format population with suffix (K, M)
export function formatPopulation(population: number): string {
  if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  } else if (population >= 1000) {
    return `${Math.round(population / 1000)}K`;
  }
  return formatNumber(population);
}