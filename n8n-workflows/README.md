# n8n Social Media Automation for Go2Thailand

## Overview
This folder contains the n8n workflow for automated social media posting to Facebook and Instagram using content from the `/data/social-media/` folder.

## Setup Instructions

### 1. API Endpoint
- **Endpoint**: `https://go2-thailand.com/api/social-media/posts`
- **Authentication**: Set `N8N_WEBHOOK_KEY` in your `.env.local`
- **Data Source**: `/data/social-media/` JSON files

### 2. Content Structure
Add JSON files to `/data/social-media/` with this format:
```json
[
  {
    "id": "unique-id",
    "type": "food|city|attraction|beach",
    "title": "Post Title",
    "caption": {
      "default": "Short caption",
      "facebook": "Detailed Facebook caption",
      "instagram": "Instagram optimized caption"
    },
    "imageUrl": "/images/food/pad-thai.webp",
    "hashtags": ["#ThaiFood", "#Go2Thailand"],
    "location": "Bangkok, Thailand",
    "cta": {
      "text": "Read more",
      "link": "https://go2-thailand.com/..."
    }
  }
]
```

### 3. Meta Business Setup
See `README-meta-setup.md` for detailed Facebook/Instagram API configuration.

### 4. Workflow Import
1. Open n8n
2. Import `meta-cross-posting-workflow.json`
3. Configure credentials node with your tokens
4. Test manually before enabling schedule

## Available Content Types
- `food.json` - Thai dishes
- `city.json` - City guides
- `attraction.json` - Tourist attractions
- `beach.json` - Beach destinations
- `temple.json` - Temple content
- `culture.json` - Cultural posts
- `top10.json` - Top 10 lists

## Adding New Content
1. Create new JSON file in `/data/social-media/`
2. Follow the structure above
3. API automatically picks up new files
4. No code changes needed!