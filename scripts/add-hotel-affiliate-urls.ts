// scripts/add-hotel-affiliate-urls.ts
// Adds Travelpayouts affiliate deep links to all hotel JSON files
// Usage: npx tsx scripts/add-hotel-affiliate-urls.ts

import fs from 'fs';
import path from 'path';

const TOP10_DIR = path.join(process.cwd(), 'data', 'top10');

// Travelpayouts deep link format: tp.media redirect with marker
const MARKER = '602467';
const TRS = '421888';

// Program IDs in Travelpayouts
const BOOKING_PROGRAM = '4114';  // Booking.com
const TRIP_PROGRAM = '7631';     // Trip.com

function makeBookingDeepLink(hotelName: string, cityName: string): string {
  const searchQuery = `${hotelName}, ${cityName}, Thailand`;
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(searchQuery)}&nflt=ht_id%3D204`;
  return `https://tp.media/r?marker=${MARKER}&trs=${TRS}&p=${BOOKING_PROGRAM}&u=${encodeURIComponent(bookingUrl)}`;
}

function makeTripDeepLink(hotelName: string, cityName: string): string {
  const searchQuery = `${hotelName} ${cityName}`;
  const tripUrl = `https://www.trip.com/hotels/list?keyword=${encodeURIComponent(searchQuery)}`;
  return `https://tp.media/r?marker=${MARKER}&trs=${TRS}&p=${TRIP_PROGRAM}&u=${encodeURIComponent(tripUrl)}`;
}

function main() {
  const files = fs.readdirSync(TOP10_DIR).filter(f => f.endsWith('-hotels.json'));
  let totalUpdated = 0;

  for (const file of files) {
    const filePath = path.join(TOP10_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const cityName = data.city_name || file.replace('-hotels.json', '');

    let updated = 0;
    for (const item of data.items) {
      // Generate both links
      item.affiliate_url = makeBookingDeepLink(item.name, cityName);
      item.trip_affiliate_url = makeTripDeepLink(item.name, cityName);
      updated++;
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`${cityName}: ${updated} hotels updated`);
    totalUpdated += updated;
  }

  console.log(`\nDone: ${totalUpdated} affiliate URLs added across ${files.length} cities`);
}

main();
