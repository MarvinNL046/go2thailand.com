const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '..', 'data', 'enhanced');
const cities = fs.readdirSync(dir).filter(f => f.endsWith('.json') && fs.statSync(path.join(dir, f)).isFile());

let hasBestTime = 0, hasPractical = 0, hasBestMonths = 0, hasSeasonal = 0, hasBestTimeObj = 0;
const missing = [];

for (const file of cities) {
  const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const slug = file.replace('.json', '');

  if (data.bestTimeToVisit) hasBestTime++;
  if (data.practicalInfo) hasPractical++;
  if (data.practicalInfo && data.practicalInfo.bestMonths && data.practicalInfo.bestMonths.length > 0) hasBestMonths++;
  if (data.seasonal_secrets) hasSeasonal++;
  if (data.best_time_to_visit) hasBestTimeObj++;

  const hasBT = !!data.bestTimeToVisit;
  const hasPI = !!data.practicalInfo;
  const hasBM = !!(data.practicalInfo && data.practicalInfo.bestMonths);
  if (!hasBT || !hasPI || !hasBM) {
    missing.push(`${slug}: bestTimeToVisit=${hasBT}, practicalInfo=${hasPI}, bestMonths=${hasBM}`);
  }
}

console.log('Total cities:', cities.length);
console.log('Has bestTimeToVisit text:', hasBestTime);
console.log('Has practicalInfo:', hasPractical);
console.log('Has bestMonths:', hasBestMonths);
console.log('Has seasonal_secrets:', hasSeasonal);
console.log('Has best_time_to_visit obj:', hasBestTimeObj);
console.log();
if (missing.length > 0) {
  console.log('Missing data:');
  missing.forEach(m => console.log('  ' + m));
} else {
  console.log('All cities have complete data!');
}
