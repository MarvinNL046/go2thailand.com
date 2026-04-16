interface PseoEditorialDateInput {
  lastUpdated?: string;
  generatedAt?: string;
}

export function getEditorialUpdatedAt(input: PseoEditorialDateInput): string | undefined {
  return input.lastUpdated || input.generatedAt;
}

export function formatEditorialUpdatedAt(updatedAt?: string): string | null {
  if (!updatedAt) return null;

  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(updatedAt)
    ? `${updatedAt}T00:00:00.000Z`
    : updatedAt;

  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
