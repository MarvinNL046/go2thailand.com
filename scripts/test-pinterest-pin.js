#!/usr/bin/env node
// scripts/test-pinterest-pin.js
// Test pin image generation locally
// Usage: node scripts/test-pinterest-pin.js [slug]
//        node scripts/test-pinterest-pin.js --batch   (generate all board pins)

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const PIN_WIDTH = 1000;
const PIN_HEIGHT = 1500;
const IMAGE_HEIGHT = 950; // bigger photo, less empty space

const CATEGORY_COLORS = {
  food: '#FF6B35', 'food-drink': '#FF6B35', 'city-guide': '#2563EB',
  activities: '#059669', practical: '#7C3AED', 'practical-info': '#7C3AED',
  budget: '#D97706', seasonal: '#DB2777', islands: '#0891B2',
  news: '#DC2626', temples: '#B45309', culture: '#9333EA',
  nightlife: '#E11D48', transport: '#6366F1', 'travel-tips': '#7C3AED',
  hotels: '#B45309', accommodation: '#B45309', 'day-trips': '#059669',
  destinations: '#0891B2', default: '#0F766E',
};

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxCharsPerLine && current) {
      lines.push(current.trim());
      current = word;
    } else {
      current = current ? current + ' ' + word : word;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines;
}

async function generatePin(blogImagePath, title, category) {
  const accentColor = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  const categoryLabel = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  let blogImage;
  if (fs.existsSync(blogImagePath)) {
    blogImage = await sharp(blogImagePath)
      .resize(PIN_WIDTH, IMAGE_HEIGHT, { fit: 'cover', position: 'center' })
      .png()
      .toBuffer();
  } else {
    console.log(`  Image not found: ${blogImagePath}, using fallback`);
    blogImage = await sharp({
      create: { width: PIN_WIDTH, height: IMAGE_HEIGHT, channels: 4, background: { r: 15, g: 118, b: 110, alpha: 1 } },
    }).png().toBuffer();
  }

  // Title layout — positioned right below the image fade
  const titleLines = wrapText(title, 26);
  const titleFontSize = titleLines.length > 3 ? 42 : 50;
  const lineHeight = titleFontSize * 1.25;

  // Category badge clearly above title with spacing
  const badgeY = IMAGE_HEIGHT + 25;
  const titleStartY = badgeY + 80;
  const titleBlockHeight = titleLines.length * lineHeight;
  const dividerY = titleStartY + titleBlockHeight + 15;

  // Branding right below divider — compact
  const brandY = dividerY + 35;

  const titleTspans = titleLines
    .map((line, i) => `<tspan x="60" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');

  const svgOverlay = `<svg width="${PIN_WIDTH}" height="${PIN_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="imgfade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="black" stop-opacity="0"/>
      <stop offset="0.7" stop-color="black" stop-opacity="0"/>
      <stop offset="0.92" stop-color="#1a1a2e" stop-opacity="0.7"/>
      <stop offset="1" stop-color="#1a1a2e" stop-opacity="0.95"/>
    </linearGradient>
  </defs>

  <!-- Subtle fade at bottom of photo -->
  <rect y="0" width="${PIN_WIDTH}" height="${IMAGE_HEIGHT}" fill="url(#imgfade)"/>

  <!-- Category badge — below photo, no overlap -->
  <rect x="60" y="${badgeY}" width="${categoryLabel.length * 12 + 28}" height="32" rx="16" fill="${accentColor}"/>
  <text x="74" y="${badgeY + 22}" font-family="sans-serif" font-size="14" font-weight="700" fill="white" letter-spacing="1.2">${escapeXml(categoryLabel.toUpperCase())}</text>

  <!-- Title — compact below badge -->
  <text x="60" y="${titleStartY}" font-family="sans-serif" font-size="${titleFontSize}" font-weight="800" fill="white" letter-spacing="-0.5">
    ${titleTspans}
  </text>

  <!-- Accent divider -->
  <rect x="60" y="${dividerY}" width="60" height="3" rx="1.5" fill="${accentColor}"/>

  <!-- Branding — compact -->
  <text x="60" y="${brandY}" font-family="sans-serif" font-size="18" font-weight="600" fill="white" opacity="0.85">go2-thailand.com</text>
</svg>`;

  // Dark background canvas
  const background = await sharp({
    create: {
      width: PIN_WIDTH,
      height: PIN_HEIGHT,
      channels: 4,
      background: { r: 26, g: 26, b: 46, alpha: 1 },
    },
  }).png().toBuffer();

  return sharp(background)
    .composite([
      { input: blogImage, top: 0, left: 0 },
      { input: Buffer.from(svgOverlay), top: 0, left: 0 },
    ])
    .png()
    .toBuffer();
}

// --- Board pin generation ---
const BOARDS = {
  'food': [
    'bangkok-floating-markets-guide-damnoen-amphawa-2026',
    'bangkok-lumpini-hawker-centre-street-food-2026',
    'bangkok-craft-beer-scene-2026-bars-festivals-guide',
    'best-cooking-classes-bangkok-market-tour-2026',
    'chatuchak-weekend-market-food-guide',
    'durian-season-thailand-2026-where-to-eat-buy-guide',
    'halal-food-thailand-guide',
  ],
  'bangkok': [
    '24-hours-talad-noi-bangkok-hidden-gem',
    'bangkok-chiang-mai-sleeper-train-guide-2026',
    'bangkok-art-biennale-2026-angels-mara-guide',
    'bangkok-best-cocktail-bars-march-2026-nightlife',
    'ayutthaya-day-trip-train-bangkok-temples-guide-2026',
    'bangkok-specialty-coffee-cafe-guide-2026',
    'bangkok-public-transport-bts-mrt-tourist-guide-2026',
  ],
  'islands': [
    'best-beaches-thailand',
    'bangkok-to-koh-samui-guide',
    'best-kayaking-paddleboarding-spots-thailand-2026',
    'banana-beach-koh-hey-asia-best-beach-tripadvisor-2026',
    'bangla-road-phuket-digital-makeover-nightlife-2026',
    'best-party-hostels-thailand-2026-bangkok-islands-chiang-mai',
    'cape-fahn-hotel-koh-samui-private-island-luxury-2026',
  ],
  'tips': [
    '10-biggest-thailand-travel-mistakes',
    '15-hidden-gems-thailand-tourists-miss',
    'best-sim-card-esim-thailand-tourist-guide-2026',
    'camping-thailand-national-parks-guide-2026',
    'chiang-mai-cheapest-digital-nomad-city-2026',
    'digital-nomad-thailand-2026-dtv-visa-costs-cities',
    'eat-like-local-thailand-under-5-dollars',
  ],
};

async function main() {
  const slug = process.argv[2];
  const blogDir = path.join(__dirname, '..', 'content', 'blog', 'en');
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'pinterest');

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // Single slug mode
  if (slug && slug !== '--batch') {
    const mdFile = path.join(blogDir, `${slug}.md`);
    if (!fs.existsSync(mdFile)) { console.error(`Not found: ${slug}`); process.exit(1); }
    const { data } = matter(fs.readFileSync(mdFile, 'utf8'));
    const imagePath = path.join(__dirname, '..', 'public', 'images', 'blog', `${slug}.webp`);
    const pin = await generatePin(imagePath, data.title, data.category || 'default');
    const outPath = path.join(outputDir, `${slug}.png`);
    fs.writeFileSync(outPath, pin);
    console.log(`Pin: ${outPath} (${(pin.length / 1024).toFixed(0)}KB)`);
    return;
  }

  // Batch mode: generate all board pins
  for (const [board, slugs] of Object.entries(BOARDS)) {
    console.log(`\n=== ${board} ===`);
    for (const s of slugs) {
      const mdFile = path.join(blogDir, `${s}.md`);
      if (!fs.existsSync(mdFile)) { console.log(`  SKIP ${s}`); continue; }
      const { data } = matter(fs.readFileSync(mdFile, 'utf8'));
      const imagePath = path.join(__dirname, '..', 'public', 'images', 'blog', `${s}.webp`);
      const pin = await generatePin(imagePath, data.title, data.category || 'default');
      const outPath = path.join(outputDir, `${board}--${s}.png`);
      fs.writeFileSync(outPath, pin);
      console.log(`  ${data.title.slice(0, 55)}... (${(pin.length / 1024).toFixed(0)}KB)`);
    }
  }
  console.log('\nDone!');
}

main().catch(err => { console.error(err); process.exit(1); });
