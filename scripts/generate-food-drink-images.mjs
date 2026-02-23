#!/usr/bin/env node
/**
 * Generate AI food & drink images via Grok (xAI) or Gemini API
 * Usage: node scripts/generate-food-drink-images.mjs [--food] [--drinks] [--only slug1,slug2] [--skip-existing] [--provider gemini]
 *
 * Default provider: Grok ($0.07/image)
 * Generates 2K (2048x1365) photorealistic images and saves as optimized .webp
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

const XAI_API_KEY = process.env.XAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// 2K resolution: 2048x1365 (3:2 aspect, good for food photography)
const TARGET_WIDTH = 2048;
const TARGET_HEIGHT = 1365;
const DELAY_MS = 3000;

// ── Prompts ──────────────────────────────────────────────────────────────

function foodPrompt(name, thaiName, category) {
  const categoryHints = {
    'main-dish': 'beautifully plated on a traditional Thai ceramic plate, street food stall or restaurant setting',
    'soup': 'served in an elegant Thai bowl, steam rising, garnished with fresh herbs',
    'salad': 'fresh and colorful presentation on a banana leaf or Thai plate, vibrant ingredients',
    'curry': 'rich and aromatic in a traditional Thai clay pot or bowl, with jasmine rice nearby',
    'dessert': 'artfully presented Thai sweet, tropical fruits, coconut elements, colorful layers',
    'appetizer': 'beautifully arranged on a Thai serving plate, crispy golden texture',
    'noodle': 'steaming hot noodles with fresh toppings, chopsticks, street food atmosphere',
    'rice': 'fragrant rice dish on a Thai plate, colorful accompaniments',
    'snack': 'Thai street snack, golden and crispy, served in traditional wrapping',
    'stir-fry': 'sizzling in a hot wok, colorful vegetables, aromatic spices',
  };
  const hint = categoryHints[category] || 'beautifully presented Thai dish, authentic Thai setting';

  return `Create a professional food photography image of "${name}"${thaiName ? ` (${thaiName})` : ''}, a traditional Thai ${category || 'dish'}.
Style: High-end food magazine photography, shallow depth of field, natural warm lighting from the side.
Presentation: ${hint}.
Background: Softly blurred Thai restaurant or street food setting with warm ambient lighting.
Quality: Professional food photography, appetizing colors, steam/texture details visible.
Resolution: High resolution, sharp details on the food.
CRITICAL: The image must contain ZERO text, ZERO letters, ZERO numbers, ZERO words, ZERO watermarks. Only the food and setting.`;
}

function drinkPrompt(name, thaiName, category, type) {
  const categoryHints = {
    'tea': 'served in a tall glass with ice, condensed milk swirls visible, Thai tea shop setting',
    'coffee': 'traditional Thai coffee preparation, ice crystals, condensation on glass',
    'juice': 'fresh tropical fruit juice, colorful, ice-cold, garnished with fruit',
    'herbal': 'traditional Thai herbal drink, natural ingredients visible, health-focused presentation',
    'alcohol': 'Thai beer or cocktail, tropical bar setting, garnished appropriately',
    'smoothie': 'thick blended tropical smoothie, fresh fruit garnish, colorful layers',
  };
  const hint = categoryHints[category] || 'refreshing Thai beverage, beautifully presented';
  const tempHint = type === 'hot' ? 'steam rising, warm ceramic cup' : 'ice-cold, condensation on glass, refreshing';

  return `Create a professional beverage photography image of "${name}"${thaiName ? ` (${thaiName})` : ''}, a traditional Thai ${category || ''} drink.
Style: High-end beverage photography, shallow depth of field, natural lighting.
Presentation: ${hint}. ${tempHint}.
Background: Softly blurred Thai café or street vendor setting, tropical atmosphere.
Quality: Professional drink photography, liquid texture, ice/steam details visible.
Resolution: High resolution, sharp details.
CRITICAL: The image must contain ZERO text, ZERO letters, ZERO numbers, ZERO words, ZERO watermarks. Only the drink and setting.`;
}

// ── Image Generation APIs ────────────────────────────────────────────────

async function generateGrok(prompt) {
  const res = await fetch('https://api.x.ai/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${XAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'grok-imagine-image',
      prompt,
      n: 1,
      aspect_ratio: '3:2',
      resolution: '2k',
      response_format: 'url',
    }),
  });
  if (!res.ok) throw new Error(`Grok ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const imgUrl = data.data?.[0]?.url;
  if (!imgUrl) throw new Error('No image URL in Grok response');
  const imgRes = await fetch(imgUrl);
  return Buffer.from(await imgRes.arrayBuffer());
}

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

// ── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const doFood = args.includes('--food') || (!args.includes('--drinks'));
  const doDrinks = args.includes('--drinks') || (!args.includes('--food'));
  const onlyFilter = args.find(a => a.startsWith('--only='));
  const onlySlugs = onlyFilter ? onlyFilter.split('=')[1].split(',') : null;
  const skipExisting = args.includes('--skip-existing');
  const provider = args.includes('--provider=gemini') ? 'gemini' : 'grok';
  const generate = provider === 'gemini' ? generateGemini : generateGrok;

  if (provider === 'grok' && !XAI_API_KEY) {
    console.error('XAI_API_KEY not found in .env.local');
    process.exit(1);
  }
  if (provider === 'gemini' && !GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY not found in .env.local');
    process.exit(1);
  }

  const items = [];

  if (doFood) {
    const foodData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/food/index.json'), 'utf-8'));
    for (const item of foodData) {
      if (onlySlugs && !onlySlugs.includes(item.slug)) continue;
      const outPath = path.join(ROOT, 'public/images/food', `${item.slug}.webp`);
      if (skipExisting && fs.existsSync(outPath)) {
        console.log(`⏭  Skipping ${item.slug} (already exists)`);
        continue;
      }
      items.push({
        type: 'food',
        slug: item.slug,
        name: item.name.en,
        thaiName: item.name.thai,
        category: item.category,
        drinkType: null,
        outPath,
      });
    }
  }

  if (doDrinks) {
    const drinksData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/drinks/index.json'), 'utf-8'));
    for (const item of drinksData.drinks) {
      if (onlySlugs && !onlySlugs.includes(item.slug)) continue;
      const outPath = path.join(ROOT, 'public/images/drinks', `${item.slug}.webp`);
      if (skipExisting && fs.existsSync(outPath)) {
        console.log(`⏭  Skipping ${item.slug} (already exists)`);
        continue;
      }
      items.push({
        type: 'drink',
        slug: item.slug,
        name: item.name.en,
        thaiName: item.name.thai,
        category: item.category,
        drinkType: item.type,
        outPath,
      });
    }
  }

  fs.mkdirSync(path.join(ROOT, 'public/images/food'), { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'public/images/drinks'), { recursive: true });

  console.log(`\n🍜 Generating ${items.length} images via ${provider.toUpperCase()} (2K, ${TARGET_WIDTH}x${TARGET_HEIGHT})\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const progress = `[${i + 1}/${items.length}]`;

    try {
      console.log(`${progress} Generating: ${item.name} (${item.slug})...`);

      const prompt = item.type === 'food'
        ? foodPrompt(item.name, item.thaiName, item.category)
        : drinkPrompt(item.name, item.thaiName, item.category, item.drinkType);

      const imgBuffer = await generate(prompt);
      await processAndSave(imgBuffer, item.outPath);

      const fileSize = (fs.statSync(item.outPath).size / 1024).toFixed(0);
      console.log(`  ✅ ${fileSize}KB`);
      success++;
    } catch (err) {
      console.error(`  ❌ ${item.slug} — ${err.message}`);
      failed++;
    }

    if (i < items.length - 1) {
      await new Promise(r => setTimeout(r, DELAY_MS));
    }
  }

  console.log(`\n✨ Done! ${success} generated, ${failed} failed.\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
