#!/usr/bin/env python3
"""Translate city data for DE, FR, RU, ZH locales using OpenAI gpt-5-nano."""

import json
import os
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ENHANCED_DIR = REPO / "data" / "enhanced"
ENV_FILE = Path("/home/marvin/Projecten/go2thailand.com/.env.local")

# Read API key
api_key = None
with open(ENV_FILE) as f:
    for line in f:
        if line.startswith("OPENAI_API_KEY"):
            api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
            break

if not api_key:
    print("ERROR: OPENAI_API_KEY not found in .env.local")
    sys.exit(1)

LOCALES = ["de", "fr", "ru", "zh"]
SYSTEM_PROMPT = "You are a professional translator for a Thailand travel website. Translate the given fields to German (de), French (fr), Russian (ru), and Simplified Chinese (zh). Return ONLY valid JSON."

def call_openai(english_data: dict) -> dict:
    user_prompt = f"""Translate these fields for a Thai city into 4 locales (de, fr, ru, zh).

English source:
- name: {english_data['name']}
- description: {english_data['description']}
- metaTitle: {english_data['metaTitle']}
- metaDescription: {english_data['metaDescription']}

Return ONLY this JSON format:
{{
  "de": {{ "name": "...", "description": "...", "metaTitle": "...", "metaDescription": "..." }},
  "fr": {{ "name": "...", "description": "...", "metaTitle": "...", "metaDescription": "..." }},
  "ru": {{ "name": "...", "description": "...", "metaTitle": "...", "metaDescription": "..." }},
  "zh": {{ "name": "...", "description": "...", "metaTitle": "...", "metaDescription": "..." }}
}}"""

    payload = json.dumps({
        "model": "gpt-5-nano",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        "response_format": {"type": "json_object"}
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    )

    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                result = json.loads(resp.read().decode("utf-8"))
            content = result["choices"][0]["message"]["content"]
            return json.loads(content)
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            print(f"  HTTP {e.code} (attempt {attempt+1}/3): {body[:200]}")
            if e.code == 429:
                time.sleep(5 * (attempt + 1))
            elif attempt == 2:
                raise
            else:
                time.sleep(2)
        except Exception as e:
            print(f"  Error (attempt {attempt+1}/3): {e}")
            if attempt == 2:
                raise
            time.sleep(2)


def process_city(filepath: Path) -> bool:
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Check if already translated
    if "de" in data.get("name", {}):
        print(f"  SKIP (already has de)")
        return False

    english = {
        "name": data["name"]["en"],
        "description": data["description"]["en"],
        "metaTitle": data["seo"]["metaTitle"]["en"],
        "metaDescription": data["seo"]["metaDescription"]["en"],
    }

    translations = call_openai(english)

    # Merge translations
    for locale in LOCALES:
        if locale not in translations:
            print(f"  WARNING: missing locale {locale}")
            continue
        t = translations[locale]
        data["name"][locale] = t["name"]
        data["description"][locale] = t["description"]
        data["seo"]["metaTitle"][locale] = t["metaTitle"]
        data["seo"]["metaDescription"][locale] = t["metaDescription"]

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")

    return True


def main():
    city_files = sorted(ENHANCED_DIR.glob("*.json"))
    print(f"Found {len(city_files)} city files")

    success = 0
    skipped = 0
    failed = 0

    for i, filepath in enumerate(city_files, 1):
        city = filepath.stem
        print(f"[{i}/{len(city_files)}] {city}...", end=" ", flush=True)
        try:
            if process_city(filepath):
                success += 1
                print("OK")
            else:
                skipped += 1
        except Exception as e:
            failed += 1
            print(f"FAILED: {e}")

    print(f"\nDone: {success} translated, {skipped} skipped, {failed} failed")


if __name__ == "__main__":
    main()
