#!/usr/bin/env node
/**
 * Generate unique AI images for each Thai island via Gemini.
 * Usage: node scripts/generate-island-images.mjs [--only koh-samui,koh-tao] [--skip-existing]
 *
 * Generates 2K (2048x1365) photorealistic island images, saved as optimized .webp
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Load env
const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=["']?(.+?)["']?$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const TARGET_WIDTH = 2048;
const TARGET_HEIGHT = 1365;
const DELAY_MS = 5000; // 5s between requests (Gemini image gen is slower)

// ── Island-specific prompts ──────────────────────────────────────────────

const ISLAND_SCENES = {
  'koh-samui': {
    scene: 'Chaweng Beach with its long stretch of white sand and turquoise water, coconut palm trees lining the shore, traditional longtail boats in the shallow water',
    vibe: 'tropical luxury, palm-fringed paradise',
  },
  'koh-phangan': {
    scene: 'Haad Rin Beach at golden hour, crystal clear water, lush green jungle hills in the background, a few traditional Thai longtail boats anchored near shore',
    vibe: 'bohemian tropical, jungle meets beach',
  },
  'koh-tao': {
    scene: 'Aerial view of Koh Tao showing the iconic Nangyuan Island connected by a white sandbar, turquoise and deep blue water, coral reefs visible beneath the surface',
    vibe: 'diving paradise, pristine coral island',
  },
  'koh-phi-phi': {
    scene: 'The famous viewpoint overlooking Tonsai Bay and Loh Dalum Bay on Koh Phi Phi Don, dramatic limestone cliffs, emerald green water, longtail boats dotting the bays',
    vibe: 'dramatic limestone scenery, iconic twin bays',
  },
  'koh-lanta': {
    scene: 'Long Beach (Phra Ae Beach) at sunset, wide golden sand beach, calm Andaman Sea water reflecting orange and pink sky, scattered palm trees, peaceful and uncrowded',
    vibe: 'relaxed, family-friendly, golden sunset',
  },
  'koh-chang': {
    scene: 'White Sand Beach with jungle-covered mountains rising behind it, tropical rainforest meets the shoreline, a wooden pier extending into clear water',
    vibe: 'wild nature, jungle island, untouched beauty',
  },
  'koh-lipe': {
    scene: 'Pattaya Beach on Koh Lipe with impossibly clear turquoise water, white sand, colorful wooden longtail boats on the beach, small tropical island feel',
    vibe: 'Maldives of Thailand, pristine small island',
  },
  'koh-yao-noi': {
    scene: 'View across green rice paddies with dramatic Phang Nga Bay limestone karsts in the background, a traditional wooden fishing boat on calm water, mangroves along the shore',
    vibe: 'authentic rural island, karst scenery, peaceful',
  },
  'koh-mak': {
    scene: 'Ao Kao Beach with its calm shallow turquoise water, a bicycle leaning against a coconut palm tree, eco-friendly bungalows partially visible among the trees',
    vibe: 'eco-paradise, quiet and unspoiled, laid-back',
  },
  'koh-samet': {
    scene: 'Sai Kaew Beach with its brilliant white coral sand and deep blue water, rocky headland on one side, tropical vegetation, weekend escape atmosphere',
    vibe: 'weekend getaway, white coral beach, vibrant',
  },
  'phuket': {
    scene: 'Promthep Cape viewpoint at golden hour, dramatic cliffs dropping into the deep blue Andaman Sea, a few traditional longtail boats below, tropical vegetation on the clifftops',
    vibe: 'iconic Thai island, dramatic coastline, grandeur',
  },
};

function islandPrompt(slug, name, highlights) {
  const info = ISLAND_SCENES[slug];
  if (!info) return null;

  return `Create a stunning travel photography image of ${name}, Thailand.

Scene: ${info.scene}.
Mood: ${info.vibe}. Golden hour or late afternoon warm tropical light.
Style: Professional travel magazine cover photography, vivid but natural colors, slight warm color grading.
Composition: Wide landscape shot (3:2 aspect ratio), strong foreground interest leading to the ocean, depth and layers in the scene.
Quality: Ultra high resolution, sharp details, professional DSLR quality with slight bokeh on background elements.
CRITICAL: The image must contain ZERO text, ZERO letters, ZERO numbers, ZERO words, ZERO watermarks, ZERO logos. Pure landscape photography only. No people in frame.`;
}

// ── Gemini API ───────────────────────────────────────────────────────────

async function generateGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error('No content in Gemini response');
  const imgPart = parts.find(p => p.inline_data || p.inlineData);
  if (imgPart?.inlineData) return Buffer.from(imgPart.inlineData.data, 'base64');
  if (imgPart?.inline_data) return Buffer.from(imgPart.inline_data.data, 'base64');
  throw new Error('No image in Gemini response');
}

async function processAndSave(imageBuffer, outputPath) {
  await sharp(imageBuffer)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(outputPath);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const onlyFilter = args.find(a => a.startsWith('--only'));
  const onlySlugs = onlyFilter
    ? (args[args.indexOf('--only') + 1] || onlyFilter.split('=')[1] || '').split(',')
    : null;
  const skipExisting = args.includes('--skip-existing');

  if (!GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not found in .env.local');
    process.exit(1);
  }

  // Load island data
  const indexPath = path.join(ROOT, 'data', 'islands', 'index.json');
  const islands = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  const outputDir = path.join(ROOT, 'public', 'images', 'islands');
  fs.mkdirSync(outputDir, { recursive: true });

  // Filter islands
  let toProcess = islands;
  if (onlySlugs) {
    toProcess = islands.filter(i => onlySlugs.includes(i.slug));
  }

  console.log(`\n🏝️  Generating island images (${toProcess.length} islands)\n`);

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const island = toProcess[i];
    const slug = island.slug;
    const name = island.name.en;
    const outputPath = path.join(outputDir, `${slug}.webp`);

    // Phuket uses a different path — generate in islands/ anyway
    const num = `[${i + 1}/${toProcess.length}]`;

    if (skipExisting && fs.existsSync(outputPath)) {
      // Check if it's a duplicate (same as another island's image)
      const stat = fs.statSync(outputPath);
      const isDuplicate = [235636, 353426, 410508].includes(stat.size);
      if (!isDuplicate) {
        console.log(`${num} Skipping ${name} (already exists, unique)`);
        skipped++;
        continue;
      }
      console.log(`${num} Regenerating ${name} (duplicate detected)`);
    }

    const prompt = islandPrompt(slug, name, island.highlights);
    if (!prompt) {
      console.log(`${num} Skipping ${name} (no prompt defined)`);
      skipped++;
      continue;
    }

    console.log(`${num} Generating ${name}...`);

    try {
      const imageBuffer = await generateGemini(prompt);
      await processAndSave(imageBuffer, outputPath);
      const fileSize = fs.statSync(outputPath).size;
      console.log(`     ✓ Saved ${slug}.webp (${(fileSize / 1024).toFixed(0)} KB)`);
      generated++;
    } catch (err) {
      console.error(`     ✗ Failed: ${err.message}`);
      errors++;
    }

    // Rate limit
    if (i < toProcess.length - 1) {
      await sleep(DELAY_MS);
    }
  }

  // Update Phuket's image path in index.json if we generated one
  const phuketEntry = islands.find(i => i.slug === 'phuket');
  if (phuketEntry && fs.existsSync(path.join(outputDir, 'phuket.webp'))) {
    phuketEntry.image = '/images/islands/phuket.webp';
    fs.writeFileSync(indexPath, JSON.stringify(islands, null, 2) + '\n');
    console.log('\n📝 Updated Phuket image path in index.json');
  }

  console.log(`\n✅ Done: ${generated} generated, ${skipped} skipped, ${errors} errors\n`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
