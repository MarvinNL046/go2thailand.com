import assert from 'node:assert/strict';
import { getEditorialUpdatedAt } from '../lib/pseo-editorial-date';

assert.equal(
  getEditorialUpdatedAt({
    lastUpdated: '2026-04-15',
    generatedAt: '2026-04-16T09:30:00.000Z',
  }),
  '2026-04-15',
);

assert.equal(
  getEditorialUpdatedAt({
    generatedAt: '2026-04-16T09:30:00.000Z',
  }),
  '2026-04-16T09:30:00.000Z',
);

assert.equal(getEditorialUpdatedAt({}), undefined);

console.log('pseo editorial date ok');
