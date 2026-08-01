const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const publicRoot = path.join(root, 'public');

const aliases = [
  ['images/cities/ayutthaya/attractions/Aerial view of Wat Phra Si Sanphet, Ayutthaya temple in Thailand. Ayutthaya Historical Park has been considered a World Heritage Site by UNESCO..webp', 'images/cities/ayutthaya/attractions/wat-phra-si-sanphet-aerial.webp'],
  ['images/cities/ayutthaya/attractions/at Chaiwatthanaram tempel bij nacht, Ayutthaya.webp', 'images/cities/ayutthaya/attractions/wat-chaiwatthanaram-night.webp'],
  ['images/cities/ayutthaya/attractions/Toeristen rijden olifanten in Ayutthaya, Thailand.webp', 'images/cities/ayutthaya/attractions/ayutthaya-elephant-rides.webp'],
  ['images/cities/ayutthaya/attractions/Wat Mahathat temple, Thailand.webp', 'images/cities/ayutthaya/attractions/wat-mahathat.webp'],
  ['images/extra images/Buddha head in banyan tree roots at Wat Mahathat temple in Ayutthaya Historical Park, Thailand..webp', 'images/cities/ayutthaya/attractions/wat-mahathat-buddha-head.webp'],
  ['images/cities/bangkok/attractions/grand palace/Chakri Maha Prasat, Grand Palace, bangkok thailand.webp', 'images/cities/bangkok/attractions/grand-palace-chakri-maha-prasat.webp'],
  ['images/cities/bangkok/attractions/lumpini park/Aerial view of green trees in Lumpini Park, Sathorn district, Bangkok.webp', 'images/cities/bangkok/attractions/lumpini-park-aerial.webp'],
  ['images/extra images/View of the business area in Bangkok at night, Bangkok is the capital of Thailand and is a popular tourist destination..webp', 'images/cities/bangkok/business-district-night.webp'],
  ['images/extra images/Aerial drone Landscape Turquoise lagoon Nui beach koh Phi Phi Don island, Krabi, Thailand. (2).webp', 'images/cities/krabi/attractions/nui-beach-drone.webp'],
  ['images/extra images/Luchtfoto van turquoise wateren in de buurt van Phi Phi-eilanden, Thailand, met weelderige groene kliffen, rotsachtige formaties en boten die door de kalme zee varen..webp', 'images/cities/krabi/attractions/phi-phi-aerial.webp'],
  ['images/cities/krabi/attractions/Aerial view of Nui beach in koh Phi Phi Don island, in Krabi, Thailand, sunset light..webp', 'images/cities/krabi/attractions/nui-beach-sunset.webp'],
  ['images/cities/krabi/attractions/Aerial view sunset Phi Phi island in Andaman Sea from drone in Province of Krabi, travel landmark of Thailand..webp', 'images/cities/krabi/attractions/phi-phi-sunset.webp'],
  ['images/cities/sukhothai/attractions/Wat Mahathat Sukhothai.webp', 'images/cities/sukhothai/attractions/wat-mahathat-sukhothai.webp'],
  ['images/extra images/Luchtfoto zonsondergang panorama landschap Cheow Lan meer bij Khao Sok nationaal park, Thailand.webp', 'images/cities/khao-sok/cheow-lan-lake-sunset.webp'],
  ['images/extra images/Grootvader en grootmoeder Rocks, Hin Ta Hin Yai, op het eiland Koh Samui, Thailand.webp', 'images/cities/koh-samui/hin-ta-hin-yai.webp'],
];

for (const [source, target] of aliases) {
  const sourcePath = path.join(publicRoot, source);
  const targetPath = path.join(publicRoot, target);
  if (!fs.existsSync(sourcePath)) throw new Error(`Missing source image: ${source}`);
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  if (!fs.existsSync(targetPath)) fs.copyFileSync(sourcePath, targetPath);
}

const textRoots = ['components', 'data', 'lib', 'pages'];
const textExtensions = new Set(['.js', '.json', '.ts', '.tsx']);
let changedFiles = 0;

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (textExtensions.has(path.extname(file))) {
      const original = fs.readFileSync(file, 'utf8');
      let updated = original;
      for (const [source, target] of aliases) updated = updated.split(source).join(target);
      if (updated !== original) {
        fs.writeFileSync(file, updated);
        changedFiles += 1;
      }
    }
  }
}

for (const directory of textRoots) visit(path.join(root, directory));

const contextualReplacements = [
  ['data/attractions/pattaya/index.json', '/images/extra images/buddha head at local souvenirs shop in Bagan historical area, Myanmar.webp', '/images/cities/pattaya/pattaya-sanctuary-truth.webp'],
  ['data/attractions/pattaya/art-in-paradise.json', '/images/extra images/buddha head at local souvenirs shop in Bagan historical area, Myanmar.webp', '/images/cities/pattaya/pattaya-sanctuary-truth.webp'],
  ['data/enhanced/attractions/pattaya/index.json', '/images/extra images/buddha head at local souvenirs shop in Bagan historical area, Myanmar.webp', '/images/cities/pattaya/pattaya-sanctuary-truth.webp'],
  ['data/enhanced/attractions/pattaya/art-in-paradise.json', '/images/extra images/buddha head at local souvenirs shop in Bagan historical area, Myanmar.webp', '/images/cities/pattaya/pattaya-sanctuary-truth.webp'],
  ['data/enhanced/attractions/nl/pattaya/art-in-paradise.json', '/images/extra images/buddha head at local souvenirs shop in Bagan historical area, Myanmar.webp', '/images/cities/pattaya/pattaya-sanctuary-truth.webp'],
  ['data/attractions/sukhothai/ramkhamhaeng-national-museum.json', '/images/extra images/buddha head at local souvenirs shop in Bagan historical area, Myanmar.webp', '/images/cities/sukhothai/attractions/wat-mahathat-sukhothai.webp'],
];

for (const [relativeFile, source, target] of contextualReplacements) {
  const file = path.join(root, relativeFile);
  const original = fs.readFileSync(file, 'utf8');
  const updated = original.split(source).join(target);
  if (updated !== original) {
    fs.writeFileSync(file, updated);
    changedFiles += 1;
  }
}

console.log(`Created ${aliases.length} URL-safe image aliases; updated ${changedFiles} text files.`);
