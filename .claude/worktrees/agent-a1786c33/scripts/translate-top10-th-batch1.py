#!/usr/bin/env python3
"""Translate 20 hotels/restaurants files to Thai for batch 1 cities."""
import json, os, copy

BASE = "/home/marvin/Projecten/go2thailand.com/data/top10"
OUT = os.path.join(BASE, "th")
os.makedirs(OUT, exist_ok=True)

CITY_TH = {
    "ayutthaya": "อยุธยา",
    "bangkok": "กรุงเทพฯ",
    "bueng-kan": "บึงกาฬ",
    "chanthaburi": "จันทบุรี",
    "chiang-khan": "เชียงคาน",
    "chiang-mai": "เชียงใหม่",
    "chiang-rai": "เชียงราย",
    "chumphon": "ชุมพร",
    "hat-yai": "หาดใหญ่",
    "hua-hin": "หัวหิน",
}

def translate_hotels(city_slug):
    city_th = CITY_TH[city_slug]
    fname = f"{city_slug}-hotels.json"
    src = os.path.join(BASE, fname)
    dst = os.path.join(OUT, fname)
    with open(src, 'r', encoding='utf-8') as f:
        data = json.load(f)
    data["title"] = f"โรงแรมที่ดีที่สุดใน{city_th} ประเทศไทย (2026)"
    data["meta_description"] = f"10 โรงแรมที่ดีที่สุดใน{city_th} ประเทศไทย พร้อมราคาจริง คะแนน และรีวิวจาก TripAdvisor อัปเดต 2026"
    data["intro"] = f"ค้นพบโรงแรมที่ดีที่สุดใน{city_th} ประเทศไทย คำแนะนำเหล่านี้อิงจากรีวิวจริงของแขกและราคาปัจจุบันจาก TripAdvisor"
    for item in data.get("items", []):
        name = item.get("name", "")
        rating = item.get("scraped", {}).get("rating", "")
        reviews = item.get("scraped", {}).get("review_count", "")
        item["description"] = f"{name} เป็นโรงแรมคะแนน {rating} ใน{city_th}"
        item["location"] = city_th
        item["current_info"] = f"คะแนน: {rating}/5 • {reviews} รีวิว"
    with open(dst, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  Wrote {fname}")

def translate_restaurants(city_slug):
    city_th = CITY_TH[city_slug]
    fname = f"{city_slug}-restaurants.json"
    src = os.path.join(BASE, fname)
    dst = os.path.join(OUT, fname)
    with open(src, 'r', encoding='utf-8') as f:
        data = json.load(f)
    data["title"] = f"ร้านอาหารที่ดีที่สุดใน{city_th} ประเทศไทย (2026)"
    data["meta_description"] = f"10 ร้านอาหารที่ดีที่สุดใน{city_th} ประเทศไทย พร้อมคะแนนจริงและรีวิวจาก TripAdvisor อัปเดต 2026"
    data["intro"] = f"ค้นพบร้านอาหารที่ดีที่สุดใน{city_th} ประเทศไทย คำแนะนำเหล่านี้อิงจากรีวิวจริงของผู้ใช้และคะแนนจาก TripAdvisor"
    for item in data.get("items", []):
        name = item.get("name", "")
        rating = item.get("scraped", {}).get("rating", "")
        reviews = item.get("scraped", {}).get("review_count", "")
        cuisine = item.get("scraped", {}).get("cuisine", "")
        price_range = item.get("scraped", {}).get("price_range", "")
        item["description"] = f"{name} เป็นร้านอาหาร {cuisine} คะแนน {rating} ใน{city_th}"
        item["location"] = city_th
        info_parts = []
        if cuisine:
            info_parts.append(f"ประเภทอาหาร: {cuisine}")
        if price_range:
            info_parts.append(f"ราคา: {price_range}")
        info_parts.append(f"คะแนน: {rating}/5 • {reviews} รีวิว")
        item["current_info"] = " • ".join(info_parts)
    with open(dst, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  Wrote {fname}")

if __name__ == "__main__":
    print("Translating hotels...")
    for slug in CITY_TH:
        translate_hotels(slug)
    print("\nTranslating restaurants...")
    for slug in CITY_TH:
        translate_restaurants(slug)
    print(f"\nDone! Wrote 20 files to {OUT}")
