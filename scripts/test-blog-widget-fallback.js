const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'pages', 'blog', '[slug].tsx');
const source = fs.readFileSync(filePath, 'utf8');

const hasUnsafeLoadHide =
  source.includes('script.onload = () => {') &&
  source.includes("style.display = 'none'");

if (hasUnsafeLoadHide) {
  console.error(
    'FAIL: blog widget fallback is still hidden on script load, which can blank the CTA when the embed renders nothing.'
  );
  process.exit(1);
}

const hasMutationObserver = source.includes('new MutationObserver(');

if (!hasMutationObserver) {
  console.error(
    'FAIL: expected blog widget hydration to observe real widget DOM before hiding fallback.'
  );
  process.exit(1);
}

console.log('PASS: blog widget fallback stays visible until real widget content renders.');
