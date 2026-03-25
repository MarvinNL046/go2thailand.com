#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content', 'blog', 'en');
const OUTPUT_DIR = path.join(ROOT, 'public', 'images', 'blog');
const DEFAULT_IMAGE = '/images/blog/thailand-news-default.webp';
const MODEL = 'gemini-3.1-flash-image-preview';
const TARGET_WIDTH = 1024;
const TARGET_HEIGHT = 576;
const DELAY_MS = 2500;
const LOCATION_HINTS = [
  ['bangkok', 'Bangkok cityscape, rooftops, temples, markets, skyline or street life'],
  ['phuket', 'Phuket coastline, old town, beach clubs, tropical shoreline or resort atmosphere'],
  ['chiang mai', 'Chiang Mai old town, temples, mountains, cafes, lanterns or northern Thailand mood'],
  ['chiang rai', 'Chiang Rai temples, mountain scenery, northern architecture or art landmarks'],
  ['krabi', 'Krabi limestone cliffs, longtail boats, beaches, islands and Andaman scenery'],
  ['ayutthaya', 'Ayutthaya temple ruins, brick stupas, historic park, ancient Siam atmosphere'],
  ['koh samui', 'Koh Samui beaches, palms, island roads, resorts and tropical coast'],
  ['koh tao', 'Koh Tao turquoise bays, diving atmosphere, island cliffs and clear water'],
  ['koh hey', 'small tropical island, bright turquoise sea, white sand and day-trip beach mood'],
  ['nong khai', 'Mekong riverfront, naga sculptures, calm northeastern Thailand river scene'],
  ['lumpini', 'urban park greenery with Bangkok skyline balance'],
  ['khaosan', 'Khao San Road nightlife atmosphere, neon street energy, backpacker district'],
  ['songkran', 'Thailand water festival atmosphere, splashing water, tropical urban celebration'],
  ['floating market', 'traditional Thai boats, canal market, fruit and food stalls on water'],
  ['rooftop', 'modern rooftop bar setting, skyline views, dramatic evening light'],
  ['train', 'classic Thai railway travel atmosphere, station platforms, sleeper-train mood'],
  ['coffee', 'stylish specialty cafe interior, barista setting, contemporary Bangkok lifestyle'],
  ['beer', 'craft beer taproom, moody bar lighting, modern urban nightlife'],
  ['restaurant', 'elegant dining room, plated dishes, sophisticated hospitality atmosphere'],
  ['beach', 'tropical beach scene with natural textures, clear water and coastal light']
];

function loadEnv() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return;

  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=["']?(.+?)["']?$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseArgs() {
  const args = process.argv.slice(2);
  const getValue = (flag) => {
    const exact = args.indexOf(flag);
    if (exact >= 0) return args[exact + 1];
    const inline = args.find((arg) => arg.startsWith(`${flag}=`));
    return inline ? inline.split('=').slice(1).join('=') : undefined;
  };

  const limit = Number(getValue('--limit') || 0) || null;
  const only = (getValue('--only') || '')
    .split(',')
    .map((slug) => slug.trim())
    .filter(Boolean);

  return {
    dryRun: args.includes('--dry-run'),
    limit,
    only,
    regenerate: args.includes('--regenerate')
  };
}

function getPostsMissingImages({ regenerate = false } = {}) {
  const files = fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith('.md'));

  return files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const fullPath = path.join(CONTENT_DIR, file);
    const { data } = matter(fs.readFileSync(fullPath, 'utf8'));
    const configuredImage = typeof data.image === 'string' ? data.image.trim() : '';
    const configuredPath = configuredImage
      ? path.join(ROOT, 'public', configuredImage.replace(/^\/+/, ''))
      : null;
    const slugImage = `/images/blog/${slug}.webp`;
    const slugPath = path.join(ROOT, 'public', slugImage.replace(/^\/+/, ''));

    return {
      slug,
      title: data.title || slug,
      category: data.category || 'travel',
      tags: Array.isArray(data.tags) ? data.tags : [],
      configuredImage,
      configuredExists: !!(configuredImage && configuredPath && fs.existsSync(configuredPath)),
      slugImage,
      slugExists: fs.existsSync(slugPath)
    };
  }).filter((post) => {
    if (post.configuredExists) return false;
    return regenerate ? true : !post.slugExists;
  });
}

function buildPrompt(post) {
  const title = String(post.title || '');
  const titleLower = title.toLowerCase();
  const tags = post.tags.length ? post.tags.slice(0, 5).join(', ') : 'Thailand travel';

  const locationHints = LOCATION_HINTS
    .filter(([needle]) => titleLower.includes(needle))
    .map(([, hint]) => hint);

  const isNews = /(launch|opens|opening|award|named|2026|reelected|crisis|shortage|festival|campaign|guide)/i.test(title);
  const isHotel = /(hotel|resort|villa|suite|anantara|andaz|hilton|marriott|mercure|voco|outtrigger)/i.test(title);
  const isFood = /(food|restaurant|dining|street food|cocktail|coffee|beer|hawker|market)/i.test(title);
  const isTransport = /(train|transport|bts|mrt|monorail|airport|flight|airasia)/i.test(title);
  const isNightlife = /(rooftop|bar|cocktail|nightlife|party)/i.test(title);

  let sceneDirection = 'a visually specific Thailand travel scene matching the article topic';
  if (isHotel) {
    sceneDirection = 'an authentic luxury hospitality scene with architectural detail, pool, lobby, suite terrace or destination context matching the article';
  } else if (isFood) {
    sceneDirection = 'a vivid editorial Thailand food or dining scene with real place context, tablescape, market or venue atmosphere';
  } else if (isTransport) {
    sceneDirection = 'a dynamic Thailand transport or movement scene with trains, stations, transit lines, airport or travel infrastructure matching the story';
  } else if (isNightlife) {
    sceneDirection = 'a sophisticated nightlife or rooftop atmosphere with strong sense of place, lighting and skyline context';
  } else if (isNews) {
    sceneDirection = 'a realistic editorial news-feature image that feels like premium travel journalism, not a generic stock photo';
  }

  const peopleDirection = isFood || isNightlife || isTransport
    ? 'If people appear, keep them secondary, natural and documentary-like, never posing for camera.'
    : 'Avoid prominent people unless absolutely necessary to convey the scene.';

  const specificity = locationHints.length
    ? `Location cues: ${locationHints.join('; ')}.`
    : 'Location cues: use recognizably Thai architecture, streetscape, landscape, transport, markets or hospitality details instead of generic tropical scenes.';

  return `Create a high-end photorealistic editorial travel image for a blog article.

Article title: "${title}"
Category: ${post.category}
Themes: ${tags}

Scene goal: ${sceneDirection}.
${specificity}

Visual style:
- premium travel magazine photography
- realistic lens behavior and natural lighting
- rich but believable colors
- authentic Thailand atmosphere
- strong depth, texture and environmental detail
- cinematic but still realistic, not fantasy

Composition:
- horizontal 16:9 hero image for a blog header
- one clear main scene, not a collage
- avoid empty center space and avoid flat stock-photo framing
- show a distinct foreground, midground and background when possible

Quality constraints:
- avoid plastic skin, uncanny faces, distorted hands, malformed objects, duplicate elements
- avoid over-smoothed surfaces, fake HDR, excessive glow, surreal symmetry
- avoid generic AI travel poster aesthetics
- ${peopleDirection}

Hard constraints:
- zero text
- zero letters
- zero numbers
- zero logos
- zero watermarks
- zero UI elements
- zero split screen
- zero collage`;
}

async function generateImage(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'] }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts || [];
  const imagePart = parts.find((part) => part.inlineData || part.inline_data);
  const inline = imagePart?.inlineData || imagePart?.inline_data;

  if (!inline?.data) {
    throw new Error('No image returned');
  }

  return Buffer.from(inline.data, 'base64');
}

async function processAndSave(buffer, outputPath) {
  await sharp(buffer)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(outputPath);
}

async function main() {
  loadEnv();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not found in .env.local');
  }

  const options = parseArgs();
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  let posts = getPostsMissingImages({ regenerate: options.regenerate });
  if (options.only.length) {
    const onlySet = new Set(options.only);
    posts = posts.filter((post) => onlySet.has(post.slug));
  }
  if (options.limit) {
    posts = posts.slice(0, options.limit);
  }

  console.log(JSON.stringify({
    model: MODEL,
    totalCandidates: getPostsMissingImages({ regenerate: options.regenerate }).length,
    selected: posts.length,
    dryRun: options.dryRun,
    regenerate: options.regenerate,
    sample: posts.slice(0, 10).map((post) => ({ slug: post.slug, title: post.title }))
  }, null, 2));

  if (options.dryRun || posts.length === 0) {
    return;
  }

  for (let index = 0; index < posts.length; index += 1) {
    const post = posts[index];
    const outputPath = path.join(OUTPUT_DIR, `${post.slug}.webp`);
    console.log(`[${index + 1}/${posts.length}] ${post.slug}`);

    try {
      const prompt = buildPrompt(post);
      const imageBuffer = await generateImage(prompt, apiKey);
      await processAndSave(imageBuffer, outputPath);
      const sizeKb = Math.round(fs.statSync(outputPath).size / 1024);
      console.log(`  saved ${outputPath} (${sizeKb} KB)`);
    } catch (error) {
      console.error(`  failed: ${error.message}`);
    }

    if (index < posts.length - 1) {
      await sleep(DELAY_MS);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
