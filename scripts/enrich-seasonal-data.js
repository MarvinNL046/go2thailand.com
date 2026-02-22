#!/usr/bin/env node
/**
 * Enrich city data with best_time_to_visit object and seasonal_secrets
 * for cities that are missing this data.
 *
 * E-E-A-T focused: pulls city-specific data (restaurants, highlights,
 * hidden gems, bestTimeToVisit prose) rather than generic regional templates.
 *
 * Usage: node scripts/enrich-seasonal-data.js
 */

const fs = require('fs');
const path = require('path');

const enhancedDir = path.join(__dirname, '..', 'data', 'enhanced');
const files = fs.readdirSync(enhancedDir)
  .filter(f => f.endsWith('.json') && fs.statSync(path.join(enhancedDir, f)).isFile());

// Thailand regional weather/season data
const REGION_SEASONS = {
  Northern: {
    cool: { months: 'November - February', weather: 'Cool and dry, 15-30°C', season: 'Cool Season' },
    hot: { months: 'March - May', weather: 'Hot and dry, 30-40°C' },
    rainy: { months: 'June - October', weather: 'Warm with monsoon rains' },
    bestReasons: 'Best weather for temples, trekking, and outdoor activities',
  },
  Central: {
    cool: { months: 'November - February', weather: 'Pleasant, 20-32°C', season: 'Cool Season' },
    hot: { months: 'March - May', weather: 'Hot and humid, 30-38°C' },
    rainy: { months: 'June - October', weather: 'Frequent afternoon showers' },
    bestReasons: 'Comfortable temperatures for sightseeing and markets',
  },
  Southern: {
    cool: { months: 'December - April', weather: 'Dry and sunny, 25-33°C', season: 'Dry Season' },
    hot: { months: 'March - May', weather: 'Hot and humid, 28-35°C' },
    rainy: { months: 'May - November', weather: 'Southwest monsoon, heavy rains' },
    bestReasons: 'Clear skies, calm seas, perfect for beaches and diving',
  },
  Isaan: {
    cool: { months: 'November - February', weather: 'Cool and dry, 15-28°C', season: 'Cool Season' },
    hot: { months: 'March - May', weather: 'Very hot, 30-40°C' },
    rainy: { months: 'June - October', weather: 'Warm with regular rainfall' },
    bestReasons: 'Comfortable for Mekong exploration and temple visits',
  },
  Eastern: {
    cool: { months: 'November - February', weather: 'Pleasant, 22-32°C', season: 'Cool Season' },
    hot: { months: 'March - May', weather: 'Hot and humid, 30-36°C' },
    rainy: { months: 'June - October', weather: 'Regular tropical showers' },
    bestReasons: 'Best for island hopping and beach activities',
  },
};

// City-specific festivals (beyond national holidays)
const CITY_FESTIVALS = {
  'chiang-mai': [
    'Yi Peng Lantern Festival (November) - thousands of sky lanterns released',
    'Chiang Mai Flower Festival (first weekend of February)',
    'Inthakin Festival (May/June) - pillar worship at Wat Chedi Luang',
  ],
  'chiang-rai': [
    'Chiang Rai Flower Festival (December-January)',
    'Golden Triangle cultural events throughout cool season',
  ],
  'pai': [
    'Pai Jazz & Blues Festival (cool season)',
    'Walking Street live music every evening during peak season',
  ],
  'bangkok': [
    'Chinese New Year in Yaowarat/Chinatown (January/February)',
    'Bangkok Art Biennale (October-February, biennial)',
    'Illumination events at Grand Palace (December)',
  ],
  'phuket': [
    'Phuket Vegetarian Festival (October) - nine days of rituals and street food',
    'Phuket Old Town Festival (February)',
    'Phuket King\'s Cup Regatta (December)',
  ],
  'pattaya': [
    'Pattaya International Fireworks Festival (November)',
    'Pattaya Music Festival (March)',
    'Wan Lai Festival (April) - Pattaya\'s own Songkran celebration',
  ],
  'koh-samui': [
    'Buffalo Fighting Festival (seasonal, check locally)',
    'Full Moon Party boats to Koh Phangan (monthly)',
  ],
  'koh-phangan': [
    'Full Moon Party (monthly at Haad Rin beach)',
    'Half Moon Festival (twice monthly)',
  ],
  'ayutthaya': [
    'Ayutthaya World Heritage Fair (December) - light and sound show at ruins',
    'Bang Sai Arts and Crafts Fair (January)',
  ],
  'sukhothai': [
    'Loy Krathong Festival at Sukhothai Historical Park (November) - the most authentic celebration in Thailand',
  ],
  'kanchanaburi': [
    'River Kwai Bridge Week (late November-early December) - light and sound show',
  ],
  'nong-khai': [
    'Naga Fireball Festival (Ok Phansa, October) - mysterious fireballs rise from the Mekong',
  ],
  'ubon-ratchathani': [
    'Candle Festival (July) - spectacular carved candle processions for Buddhist Lent',
  ],
  'hat-yai': [
    'Hatyai Midnight Songkran (April) - unique midnight water festival',
    'Chinese Lantern Festival at Khao Tangkuan (varies)',
  ],
  'trang': [
    'Trang Vegetarian Festival (October) - one of the largest outside Phuket',
    'Trang Underwater Wedding Ceremony (February 14)',
  ],
  'lampang': [
    'Luang Wiang Lakhon Festival (cultural performances, cool season)',
    'Horse-drawn carriage parades (year-round, but best in cool season)',
  ],
  'nakhon-phanom': [
    'Illuminated Boat Procession on the Mekong (Ok Phansa, October)',
    'That Phanom Festival (January/February) - pilgrimage to the sacred stupa',
  ],
  'chiang-khan': [
    'Morning alms giving to monks along the Mekong (daily, year-round)',
    'Chiang Khan Walking Street (weekends, busiest in cool season)',
  ],
  'mukdahan': [
    'Mukdahan Friendship Bridge celebrations (Thai-Lao cultural events)',
  ],
  'bueng-kan': [
    'Naga worship ceremonies at sacred Mekong sites (varies)',
  ],
  'mae-hong-son': [
    'Poi Sang Long Festival (March/April) - boys ordained as novice monks in elaborate procession',
    'Bua Tong Sunflower Festival (November) - fields of wild sunflowers on Doi Mae U-Kor',
  ],
  'hua-hin': [
    'Hua Hin Jazz Festival (June)',
    'Hua Hin Vintage Car Rally (cool season)',
    'King\'s Cup Elephant Polo Tournament (varies)',
  ],
  'lopburi': [
    'Lopburi Monkey Banquet Festival (last Sunday of November) - feast laid out for the city\'s macaques',
  ],
  'chumphon': [
    'Chumphon Marine Festival (March) - celebrates the Gulf coast marine heritage',
  ],
  'phitsanulok': [
    'Phra Buddha Chinnarat Fair (January) - major temple festival at Wat Phra Si Rattana Mahathat',
  ],
};

// National Thai festivals by month
const NATIONAL_FESTIVALS = {
  January: ['New Year celebrations'],
  February: ['Makha Bucha Day', 'Chinese New Year (varies)'],
  March: [],
  April: ['Songkran Water Festival (April 13-15)'],
  May: ['Visakha Bucha Day', 'Royal Ploughing Ceremony'],
  June: [],
  July: ['Asanha Bucha Day', 'Buddhist Lent (Khao Phansa)'],
  August: ["Queen's Birthday (Mother's Day - Aug 12)"],
  September: [],
  October: ['Ok Phansa (End of Buddhist Lent)', 'Vegetarian Festival'],
  November: ['Loy Krathong Festival'],
  December: ["King's Birthday (Father's Day - Dec 5)", 'New Year celebrations'],
};

const MONTH_FULL = {
  Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April',
  May: 'May', Jun: 'June', Jul: 'July', Aug: 'August',
  Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
};

// Map region names from city data to our keys
function normalizeRegion(region) {
  if (!region) return 'Central';
  if (region.includes('North') && !region.includes('east')) return 'Northern';
  if (region.includes('South') || region.includes('Andaman') || region.includes('Gulf')) return 'Southern';
  if (region.includes('Isaan') || region.includes('Isan') || region.includes('Northeast')) return 'Isaan';
  if (region.includes('East')) return 'Eastern';
  return 'Central';
}

// Detect city type from slug, tags, and highlights
function detectCityType(slug, data) {
  if (slug.startsWith('koh-')) return 'island';
  const tags = (data.tags || []).map(t => t.toLowerCase());
  const highlights = (data.highlights || []).map(h => h.toLowerCase());
  const allText = [...tags, ...highlights].join(' ');

  if (allText.includes('mekong') || ['nong-khai', 'nakhon-phanom', 'chiang-khan', 'bueng-kan', 'mukdahan'].includes(slug)) return 'mekong';
  if (allText.includes('beach') || allText.includes('island') || ['phuket', 'krabi', 'rayong'].includes(slug)) return 'beach';
  if (allText.includes('mountain') || allText.includes('trek') || ['pai', 'mae-hong-son'].includes(slug)) return 'mountain';
  if (allText.includes('ruins') || allText.includes('historical') || ['ayutthaya', 'sukhothai', 'lopburi'].includes(slug)) return 'historical';
  if (['bangkok', 'pattaya', 'hat-yai'].includes(slug)) return 'city';
  return 'general';
}

// Extract a plain string name from potentially bilingual objects
function plainName(val) {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val.en) return val.en;
  return String(val);
}

// Extract restaurant names from city data for food recommendations
function getCityFoodContext(data) {
  const restaurants = [];
  if (data.top_restaurants) {
    for (const r of data.top_restaurants.slice(0, 3)) {
      const name = plainName(r.name);
      if (name) restaurants.push(name);
    }
  }
  if (data.whereToEat) {
    for (const r of data.whereToEat.slice(0, 3)) {
      const name = plainName(r.name);
      if (name && !restaurants.includes(name)) {
        restaurants.push(name);
      }
    }
  }
  return restaurants.slice(0, 4);
}

// Build city-specific seasonal food recommendations
function buildSeasonalFoods(data, region, slug, cityType, cityName) {
  const restaurants = getCityFoodContext(data);
  const restaurantMention = restaurants.length > 0
    ? ` Local favorites include ${restaurants.slice(0, 2).join(' and ')}.`
    : '';

  const baseFoods = {
    Northern: {
      cool: `Khao Soi and warming northern curries are perfect for cool evenings.${restaurantMention}`,
      hot: `Fresh mango sticky rice and tropical fruit smoothies to beat the heat.${restaurantMention}`,
      rainy: `Warming soups like Gaeng Hanglay and steamed sticky rice on rainy days.${restaurantMention}`,
    },
    Central: {
      cool: `Street food markets at their best — Pad Thai, Som Tam, and fresh seafood.${restaurantMention}`,
      hot: `Thai iced tea, coconut ice cream, and cold noodle salads.${restaurantMention}`,
      rainy: `Tom Yum Goong and warming curries are perfect for rainy days.${restaurantMention}`,
    },
    Southern: {
      cool: `Fresh-caught seafood, Southern curries with turmeric, and grilled fish.${restaurantMention}`,
      hot: `Fresh coconut water, tropical fruit, and light seafood salads.${restaurantMention}`,
      rainy: `Massaman curry and spicy Southern-style soups.${restaurantMention}`,
    },
    Isaan: {
      cool: `Grilled chicken (Gai Yang), sticky rice, and spicy Som Tam enjoyed outdoors.${restaurantMention}`,
      hot: `Refreshing papaya salads and cold drinks along the riverside.${restaurantMention}`,
      rainy: `Isaan sausages (Sai Krok), larb, and seasonal river fish.${restaurantMention}`,
    },
    Eastern: {
      cool: `Fresh seafood from the Gulf and tropical fruits.${restaurantMention}`,
      hot: `Chilled coconut desserts and fresh oysters.${restaurantMention}`,
      rainy: `Seasonal tropical fruits like mangosteen and rambutan at their peak.${restaurantMention}`,
    },
  };

  // Override for specific city types
  if (cityType === 'island') {
    return {
      cool: `Fresh seafood is at its best during dry season — try beach BBQ restaurants.${restaurantMention}`,
      hot: `Cool off with fresh coconut water and tropical fruit shakes from beachside vendors.${restaurantMention}`,
      rainy: `Cozy up with Thai curries and hot soups at local restaurants — fewer crowds mean better service.${restaurantMention}`,
    };
  }

  if (cityType === 'mekong') {
    return {
      cool: `Mekong riverside dining is at its best — fresh river fish, grilled meats, and Isaan specialties with sunset views.${restaurantMention}`,
      hot: `Cooling Vietnamese-Thai fusion dishes and cold drinks at riverside restaurants.${restaurantMention}`,
      rainy: `Hearty Isaan soups and warming curries — the Mekong at high water is dramatic.${restaurantMention}`,
    };
  }

  return baseFoods[region] || baseFoods.Central;
}

// Build city-specific insider tips
function buildInsiderTips(data, region, slug, cityType, cityName) {
  const tips = {};
  const highlights = data.highlights || [];

  // City-type specific tip
  if (cityType === 'island') {
    tips['Getting there'] = `Book ferry tickets in advance during peak season (December-March). Rough seas during monsoon season may cancel ferry services.`;
    tips['Best beaches'] = `Visit popular beaches early morning (before 9am) for the best experience. In peak season, explore quieter beaches away from the main strip.`;
  } else if (cityType === 'mekong') {
    tips['Mekong sunsets'] = `The best sunset viewing spots fill up fast — arrive 30 minutes before sunset to secure a riverside table.`;
    tips['Border crossings'] = `If crossing to Laos, check visa requirements in advance. Cool season mornings along the Mekong can be surprisingly cold — pack layers.`;
  } else if (cityType === 'mountain') {
    tips['Mountain weather'] = `Temperatures drop significantly after dark (5-15°C in cool season). Pack warm layers for evenings even if days are warm.`;
    tips['Road conditions'] = `Mountain roads have many curves — take motion sickness medicine if needed. Rainy season can make some trails muddy.`;
  } else if (cityType === 'historical') {
    tips['Temple visits'] = `Visit ruins early morning (opening time) for the best light and fewer crowds. Bring water — shade is limited.`;
    tips['Guided tours'] = `Local guides offer context that transforms the experience — well worth the small fee, especially at UNESCO sites.`;
  } else if (cityType === 'city') {
    tips['Getting around'] = `Use BTS/MRT (Bangkok) or songthaew/grab for the most efficient transport. Traffic peaks 7-9am and 4-7pm.`;
  }

  // Universal tips tailored by region
  tips['Peak season'] = region === 'Southern' || cityType === 'island' || cityType === 'beach'
    ? `December-March is peak season — book accommodation 2-4 weeks ahead for the best prices and availability.`
    : `November-February is peak season — book accommodation 2-4 weeks ahead for the best prices.`;

  tips['Rainy season'] = `Rain usually falls in short afternoon bursts — mornings are often sunny and great for exploring ${cityName}.`;

  // Use a highlight for a specific tip
  if (highlights.length > 0) {
    const topHighlight = highlights[0];
    tips[topHighlight] = `Visit ${topHighlight} during the cool season for the most comfortable experience. Early morning visits beat the heat and the crowds.`;
  }

  return tips;
}

// Extract best months from bestMonths array
function monthsToSeason(bestMonths) {
  if (!bestMonths || bestMonths.length === 0) return null;
  const first = bestMonths[0];
  const last = bestMonths[bestMonths.length - 1];
  return `${MONTH_FULL[first]} - ${MONTH_FULL[last]}`;
}

// Build best_times using city's own bestTimeToVisit prose + regional data
function buildBestTimes(data, regionData, bestMonths, cityName, cityType) {
  const bestTimes = {};

  // Use city's own prose for the best season (this is E-E-A-T gold — city-specific content)
  const btv = data.bestTimeToVisit;
  if (btv) {
    // Extract first 1-2 sentences as the "best time" description
    const sentences = btv.split(/\.\s+/).filter(s => s.length > 20);
    const bestDescription = sentences.slice(0, 2).join('. ') + '.';

    if (bestMonths.includes('Nov')) {
      bestTimes['November-February (Best)'] = bestDescription;
    } else if (bestMonths.includes('Dec')) {
      bestTimes['December-February (Best)'] = bestDescription;
    } else if (bestMonths.includes('Jan')) {
      bestTimes['January-March (Best)'] = bestDescription;
    } else {
      bestTimes['Peak Season (Best)'] = bestDescription;
    }
  } else {
    // Fallback to regional data
    if (bestMonths.includes('Nov')) bestTimes['November-February'] = `${regionData.cool.weather}. ${regionData.bestReasons}.`;
    else if (bestMonths.includes('Dec')) bestTimes['December-February'] = `${regionData.cool.weather}. ${regionData.bestReasons}.`;
    else if (bestMonths.includes('Jan')) bestTimes['January-March'] = `${regionData.cool.weather}. ${regionData.bestReasons}.`;
  }

  // Shoulder/off seasons with city-type-specific advice
  if (cityType === 'island' || cityType === 'beach') {
    bestTimes['March-May (Hot Season)'] = `${regionData.hot.weather}. Still good for beach activities — fewer crowds and lower prices.`;
    bestTimes['June-October (Monsoon)'] = `${regionData.rainy.weather}. Some boat services may be reduced, but dramatic skies and empty beaches reward adventurous travelers.`;
  } else if (cityType === 'mountain') {
    bestTimes['March-May (Hot Season)'] = `${regionData.hot.weather}. Valleys get hot but higher elevations remain comfortable. Burning season can cause haze in March.`;
    bestTimes['June-October (Green Season)'] = `${regionData.rainy.weather}. Lush green landscapes and waterfalls at full flow — beautiful but trails can be muddy.`;
  } else {
    bestTimes['March-May (Hot Season)'] = `${regionData.hot.weather}. Cheaper accommodation and fewer crowds — worth it if you can handle the heat.`;
    bestTimes['June-October (Green Season)'] = `${regionData.rainy.weather}. Lush landscapes and good deals — rain usually falls in short afternoon bursts.`;
  }

  return bestTimes;
}

let enrichedCount = 0;
let btvAdded = 0;
let ssAdded = 0;

for (const file of files) {
  const filePath = path.join(enhancedDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const slug = file.replace('.json', '');
  let modified = false;
  const region = normalizeRegion(data.region);
  const regionData = REGION_SEASONS[region] || REGION_SEASONS.Central;
  const cityType = detectCityType(slug, data);
  const cityName = (data.name && data.name.en) || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // Add best_time_to_visit object if missing
  if (!data.best_time_to_visit) {
    const bestMonths = data.practicalInfo && data.practicalInfo.bestMonths;
    data.best_time_to_visit = {
      season: regionData.cool.season,
      months: bestMonths ? monthsToSeason(bestMonths) : regionData.cool.months,
      weather: regionData.cool.weather,
      reasons: regionData.bestReasons,
    };
    modified = true;
    btvAdded++;
  }

  // Add seasonal_secrets if missing
  if (!data.seasonal_secrets) {
    const bestMonths = data.practicalInfo && data.practicalInfo.bestMonths || [];

    // Build city-specific festival list
    const festivals = [];

    // City-specific festivals first (most E-E-A-T value)
    if (CITY_FESTIVALS[slug]) {
      festivals.push(...CITY_FESTIVALS[slug]);
    }

    // Add relevant national festivals for best months
    for (const abbr of bestMonths) {
      const fullMonth = MONTH_FULL[abbr];
      if (fullMonth && NATIONAL_FESTIVALS[fullMonth]) {
        for (const f of NATIONAL_FESTIVALS[fullMonth]) {
          if (!festivals.some(existing => existing.includes(f.split(' ')[0]))) {
            festivals.push(f);
          }
        }
      }
    }

    // Always include Songkran if not already present
    if (!festivals.some(f => f.includes('Songkran'))) {
      festivals.push('Songkran Water Festival (April 13-15) - celebrated nationwide');
    }
    // Include Loy Krathong if not already present
    if (!festivals.some(f => f.includes('Loy Krathong'))) {
      festivals.push('Loy Krathong Festival (November) - floating lanterns on water');
    }

    // Build city-specific seasonal data
    const seasonalFoods = buildSeasonalFoods(data, region, slug, cityType, cityName);
    const insiderTips = buildInsiderTips(data, region, slug, cityType, cityName);
    const bestTimes = buildBestTimes(data, regionData, bestMonths, cityName, cityType);

    data.seasonal_secrets = {
      best_times: bestTimes,
      local_festivals: festivals.slice(0, 8), // Max 8 festivals (city-specific + national)
      seasonal_foods: seasonalFoods,
      insider_tips: insiderTips,
    };
    modified = true;
    ssAdded++;
    console.log(`  Enriched: ${slug} (region: ${region}, type: ${cityType}, festivals: ${festivals.length})`);
  }

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    enrichedCount++;
    if (!data.seasonal_secrets || data.best_time_to_visit) {
      // Only log if we didn't already log for seasonal_secrets
      if (btvAdded > 0 && ssAdded === 0) {
        console.log(`  Enriched: ${slug} (region: ${region}, btv only)`);
      }
    }
  }
}

console.log(`\nResults:`);
console.log(`  Total cities: ${files.length}`);
console.log(`  Enriched: ${enrichedCount}`);
console.log(`  best_time_to_visit added: ${btvAdded}`);
console.log(`  seasonal_secrets added: ${ssAdded}`);
console.log(`  Already complete: ${files.length - enrichedCount}`);
