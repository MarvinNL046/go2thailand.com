const EUR_TO_USD = 1.08;

export function formatPrice(eurAmount: number, locale: string): string {
  if (locale === 'en') {
    const usdAmount = Math.round(eurAmount * EUR_TO_USD);
    return `$${usdAmount}`;
  }
  return `EUR${eurAmount}`;
}

export function formatPriceRange(from: number, to: number, currency: string, locale: string): string {
  if (locale === 'en') {
    const fromUsd = Math.round(from * EUR_TO_USD);
    const toUsd = Math.round(to * EUR_TO_USD);
    return `$${fromUsd} - $${toUsd}`;
  }
  return `${currency}${from} - ${currency}${to}`;
}
