// lib/pinterest.ts
// Pinterest API v5 client for creating pins
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PINTEREST_API = 'https://api.pinterest.com/v5';

interface PinCreateOptions {
  boardId: string;
  title: string;
  description: string;
  link: string;
  imageBase64: string; // base64-encoded PNG/JPEG
  altText?: string;
}

interface PinResponse {
  id: string;
  title: string;
  link: string;
  board_id: string;
  created_at: string;
}

export async function createPin(
  accessToken: string,
  options: PinCreateOptions
): Promise<PinResponse> {
  const res = await fetch(`${PINTEREST_API}/pins`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      board_id: options.boardId,
      title: options.title.slice(0, 100),
      description: options.description.slice(0, 800),
      link: options.link,
      alt_text: (options.altText || options.title).slice(0, 500),
      media_source: {
        source_type: 'image_base64',
        content_type: 'image/png',
        data: options.imageBase64,
      },
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Pinterest API error (${res.status}): ${error}`);
  }

  return res.json();
}

export async function listBoards(accessToken: string): Promise<{ id: string; name: string }[]> {
  const res = await fetch(`${PINTEREST_API}/boards`, {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Pinterest API error (${res.status}): ${error}`);
  }

  const data = await res.json();
  return (data.items || []).map((b: any) => ({ id: b.id, name: b.name }));
}

// --- Pin Image Generator ---

const PIN_WIDTH = 1000;
const PIN_HEIGHT = 1500;

// Category → color accent mapping
const CATEGORY_COLORS: Record<string, string> = {
  food: '#FF6B35',
  'city-guide': '#2563EB',
  activities: '#059669',
  practical: '#7C3AED',
  budget: '#D97706',
  seasonal: '#DB2777',
  islands: '#0891B2',
  news: '#DC2626',
  temples: '#B45309',
  default: '#0F766E',
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Word-wrap text for SVG (rough character-based wrapping)
function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
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

export async function generatePinImage(
  blogImagePath: string,
  title: string,
  category: string,
  siteDomain: string = 'go2-thailand.com'
): Promise<Buffer> {
  const accentColor = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;
  const categoryLabel = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const IMAGE_HEIGHT = 950;

  // Load and resize blog image to fill the top portion
  const imagePath = path.join(process.cwd(), 'public', blogImagePath);
  let blogImage: Buffer;

  if (fs.existsSync(imagePath)) {
    blogImage = await sharp(imagePath)
      .resize(PIN_WIDTH, IMAGE_HEIGHT, { fit: 'cover', position: 'center' })
      .png()
      .toBuffer();
  } else {
    // Fallback: solid gradient background
    blogImage = await sharp({
      create: { width: PIN_WIDTH, height: IMAGE_HEIGHT, channels: 4, background: { r: 15, g: 118, b: 110, alpha: 1 } },
    }).png().toBuffer();
  }

  // Word-wrap title
  const titleLines = wrapText(title, 26);
  const titleFontSize = titleLines.length > 3 ? 42 : 50;
  const lineHeight = titleFontSize * 1.25;

  // Layout: badge → gap → title → divider → branding
  const badgeY = IMAGE_HEIGHT + 25;
  const titleStartY = badgeY + 80;
  const titleBlockHeight = titleLines.length * lineHeight;
  const dividerY = titleStartY + titleBlockHeight + 15;
  const brandY = dividerY + 35;

  // Build title SVG tspans
  const titleTspans = titleLines
    .map((line, i) => `<tspan x="60" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`)
    .join('');

  // SVG overlay with gradient, title, category badge, and branding
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

  <!-- Category badge -->
  <rect x="60" y="${badgeY}" width="${categoryLabel.length * 12 + 28}" height="32" rx="16" fill="${accentColor}"/>
  <text x="74" y="${badgeY + 22}" font-family="sans-serif" font-size="14" font-weight="700" fill="white" letter-spacing="1.2">${escapeXml(categoryLabel.toUpperCase())}</text>

  <!-- Title -->
  <text x="60" y="${titleStartY}" font-family="sans-serif" font-size="${titleFontSize}" font-weight="800" fill="white" letter-spacing="-0.5">
    ${titleTspans}
  </text>

  <!-- Accent divider -->
  <rect x="60" y="${dividerY}" width="60" height="3" rx="1.5" fill="${accentColor}"/>

  <!-- Branding -->
  <text x="60" y="${brandY}" font-family="sans-serif" font-size="18" font-weight="600" fill="white" opacity="0.85">${escapeXml(siteDomain)}</text>
</svg>`;

  // Create the final pin image
  const background = await sharp({
    create: {
      width: PIN_WIDTH,
      height: PIN_HEIGHT,
      channels: 4,
      background: { r: 26, g: 26, b: 46, alpha: 1 },
    },
  }).png().toBuffer();

  const pinImage = await sharp(background)
    .composite([
      // Blog image at top
      { input: blogImage, top: 0, left: 0 },
      // SVG text overlay
      { input: Buffer.from(svgOverlay), top: 0, left: 0 },
    ])
    .png()
    .toBuffer();

  return pinImage;
}
