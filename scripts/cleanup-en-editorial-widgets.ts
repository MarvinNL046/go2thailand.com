import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

interface LedgerRoute {
  locale: string;
  path: string;
  familyKey: string;
}

const projectRoot = resolve(__dirname, '..');
const ledger = JSON.parse(
  readFileSync(resolve(projectRoot, 'seo', 'audits', 'goal-completion-ledger.json'), 'utf8'),
) as { routes: LedgerRoute[] };

function stripBalancedWidgets(markdown: string): { content: string; removed: number } {
  const lines = markdown.split(/\r?\n/);
  const output: string[] = [];
  let widgetDepth = 0;
  let removed = 0;

  for (const line of lines) {
    if (widgetDepth === 0 && /<div\b[^>]*\bdata-widget=/i.test(line)) {
      const opens = (line.match(/<div\b/gi) || []).length;
      const closes = (line.match(/<\/div>/gi) || []).length;
      widgetDepth = Math.max(0, opens - closes);
      removed += 1;
      continue;
    }
    if (widgetDepth > 0) {
      const opens = (line.match(/<div\b/gi) || []).length;
      const closes = (line.match(/<\/div>/gi) || []).length;
      widgetDepth = Math.max(0, widgetDepth + opens - closes);
      continue;
    }
    output.push(line);
  }

  if (widgetDepth !== 0) throw new Error('Unbalanced legacy widget block');
  return { content: output.join('\n'), removed };
}

let changedFiles = 0;
let removedBlocks = 0;
for (const route of ledger.routes.filter((row) => row.locale === 'en' && row.familyKey === 'en:editorial' && row.path !== '/blog/')) {
  const slug = route.path.replace(/^\/blog\//, '').replace(/\/$/, '');
  const filePath = resolve(projectRoot, 'content', 'blog', 'en', `${slug}.md`);
  if (!existsSync(filePath)) continue;
  const raw = readFileSync(filePath, 'utf8');
  const cleaned = stripBalancedWidgets(raw);
  if (cleaned.removed === 0) continue;
  writeFileSync(filePath, `${cleaned.content.trimEnd()}\n`, 'utf8');
  changedFiles += 1;
  removedBlocks += cleaned.removed;
}

console.log(`Removed ${removedBlocks} legacy widget blocks from ${changedFiles} English editorial files.`);
