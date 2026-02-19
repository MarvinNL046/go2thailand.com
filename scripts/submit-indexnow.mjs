#!/usr/bin/env node

/**
 * Submit all sitemap URLs to IndexNow.
 *
 * Usage:
 *   node scripts/submit-indexnow.mjs
 *   node scripts/submit-indexnow.mjs --dry-run
 *
 * Reads all sitemap-*.xml and sitemap.xml files from /public/,
 * extracts URLs, and submits them to the IndexNow API in batches.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEXNOW_KEY = "3fca2447f24ab81131b3c204ebd2ebdf";
const INDEXNOW_HOST = "go2-thailand.com";
const INDEXNOW_API = "https://api.indexnow.org/indexnow";
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;
const BATCH_SIZE = 10_000;

const dryRun = process.argv.includes("--dry-run");

/**
 * Parse all <loc> URLs from a sitemap XML string.
 */
function parseUrlsFromSitemap(xml) {
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

/**
 * Read all sitemap files from public/ and extract URLs.
 */
function getAllSitemapUrls() {
  const publicDir = path.join(__dirname, "..", "public");
  const sitemapFiles = fs
    .readdirSync(publicDir)
    .filter(
      (f) =>
        f.startsWith("sitemap") && f.endsWith(".xml") && f !== "sitemap-index.xml"
    )
    .sort();

  console.log(`Found ${sitemapFiles.length} sitemap file(s):`);
  const allUrls = [];

  for (const file of sitemapFiles) {
    const xml = fs.readFileSync(path.join(publicDir, file), "utf-8");
    const urls = parseUrlsFromSitemap(xml);
    console.log(`  ${file}: ${urls.length} URLs`);
    allUrls.push(...urls);
  }

  return allUrls;
}

/**
 * Submit a batch of URLs to IndexNow.
 */
async function submitBatch(urls, batchNumber) {
  const body = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: urls,
  };

  if (dryRun) {
    console.log(
      `  [DRY RUN] Batch ${batchNumber}: Would submit ${urls.length} URLs`
    );
    return { status: 200, ok: true };
  }

  const response = await fetch(INDEXNOW_API, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  // IndexNow returns 200 or 202 for success
  const ok = response.ok || response.status === 202;

  if (!ok) {
    const text = await response.text().catch(() => "");
    console.error(
      `  Batch ${batchNumber}: HTTP ${response.status} - ${text}`
    );
  }

  return { status: response.status, ok };
}

async function main() {
  console.log("=== IndexNow URL Submission ===\n");

  if (dryRun) {
    console.log("DRY RUN MODE - No actual API calls will be made.\n");
  }

  const urls = getAllSitemapUrls();
  console.log(`\nTotal: ${urls.length} URLs to submit.\n`);

  if (urls.length === 0) {
    console.log("No URLs found. Make sure sitemaps exist in public/.");
    process.exit(0);
  }

  let successCount = 0;
  let failCount = 0;
  const totalBatches = Math.ceil(urls.length / BATCH_SIZE);

  console.log(`Submitting in ${totalBatches} batch(es) of up to ${BATCH_SIZE}...\n`);

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

    const result = await submitBatch(batch, batchNumber);

    if (result.ok) {
      console.log(
        `  Batch ${batchNumber}/${totalBatches}: ${batch.length} URLs submitted (HTTP ${result.status})`
      );
      successCount += batch.length;
    } else {
      failCount += batch.length;
    }
  }

  console.log("\n=== Summary ===");
  console.log(`Total URLs:  ${urls.length}`);
  console.log(`Submitted:   ${successCount}`);
  if (failCount > 0) {
    console.log(`Failed:      ${failCount}`);
  }
  console.log("Done.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
