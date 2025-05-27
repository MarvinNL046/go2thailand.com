# 🇹🇭 Go2Thailand.com - Project Documentation

## 📋 **Project Overview**

**Go2Thailand.com** is a programmatic SEO travel directory for Thailand, built with Next.js 14.2.23. The site generates thousands of pages automatically from CSV data using AI enhancement.

### **Tech Stack**
- **Framework**: Next.js 14.2.23 (App Router)
- **Styling**: Tailwind CSS + Shadcn/UI
- **Data**: CSV → JSON → Enhanced JSON
- **AI**: OpenAI GPT-4 for content enhancement + Perplexity for real-time data
- **Ads**: Ezoic integration
- **Deployment**: Static generation ready

### **🆕 AI-Powered Content System**
- **Hybrid AI Approach**: Perplexity API (current 2025 data) + OpenAI (storytelling)
- **Real-Time Data**: Current prices, hours, ratings via Perplexity
- **Cost Effective**: 30 complete guides for only $0.065
- **Quality Content**: Authentic local stories with current practical info

---

## 🗂️ **Data Structure & File Organization**

### **Core Data Flow**
```
thailand-csv/           # Source CSV files
├── cities.csv          # Main cities data (10 cities)
├── food.csv            # Food/restaurant data
├── bangkok-attractions.csv     # Bangkok attractions (10)
├── chiang-mai-attractions.csv  # Chiang Mai attractions (10)
├── phuket-attractions.csv      # Phuket attractions (10)
├── pattaya-attractions.csv     # Pattaya attractions (10)
├── ayutthaya-attractions.csv   # Ayutthaya attractions (10)
├── krabi-attractions.csv       # Krabi attractions (10)
├── chiang-rai-attractions.csv  # Chiang Rai attractions (10)
├── hat-yai-attractions.csv     # Hat Yai attractions (10)
├── sukhothai-attractions.csv   # Sukhothai attractions (10)
└── surat-thani-attractions.csv # Surat Thani attractions (10)

    ↓ CONVERSION ↓

data/                   # Processed JSON data
├── cities/             # Individual city files (10 cities)
├── food/               # Food data (11 dishes)
├── attractions/        # Attraction data by city (100 total)
│   ├── index.json      # Master attractions index
│   ├── bangkok/        # 10 Bangkok attractions
│   ├── chiang-mai/     # 10 Chiang Mai attractions
│   ├── phuket/         # 10 Phuket attractions
│   ├── pattaya/        # 10 Pattaya attractions
│   ├── ayutthaya/      # 10 Ayutthaya attractions
│   ├── krabi/          # 10 Krabi attractions
│   ├── chiang-rai/     # 10 Chiang Rai attractions
│   ├── hat-yai/        # 10 Hat Yai attractions
│   ├── sukhothai/      # 10 Sukhothai attractions
│   └── surat-thani/    # 10 Surat Thani attractions
├── top10/              # 🆕 AI-generated Top 10 guides (30 total)
│   ├── bangkok-restaurants.json     # Bangkok top 10 restaurants
│   ├── bangkok-hotels.json          # Bangkok top 10 hotels  
│   ├── bangkok-attractions.json     # Bangkok top 10 attractions
│   ├── chiang-mai-restaurants.json  # Chiang Mai top 10 restaurants
│   ├── chiang-mai-hotels.json       # Chiang Mai top 10 hotels
│   ├── chiang-mai-attractions.json  # Chiang Mai top 10 attractions
│   ├── phuket-restaurants.json      # Phuket top 10 restaurants
│   ├── phuket-hotels.json           # Phuket top 10 hotels
│   ├── phuket-attractions.json      # Phuket top 10 attractions
│   └── [+21 more city-category files] # All 10 cities × 3 categories
└── enhanced/           # AI-enhanced content
    ├── [city].json     # Enhanced city data (10 cities)
    ├── food/           # Enhanced food data (11 dishes)
    └── attractions/    # Enhanced attraction data (100 total)
        ├── bangkok/    # Enhanced Bangkok attractions
        ├── chiang-mai/ # Enhanced Chiang Mai attractions
        ├── phuket/     # Enhanced Phuket attractions
        ├── pattaya/    # Enhanced Pattaya attractions
        ├── ayutthaya/  # Enhanced Ayutthaya attractions
        ├── krabi/      # Enhanced Krabi attractions
        ├── chiang-rai/ # Enhanced Chiang Rai attractions
        ├── hat-yai/    # Enhanced Hat Yai attractions
        ├── sukhothai/  # Enhanced Sukhothai attractions
        └── surat-thani/ # Enhanced Surat Thani attractions

    ↓ GENERATION ↓

pages/                  # Generated pages
├── city/               # City pages
├── city/[slug]/        # Individual city pages
├── city/[slug]/attractions/  # Attraction overview pages
├── city/[slug]/attractions/[attraction]/  # Individual attraction pages
├── city/[slug]/top-10-restaurants/  # 🆕 City Top 10 restaurants guide
├── city/[slug]/top-10-hotels/       # 🆕 City Top 10 hotels guide
├── city/[slug]/top-10-attractions/  # 🆕 City Top 10 attractions guide
├── top-10/             # 🆕 Top 10 category overview pages
│   ├── restaurants/    # All cities restaurants overview
│   ├── hotels/         # All cities hotels overview
│   └── attractions/    # All cities attractions overview
├── food/               # Food overview page
└── food/[slug]/        # Individual food pages
```

### **Data Schema Reference**

#### **Cities Data Structure**
```json
{
  "id": 1,
  "slug": "bangkok",
  "name": {
    "en": "Bangkok",
    "nl": "Bangkok"
  },
  "region": "Central Thailand",
  "province": "Bangkok",
  "description": {
    "en": "Description text",
    "nl": "Nederlandse beschrijving"
  },
  "highlights": ["Temple visits", "Street food"],
  "image": "/images/cities/bangkok/hero.webp",
  "images": {
    "hero": "/images/cities/bangkok/hero.webp",
    "attractions": "/images/cities/bangkok/attractions.webp"
  },
  "categories": {
    "attractions": {
      "en": "Top attractions in Bangkok",
      "nl": "Top attracties in Bangkok"
    }
  },
  "enhanced_description": "AI-generated content...",
  "tags": ["temple", "food", "culture"]
}
```

#### **Attractions Data Structure**
```json
{
  "id": 1,
  "slug": "grand-palace",
  "name": {
    "en": "Grand Palace",
    "nl": "Groot Paleis"
  },
  "type": "temple",
  "description": {
    "en": "Historic palace complex",
    "nl": "Historisch paleiscomplex"
  },
  "highlights": ["Emerald Buddha", "Thai architecture"],
  "image": "/images/attractions/bangkok/grand-palace.webp",
  "address": "Na Phra Lan Rd, Bangkok",
  "location": {
    "lat": 13.7500,
    "lng": 100.4915
  },
  "opening_hours": "08:30-15:30",
  "entrance_fee": {
    "thb": 500,
    "usd": 15
  },
  "enhanced_description": "AI-enhanced content...",
  "visitor_experience": "What to expect...",
  "best_time_to_visit": {
    "time_of_day": "Early morning",
    "duration": "2-3 hours"
  }
}
```

---

## ⚙️ **Core Workflows**

### **1. Adding New City Data**

#### **Step 1: Prepare CSV**
```bash
# Add new city to thailand-csv/cities.csv
# Format: id,name_en,name_nl,region,province,description_en,description_nl,highlights,image
```

#### **Step 2: Convert to JSON**
```bash
node lib/convert-cities-data.js
```

#### **Step 3: Enhance with AI**
```bash
node lib/enhance-content.js
```

#### **Step 4: Verify & Build**
```bash
node lib/verify-data.js
npm run build
```

### **🆕 2. Generating Top 10 Guides with AI**

#### **Step 1: Generate Single Top 10 Guide**
```bash
# Generate specific city + category combination
node lib/enhance-content.js top10 bangkok restaurants
node lib/enhance-content.js top10 chiang-mai hotels
node lib/enhance-content.js top10 phuket attractions
```

#### **Step 2: Mass Generate All Top 10 Guides**
```bash
# Generate all 30 guides at once (10 cities × 3 categories)
node scripts/mass-generate-top10.js

# Cost: ~$0.065 for all 30 guides
# Time: ~5 minutes for complete generation
# Output: 30 JSON files in data/top10/
```

#### **Step 3: Check Top 10 Status**
```bash
# Check which guides exist and which are missing
node scripts/check-top10-status.js

# Sample output:
# ✅ bangkok-restaurants.json
# ✅ bangkok-hotels.json  
# ❌ bangkok-attractions.json (MISSING)
```

#### **Step 4: Refresh Specific Guides**
```bash
# Refresh guides with outdated data
node scripts/refresh-top10.js

# Refreshes guides older than 30 days automatically
# Uses Perplexity for current 2025 data
```

#### **Step 5: Test & Deploy**
```bash
npm run build  # Build includes sitemap update (189 URLs)
npm run dev    # Test locally

# New URL structure:
# http://localhost:3000/top-10/restaurants/
# http://localhost:3000/city/bangkok/top-10-restaurants/
```

### **2. Adding Attractions for Cities**

#### **Step 1: Create CSV Files**
```bash
# Create thailand-csv/[city]-attractions.csv for each city
# Format: id,slug,name_en,name_nl,type,city_slug,address,coordinates_lat,coordinates_lng,opening_hours,entrance_fee_thb,description_en,description_nl,highlights,image_url,official_website

# All 10 cities now have attractions CSV files:
# - bangkok-attractions.csv (10 attractions)
# - chiang-mai-attractions.csv (10 attractions)
# - phuket-attractions.csv (10 attractions)
# - pattaya-attractions.csv (10 attractions)
# - ayutthaya-attractions.csv (10 attractions)
# - krabi-attractions.csv (10 attractions)
# - chiang-rai-attractions.csv (10 attractions)
# - hat-yai-attractions.csv (10 attractions)
# - sukhothai-attractions.csv (10 attractions)
# - surat-thani-attractions.csv (10 attractions)
```

#### **Step 2: Convert All Cities to JSON**
```bash
# Convert all cities at once
node lib/convert-all-attractions-data.js

# Or convert single city
node lib/convert-attractions-data.js [city]
```

#### **Step 3: Enhance All Cities with AI**
```bash
# Enhance all cities at once (100 attractions total)
node lib/enhance-all-attractions.js

# Or enhance single city
node lib/enhance-all-attractions.js [city]
```

#### **Step 4: Test & Deploy**
```bash
npm run dev
# Test all cities:
# http://localhost:3000/city/bangkok/attractions/
# http://localhost:3000/city/chiang-mai/attractions/
# http://localhost:3000/city/phuket/attractions/
# etc.
```

### **3. Adding New Content Types (Food, Hotels, etc.)**

#### **Template for New Content Type**
1. Create CSV: `thailand-csv/[city]-[type].csv`
2. Create converter: `lib/convert-[type]-data.js`
3. Create enhancer: `lib/enhance-[type].js`
4. Create page: `pages/city/[slug]/[type].tsx`
5. Add functions to `lib/cities.js`

---

## 🛠️ **Key Commands Reference**

### **Development**
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
```

### **Data Processing**
```bash
# Convert CSV to JSON
node lib/convert-cities-data.js                    # Convert cities
node lib/convert-food-data.js                      # Convert food data
node lib/convert-all-attractions-data.js           # Convert all attractions (100 total)
node lib/convert-attractions-data.js [city]        # Convert single city attractions

# Enhance with AI
node lib/enhance-content.js                        # Enhance cities
node lib/enhance-food.js                          # Enhance food data
node lib/enhance-all-attractions.js               # Enhance all attractions (100 total)
node lib/enhance-all-attractions.js [city]        # Enhance single city attractions

# 🆕 Top 10 Guides Generation
node lib/enhance-content.js top10 [city] [category]  # Generate single Top 10 guide
node scripts/mass-generate-top10.js                  # Generate all 30 Top 10 guides
node scripts/check-top10-status.js                   # Check which guides exist
node scripts/refresh-top10.js                        # Refresh outdated guides

# 🆕 Testing & Demo Scripts
node scripts/test-perplexity-integration.js          # Test Perplexity API connection
node scripts/demo-real-perplexity.js                 # Demo real Perplexity call
node scripts/demo-complete-workflow.js               # Full workflow demonstration

# Verify data integrity
node lib/verify-data.js
```

### **Testing URLs**
```bash
# Local development URLs
http://localhost:3000/                           # Homepage
http://localhost:3000/city/                      # Cities overview
http://localhost:3000/city/bangkok/              # Bangkok city page
http://localhost:3000/city/bangkok/attractions/  # Bangkok attractions
http://localhost:3000/city/bangkok/attractions/grand-palace/  # Attraction detail
```

---

## 📁 **Critical File Locations**

### **Core Library Functions**
- `lib/cities.js` - Main data access functions
- `lib/food.js` - Food data access functions
- `lib/convert-cities-data.js` - CSV to JSON converter for cities
- `lib/convert-food-data.js` - CSV to JSON converter for food
- `lib/convert-all-attractions-data.js` - CSV to JSON converter for all attractions
- `lib/convert-attractions-data.js` - CSV to JSON converter for single city attractions
- `lib/enhance-content.js` - AI content enhancement for cities + Top 10 generation
- `lib/enhance-food.js` - AI content enhancement for food
- `lib/enhance-all-attractions.js` - AI content enhancement for all attractions
- `lib/enhance-attractions.js` - AI content enhancement for single city attractions
- `lib/verify-data.js` - Data validation
- `lib/sitemap.js` - Dynamic sitemap generation (189 URLs)

### **🆕 AI Integration**
- `lib/ai/openai-client.js` - OpenAI GPT-4 client for storytelling
- `lib/ai/perplexity-client.js` - Perplexity API client for real-time data
- `lib/ai/content-enhancer.js` - Unified AI content enhancement

### **🆕 Scripts & Automation**
- `scripts/mass-generate-top10.js` - Generate all 30 Top 10 guides
- `scripts/check-top10-status.js` - Check which guides exist/missing
- `scripts/refresh-top10.js` - Refresh outdated guides
- `scripts/test-perplexity-integration.js` - Test Perplexity connection
- `scripts/demo-real-perplexity.js` - Demo real Perplexity API call
- `scripts/demo-complete-workflow.js` - Full workflow demonstration

### **Page Templates**
- `pages/city/index.tsx` - Cities overview page
- `pages/city/[slug]/index.tsx` - Individual city page
- `pages/city/[slug]/attractions.tsx` - City attractions overview
- `pages/city/[slug]/attractions/[attraction].tsx` - Attraction detail page

### **🆕 Top 10 Page Templates**
- `pages/top-10/restaurants.tsx` - All cities restaurants overview
- `pages/top-10/hotels.tsx` - All cities hotels overview  
- `pages/top-10/attractions.tsx` - All cities attractions overview
- `pages/city/[slug]/top-10-restaurants.tsx` - City-specific restaurant guide
- `pages/city/[slug]/top-10-hotels.tsx` - City-specific hotel guide
- `pages/city/[slug]/top-10-attractions.tsx` - City-specific attraction guide

### **Components**
- `components/Header.tsx` - Site navigation
- `components/Footer.tsx` - Site footer
- `components/Breadcrumbs.tsx` - Navigation breadcrumbs
- `components/CityCard.tsx` - City preview cards
- `components/EzoicAd.tsx` - Ad placements

### **Configuration**
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS setup
- `.env.local` - Environment variables (OpenAI API key)

---

## 🚨 **Troubleshooting Guide**

### **Common Issues**

#### **1. "Module not found" errors**
```bash
# Problem: Missing data files for a city
# Solution: Only Bangkok has full data currently
# Check: Does data/attractions/[city]/ exist?
```

#### **2. Images not loading (404 errors)**
```bash
# Problem: Image files don't exist yet
# Status: Expected - images will be added later
# Impact: Functionality works, just placeholder images shown
```

#### **3. AI Enhancement fails**
```bash
# Check: Is OPENAI_API_KEY set in .env.local?
# Check: Is there API credit available?
# Fallback: System uses original descriptions if enhancement fails
```

#### **4. Build errors**
```bash
# Run data verification first:
node lib/verify-data.js

# Check for syntax errors:
npm run build

# Common fix: Restart dev server
npm run dev
```

### **Data Validation Checklist**
- [ ] All required CSV columns present
- [ ] No empty required fields
- [ ] Valid image paths
- [ ] Unique IDs and slugs
- [ ] Consistent data types

---

## 🔄 **Current Implementation Status**

### **✅ Completed**
- [x] Cities system (10 Thailand cities with AI enhancement)
- [x] Attractions system (100 attractions across all 10 cities with AI enhancement)
- [x] Food system (11 Thai dishes with AI enhancement)
- [x] 🆕 **Top 10 Guides System (30 complete guides with real 2025 data)**
  - [x] Bangkok, Chiang Mai, Phuket, Pattaya, Ayutthaya Top 10s
  - [x] Krabi, Chiang Rai, Hat Yai, Sukhothai, Surat Thani Top 10s
  - [x] Restaurants, Hotels, Attractions for all 10 cities
  - [x] Real-time Perplexity API integration for current data
  - [x] Hybrid AI approach (Perplexity facts + OpenAI storytelling)
- [x] 🆕 **Enhanced Sitemap (189 URLs total, +33 from Top 10 system)**
- [x] 🆕 **Mass Content Generation Scripts (cost: $0.065 for 30 guides)**
- [x] Programmatic page generation for all content types
- [x] SEO metadata generation with structured data
- [x] Responsive design with mobile-first approach
- [x] Ezoic ad integration with strategic placements
- [x] Complete data conversion and enhancement workflows
- [x] Comprehensive documentation and troubleshooting guides

### **🚧 In Progress**
- [ ] Hotel accommodation system
- [ ] Image optimization and management
- [ ] Advanced search and filtering
- [ ] Performance optimizations

### **📋 Planned**
- [ ] Multi-language support expansion
- [ ] Advanced filtering/search
- [ ] User reviews integration
- [ ] Maps integration
- [ ] Mobile app

---

## 📈 **Scaling Guidelines**

### **Adding More Cities**
1. **Batch Processing**: Process 5-10 cities at once
2. **Image Strategy**: Use consistent naming `/images/cities/[slug]/[type].webp`
3. **Content Quality**: Always enhance with AI for better SEO
4. **Testing**: Test each batch before proceeding

### **Performance Considerations**
- **Static Generation**: Pre-build all pages for speed
- **Image Optimization**: Use WebP format, lazy loading
- **Caching**: Implement ISR for large datasets
- **Bundle Size**: Monitor and optimize JavaScript bundles

### **SEO Optimization**
- **Unique Content**: Each page must have unique meta descriptions
- **Internal Linking**: Cross-link related content
- **Sitemap Generation**: Auto-generate XML sitemaps
- **Schema Markup**: Add structured data for rich snippets

---

## 🔐 **Environment Setup**

### **Required Environment Variables**
```bash
# .env.local
OPENAI_API_KEY=sk-...          # For AI content enhancement
PERPLEXITY_API_KEY=pplx-...    # 🆕 For real-time Top 10 data generation
EZOIC_AD_CLIENT_ID=ca-pub-...  # For ad monetization
```

### **Development Setup**
```bash
# Clone and setup
git clone [repository]
cd go2-thailand.com
npm install

# Setup environment
cp .env.local.example .env.local
# Add your API keys

# Start development
npm run dev
```

---

## 📊 **Content Strategy**

### **City Content Priorities**
1. **Tier 1**: Bangkok, Chiang Mai, Phuket (Complete data)
2. **Tier 2**: Pattaya, Krabi, Ayutthaya (Basic + attractions)
3. **Tier 3**: Remaining cities (Basic data only)

### **Content Types Roadmap**
1. **Phase 1**: Cities + Attractions ✅
2. **Phase 2**: Food + Restaurants 🚧
3. **Phase 3**: Hotels + Accommodation
4. **Phase 4**: Activities + Tours
5. **Phase 5**: Travel Tips + Guides

---

## 🎯 **Quality Standards**

### **Content Requirements**
- **Uniqueness**: All AI-enhanced content must be unique
- **Accuracy**: Fact-check all data before publishing
- **Completeness**: Each page must have full metadata
- **Readability**: Content should be engaging and informative

### **Technical Requirements**
- **Performance**: Page load times < 3 seconds
- **Mobile**: Fully responsive design
- **SEO**: Perfect Lighthouse SEO scores
- **Accessibility**: WCAG 2.1 AA compliance

---

## 📞 **Quick Reference**

### **Emergency Commands**
```bash
# Reset development environment
rm -rf .next && npm run dev

# Regenerate all data
node lib/convert-cities-data.js && node lib/enhance-content.js

# Production build test
npm run build && npm run start
```

### **Important URLs in Development**
- Homepage: `http://localhost:3000/`
- Cities: `http://localhost:3000/city/`
- Bangkok: `http://localhost:3000/city/bangkok/`
- Attractions: `http://localhost:3000/city/bangkok/attractions/`

---

*Last updated: 2025-01-25*
*Project: Go2Thailand.com Programmatic SEO Directory*
