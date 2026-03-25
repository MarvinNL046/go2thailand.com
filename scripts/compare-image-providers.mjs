#!/usr/bin/env node
/**
 * Generate 5 food images with Gemini + 5 with Grok, all usable as final images
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
const GROK_API_KEY = process.env.XAI_API_KEY;

const TARGET_WIDTH = 2048;
const TARGET_HEIGHT = 1365;

// Load food data
const foodData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/food/index.json'), 'utf-8'));

// First 5 → Gemini, next 5 → Grok
const geminiItems = foodData.slice(0, 5);
const grokItems = foodData.slice(5, 10);

function foodPrompt(name, thaiName, category) {
  const categoryHints = {
    'main-dish': 'beautifully plated on a traditional Thai ceramic plate, street food stall or restaurant setting',
    'soup': 'served in an elegant Thai bowl, steam rising, garnished with fresh herbs',
    'salad': 'fresh and colorful presentation on a banana leaf or Thai plate, vibrant ingredients',
    'curry': 'rich and aromatic in a traditional Thai clay pot or bowl, with jasmine rice nearby',
    'dessert': 'artfully presented Thai sweet, tropical fruits, coconut elements, colorful layers',
    'noodle': 'steaming hot noodles with fresh toppings, chopsticks, street food atmosphere',
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

async function generateGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${GEMINI_API_KEY}`;
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

async function generateGrok(prompt) {
  const url = 'https://api.x.ai/v1/images/generations';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'grok-imagine-image',
      prompt: prompt,
      n: 1,
      aspect_ratio: '3:2',
      resolution: '2k',
      response_format: 'base64',
    }),
  });
  if (!res.ok) throw new Error(`Grok ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error('No image in Grok response');
  return Buffer.from(b64, 'base64');
}

async function processAndSave(imageBuffer, outputPath) {
  await sharp(imageBuffer)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, { fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(outputPath);
}

async function main() {
  console.log(`\n🍜 Generating 10 food images: 5 Gemini + 5 Grok\n`);

  // Gemini batch
  console.log('── GEMINI (5 items) ──');
  for (let i = 0; i < geminiItems.length; i++) {
    const item = geminiItems[i];
    const prompt = foodPrompt(item.name.en, item.name.thai, item.category);
    const outPath = path.join(ROOT, 'public/images/food', `${item.slug}.webp`);
    try {
      console.log(`[${i + 1}/5] ${item.name.en} (${item.slug})...`);
      const buf = await generateGemini(prompt);
      await processAndSave(buf, outPath);
      const size = (fs.statSync(outPath).size / 1024).toFixed(0);
      console.log(`  ✅ ${size}KB → ${outPath}`);
    } catch (err) {
      console.log(`  ❌ ${err.message}`);
    }
    if (i < geminiItems.length - 1) await new Promise(r => setTimeout(r, 7000));
  }

  console.log('\n── GROK (5 items) ──');
  for (let i = 0; i < grokItems.length; i++) {
    const item = grokItems[i];
    const prompt = foodPrompt(item.name.en, item.name.thai, item.category);
    const outPath = path.join(ROOT, 'public/images/food', `${item.slug}.webp`);
    try {
      console.log(`[${i + 1}/5] ${item.name.en} (${item.slug})...`);
      const buf = await generateGrok(prompt);
      await processAndSave(buf, outPath);
      const size = (fs.statSync(outPath).size / 1024).toFixed(0);
      console.log(`  ✅ ${size}KB → ${outPath}`);
    } catch (err) {
      console.log(`  ❌ ${err.message}`);
    }
    if (i < grokItems.length - 1) await new Promise(r => setTimeout(r, 3000));
  }

  console.log('\n✨ Done! Check the images on http://localhost:3001/food/\n');
  console.log('Gemini items: pad-krapow, som-tam, tom-yum-goong, pad-thai, green-curry');
  console.log('Grok items:   mango-sticky-rice, massaman-curry, larb, pad-see-ew, thai-fried-rice');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
