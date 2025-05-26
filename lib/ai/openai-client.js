require('dotenv').config({ path: '.env.local' });
const OpenAI = require('openai');

class RateLimiter {
  constructor(requestsPerMinute = 10) {
    this.requests = [];
    this.maxRequests = requestsPerMinute;
  }

  async waitForTokens(estimatedTokens = 1000) {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Remove requests older than 1 minute
    this.requests = this.requests.filter(time => time > oneMinuteAgo);
    
    // If we're at the limit, wait
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = 60000 - (now - oldestRequest) + 1000; // Add 1s buffer
      console.log(`Rate limit reached, waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.waitForTokens(estimatedTokens);
    }
    
    this.requests.push(now);
  }
}

class OpenAIClient {
  constructor() {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.warn('⚠️  OPENAI_API_KEY not found. AI enhancement will be skipped.');
      this.hasApiKey = false;
      this.openai = null;
    } else {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      this.hasApiKey = true;
    }
    this.rateLimiter = new RateLimiter(8); // Conservative 8 requests per minute
  }

  // Helper: OpenAI API call with rate limiting
  async makeOpenAICall(prompt, maxTokens = 4000) {
    // Return fallback if no API key
    if (!this.hasApiKey) {
      console.log('📋 Skipping AI enhancement (no API key) - using fallback data');
      return {
        error: false,
        message: 'AI enhancement skipped',
        fallback: true
      };
    }

    try {
      await this.rateLimiter.waitForTokens(prompt.length);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an experienced travel writer who has lived in Thailand and creates authentic, engaging content. You MUST only return JSON with no explanation outside the JSON structure. Write like a friend sharing real experiences - use storytelling, personal anecdotes, and insider knowledge. Be factual but engaging, avoiding generic tourist information. Make readers feel like they're getting insider secrets from someone who truly knows Thailand."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content in OpenAI response');
      }

      return JSON.parse(content);
    } catch (error) {
      console.error('OpenAI API Error:', error.message);
      
      // Return fallback structure on error
      return {
        error: true,
        message: error.message,
        fallback: true
      };
    }
  }

  // Enhance city description with engaging storytelling
  async enhanceCityDescription(cityData) {
    const prompt = `Create compelling, authentic travel content for ${cityData.name.en}, Thailand that will make people WANT to visit. Write like a travel blogger who actually lived there, not a generic guidebook. Return JSON only.

Current city: ${cityData.name.en}
Region: ${cityData.region}
Current description: ${cityData.description.en}
Current highlights: ${JSON.stringify(cityData.highlights)}

Create enhanced JSON with:

- enhanced_description: 800-1200 word immersive story-style description that:
  * Starts with a vivid scene (e.g., "Picture this: It's 6 AM and the city awakens...")
  * Includes sensory details (sounds, smells, sights)
  * Tells personal anecdotes and discoveries
  * Explains WHY this city is special vs other Thailand destinations
  * Uses storytelling, not just facts
  * Makes readers feel like they're already there

- hidden_gems: array of 5-8 lesser-known spots with:
  * Local insider stories about why each place is special
  * How to find them and best times to visit
  * Personal experiences or interactions with locals

- authentic_experiences: array of 6-10 unique activities that locals do:
  * Beyond typical tourist attractions
  * Cultural insights and learning opportunities
  * Personal stories about trying each experience

- foodie_adventures: array of 8-12 specific food experiences with:
  * Exact dishes to try and where to find them
  * Stories about taste, preparation, cultural significance
  * Local food customs and etiquette
  * Price ranges and ordering tips

- local_insights: array of 8-10 cultural observations and tips:
  * What surprised you about local life
  * Social customs visitors should know
  * How to connect with locals
  * Cultural mistakes to avoid

- seasonal_secrets: detailed object with:
  * Best times for different experiences (not just weather)
  * Local festivals and events worth timing your visit for
  * Seasonal foods and activities
  * Insider tips for each season

- budget_reality: realistic daily costs with:
  * Actual examples: "Breakfast at local stall: 40 baht, lunch at..."
  * Money-saving tricks locals use
  * Where to splurge vs save
  * Hidden costs tourists don't expect

Make it personal, authentic, and uniquely focused on ${cityData.name.en}. Write like you've lived there for months and want to share the real experience with a close friend.`;

    return this.makeOpenAICall(prompt, 8000);
  }

  // Generate engaging top-10 content with personal stories
  async generateTop10Content(cityName, category) {
    const prompt = `Create an engaging, story-driven top-10 list for ${category} in ${cityName}, Thailand that reads like a friend's personal recommendations. Return JSON only.

Create JSON with:
- title: "10 ${category} in ${cityName} That Locals Actually Love"
- meta_description: SEO-optimized 150-160 character description with personal angle
- intro: 200-300 word personal introduction explaining your connection to ${cityName} and why these ${category} are special
- items: array of exactly 10 items, each with:
  - rank: number (1-10)
  - name: creative, descriptive name (not just "Restaurant X")
  - story: 150-200 word personal story about discovering/experiencing this place
  - why_locals_love_it: what makes locals choose this over tourist spots
  - insider_tips: 2-3 specific practical tips (best times, how to order, what to avoid)
  - price_reality: honest pricing with specific examples
  - location_details: how to actually find it, nearest landmarks
  - personal_moment: a memorable experience or interaction you had there

- local_wisdom: 3-4 insider secrets about ${category} in ${cityName} that guidebooks don't mention
- budget_hacks: specific ways to enjoy ${category} for less money
- cultural_notes: important etiquette or customs related to ${category}

Write like you're sharing secrets with a close friend who's visiting ${cityName}. Include personal anecdotes, specific details, and authentic experiences that make readers feel like insiders.`;

    return this.makeOpenAICall(prompt, 7000);
  }

  // Generate personal, experience-based travel guides
  async generateTravelGuide(cityName, guideType) {
    const prompt = `Create an authentic ${guideType} travel guide for ${cityName}, Thailand based on real experiences and insider knowledge. Write like a friend who specializes in ${guideType} travel and has spent significant time in ${cityName}. Return JSON only.

Guide type: ${guideType}
City: ${cityName}

Create JSON with:
- title: "My ${guideType} Guide to ${cityName}: Real Experiences & Insider Tips"
- meta_description: SEO-optimized 150-160 character description with personal angle
- introduction: 300-400 word personal introduction explaining:
  * Your experience with ${guideType} travel in ${cityName}
  * Why ${cityName} is perfect for ${guideType} travelers
  * What makes this guide different from generic ones
  * A memorable personal story that sets the tone

- day_by_day: array of 3-7 detailed day plans, each with:
  - day_title: creative, experience-focused title
  - morning_story: 200-250 word narrative about morning activities with personal touches
  - afternoon_adventure: 200-250 word story about afternoon experiences
  - evening_magic: 200-250 word description of evening activities
  - real_costs: specific budget breakdown with actual prices
  - insider_moments: unexpected discoveries or local interactions
  - practical_reality: honest challenges and how to handle them

- secret_spots: array of 5-8 places perfect for ${guideType} travelers that others miss:
  * Personal story of discovery
  * Why it suits ${guideType} travel
  * Best times and approach strategies

- money_wisdom: detailed ${guideType} budget strategies with:
  * Specific cost examples from personal experience
  * Where to splurge vs save for ${guideType} travelers
  * Hidden costs and money-saving tricks
  * Real daily spending examples

- cultural_connections: ways to meaningfully connect with local culture during ${guideType} travel:
  * Personal stories of cultural exchanges
  * Respectful approaches and etiquette
  * Language tips and useful phrases

- survival_guide: honest challenges ${guideType} travelers face in ${cityName}:
  * Personal mistakes and lessons learned
  * Problem-solving strategies
  * Emergency tips and backup plans

Write like you're sharing hard-earned wisdom with someone planning the same type of trip. Include specific details, personal anecdotes, and authentic experiences that only come from actually doing ${guideType} travel in ${cityName}.`;

    return this.makeOpenAICall(prompt, 10000);
  }
}

module.exports = OpenAIClient;
