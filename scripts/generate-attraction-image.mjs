#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const MODEL = 'gemini-3.1-flash-image-preview';

function loadEnv() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return;

  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^([^#=]+)=["']?(.+?)["']?$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const getValue = (flag) => {
    const exact = args.indexOf(flag);
    if (exact >= 0) return args[exact + 1];
    const inline = args.find((arg) => arg.startsWith(`${flag}=`));
    return inline ? inline.split('=').slice(1).join('=') : undefined;
  };

  return {
    name: getValue('--name'),
    location: getValue('--location') || 'Thailand',
    subject: getValue('--subject'),
    output: getValue('--output'),
    width: Number(getValue('--width') || 1600),
    height: Number(getValue('--height') || 900),
  };
}

function buildPrompt({ name, subject, location }) {
  return `Create a photorealistic editorial travel image for "${name}" in ${location}.

Subject:
${subject}

Style:
- premium travel magazine photography
- documentary realism
- natural light
- rich but believable colors
- strong architectural and environmental detail
- calm, cultured hidden-gem atmosphere
- horizontal destination-guide hero image

Hard constraints:
- zero text
- zero letters
- zero numbers
- zero logos
- zero watermarks
- no collage
- no fantasy elements
- no surreal distortions
- no dominant people in frame`;
}

async function generateImage(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
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

async function main() {
  loadEnv();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY not found in .env.local');

  const options = parseArgs();
  if (!options.name || !options.subject || !options.output) {
    throw new Error('Usage: node scripts/generate-attraction-image.mjs --name \"...\" --location \"...\" --subject \"...\" --output public/images/....webp');
  }

  const prompt = buildPrompt(options);
  const buffer = await generateImage(prompt, apiKey);
  const outputPath = path.join(ROOT, options.output.replace(/^\/+/, ''));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await sharp(buffer)
    .resize(options.width, options.height, { fit: 'cover' })
    .webp({ quality: 82 })
    .toFile(outputPath);

  console.log(JSON.stringify({
    model: MODEL,
    output: outputPath,
    width: options.width,
    height: options.height,
    sizeKb: Math.round(fs.statSync(outputPath).size / 1024),
  }, null, 2));
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
