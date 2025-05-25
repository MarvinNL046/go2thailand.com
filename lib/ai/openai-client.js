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
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.rateLimiter = new RateLimiter(8); // Conservative 8 requests per minute
  }

  // Helper: OpenAI API call with rate limiting
  async makeOpenAICall(prompt, maxTokens = 4000) {
    try {
      await this.rateLimiter.waitForTokens(prompt.length);
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a strict and accurate assistant that MUST only return JSON. Add NO explanation or text outside the JSON structure. Be precise, factual, and helpful for Thailand travel content."
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

  // Enhance city description
  async enhanceCityDescription(cityData) {
    const prompt = `Enhance this Thailand city data with rich, detailed content. Return JSON only.

Current city: ${cityData.name.en}
Region: ${cityData.region}
Current description: ${cityData.description.en}
Current highlights: ${JSON.stringify(cityData.highlights)}

Create enhanced JSON with:
- enhanced_description: 250-300 word engaging description
- top_attractions: array of 8-12 detailed attractions with descriptions
- top_restaurants: array of 6-8 restaurants with cuisine types and descriptions  
- top_hotels: array of 5-7 hotels with price ranges and descriptions
- travel_tips: array of 5-6 practical travel tips
- best_time_to_visit: object with season, weather, and reasons
- budget_info: object with daily_budget ranges (budget/mid/luxury)

Keep it factual and tourism-focused for ${cityData.name.en}, Thailand.`;

    return this.makeOpenAICall(prompt, 6000);
  }

  // Generate top-10 content for specific categories
  async generateTop10Content(cityName, category) {
    const prompt = `Generate a detailed top-10 list for ${category} in ${cityName}, Thailand. Return JSON only.

Create JSON with:
- title: "Top 10 ${category} in ${cityName}"
- meta_description: SEO-optimized 150-160 character description
- intro: 2-3 sentence introduction
- items: array of exactly 10 items, each with:
  - rank: number (1-10)
  - name: item name
  - description: 50-80 word description
  - location: area/district if applicable
  - price_range: budget estimate where applicable
  - highlights: array of 2-3 key features

Categories: attractions, restaurants, hotels, activities, shopping, nightlife
Make it practical and tourism-focused for ${cityName}, Thailand.`;

    return this.makeOpenAICall(prompt, 5000);
  }

  // Generate travel guide content
  async generateTravelGuide(cityName, guideType) {
    const prompt = `Create a comprehensive ${guideType} travel guide for ${cityName}, Thailand. Return JSON only.

Guide type: ${guideType}
City: ${cityName}

Create JSON with:
- title: "${guideType} Guide to ${cityName}"
- meta_description: SEO-optimized 150-160 character description
- introduction: 100-150 word guide introduction
- sections: array of 5-7 guide sections, each with:
  - section_title: descriptive title
  - content: 100-150 word detailed content
  - tips: array of 2-3 practical tips
- essential_info: object with:
  - duration: recommended stay duration
  - best_for: who this guide suits
  - budget_estimate: daily cost estimates
  - must_know: array of 3-4 essential facts

Guide types: budget, luxury, family, solo, cultural, adventure
Make it actionable and specific to ${cityName}, Thailand.`;

    return this.makeOpenAICall(prompt, 6000);
  }
}

module.exports = OpenAIClient;
