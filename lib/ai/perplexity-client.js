require('dotenv').config({ path: '.env.local' });

class PerplexityClient {
  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY;
    this.baseUrl = 'https://api.perplexity.ai';
    
    if (!this.apiKey) {
      console.warn('⚠️  Perplexity API key not found in environment variables');
    }
  }

  // Query templates for different categories
  getQueryTemplate(cityName, category) {
    const templates = {
      restaurants: `Top 10 best restaurants in ${cityName}, Thailand in 2025. Include for each: current prices in Thai Baht, opening hours, exact location/address, recent reviews or ratings, specialties/signature dishes, any new openings in 2024-2025. Focus on authentic local favorites and highly rated establishments.`,
      
      hotels: `Top 10 hotels in ${cityName}, Thailand in 2025. Include for each: current price ranges in Thai Baht, key amenities, exact location, recent guest reviews, booking availability trends, what makes each unique. Mix of budget, mid-range, and luxury options.`,
      
      attractions: `Top 10 attractions and activities in ${cityName}, Thailand in 2025. Include for each: current entrance fees in Thai Baht, opening hours, exact location, seasonal information, any new attractions opened in 2024-2025, visitor tips, what makes each special.`
    };

    return templates[category] || templates.attractions;
  }

  // Get current data from Perplexity API
  async getCurrentData(cityName, category) {
    try {
      console.log(`🔍 Querying Perplexity API for ${category} in ${cityName}...`);
      
      const query = this.getQueryTemplate(cityName, category);
      
      // Use direct API call to Perplexity
      const response = await this.callPerplexityAPI(query);
      
      if (response.error) {
        console.log(`⚠️  Perplexity API error: ${response.error}`);
        return { error: response.error, fallback: true };
      }

      console.log(`✅ Perplexity data received for ${cityName} ${category}`);
      return {
        query: query,
        response: response,
        timestamp: new Date().toISOString(),
        city: cityName,
        category: category
      };

    } catch (error) {
      console.error(`❌ Perplexity client error:`, error.message);
      return { error: error.message, fallback: true };
    }
  }

  // Direct API call to Perplexity
  async callPerplexityAPI(query) {
    try {
      console.log(`📡 Perplexity API Call: ${query.substring(0, 100)}...`);
      
      if (!this.apiKey) {
        console.log(`⚠️  No Perplexity API key, using fallback mode`);
        return {
          content: this.createFallbackContent(query),
          sources: ["fallback"],
          timestamp: new Date().toISOString(),
          fallback: true
        };
      }

      const requestBody = {
        model: "llama-3.1-sonar-small-128k-online",
        messages: [
          {
            role: "system",
            content: "Be precise and specific. Provide accurate, current information with exact details like prices, locations, and hours. Focus on practical information that travelers need."
          },
          {
            role: "user",
            content: query
          }
        ],
        max_tokens: 2000,
        temperature: 0.2,
        top_p: 0.9,
        return_citations: true,
        search_domain_filter: ["tripadvisor.com", "booking.com", "agoda.com", "timeout.com"],
        return_images: false,
        return_related_questions: false,
        search_recency_filter: "month",
        top_k: 0,
        stream: false,
        presence_penalty: 0,
        frequency_penalty: 1
      };

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      const content = data.choices?.[0]?.message?.content || '';
      const citations = data.citations || [];
      
      return {
        content: content,
        sources: citations.length > 0 ? citations : ["perplexity.ai"],
        timestamp: new Date().toISOString(),
        raw_response: data,
        model: requestBody.model
      };

    } catch (error) {
      console.error('Perplexity API call failed:', error);
      
      // Fallback to mock data if API fails
      console.log(`⚠️  API failed, using fallback content`);
      return {
        content: this.createFallbackContent(query),
        sources: ["fallback"],
        timestamp: new Date().toISOString(),
        fallback: true,
        error: error.message
      };
    }
  }

  // Create realistic fallback content for testing
  createFallbackContent(query) {
    const cityMatch = query.match(/restaurants in (\w+)/i) || query.match(/hotels in (\w+)/i) || query.match(/attractions in (\w+)/i);
    const city = cityMatch ? cityMatch[1] : 'Bangkok';
    
    if (query.includes('restaurants')) {
      return `Top restaurants in ${city} (2025):
1. Gaggan Anand - Modern Indian cuisine, 3000-5000 THB per person, 68/1 Soi Langsuan
2. Le Du - Contemporary Thai, 2500-4000 THB per person, 399/3 Silom Rd
3. Sorn - Southern Thai cuisine, 3500-5000 THB per person, 56 Sukhumvit 26
4. 80/20 - Farm-to-table, 1500-2500 THB per person, 1052-1054 Charoen Krung Rd
5. Paste - Traditional Thai techniques, 2000-3500 THB per person, Gaysorn Village
6. Street food at Chatuchak Market - 50-150 THB per dish, Chatuchak Weekend Market
7. Jay Fai - Michelin starred street food, 800-1500 THB per person, 327 Maha Chai Rd
8. Krua Apsorn - Traditional Thai, 300-800 THB per person, 503-505 Samsen Rd
9. Supanniga Eating Room - Regional Thai, 500-1200 THB per person, Tha Tien Pier
10. Err Urban Rustic Thai - Modern rustic, 800-1500 THB per person, 394/35 Maharaj Rd`;
    }
    
    if (query.includes('hotels')) {
      return `Top hotels in ${city} (2025):
1. The Siam - Luxury heritage hotel, 8000-15000 THB per night, Dusit District
2. Mandarin Oriental - Riverside luxury, 7000-12000 THB per night, 48 Oriental Ave
3. The Sukhothai - Urban oasis, 4000-8000 THB per night, 13/3 S Sathon Rd
4. Hotel Muse - Boutique luxury, 3000-6000 THB per night, 55/555 Langsuan Rd
5. Riva Surya - Riverside boutique, 2500-4500 THB per night, 23 Phra Arthit Rd
6. The Yard Hostel - Creative space, 800-2000 THB per night, Ari District
7. Chatrium Hotel Riverside - River views, 3500-6500 THB per night, 28 Charoen Krung Rd
8. Amara Bangkok - Modern comfort, 2200-4000 THB per night, 180/1 Surawong Rd
9. The Okura Prestige - Japanese luxury, 5000-9000 THB per night, 57 Wireless Rd
10. Praya Palazzo - Historic charm, 2800-5000 THB per night, 757/1 Somdej Phra Pinklao Rd`;
    }
    
    if (query.includes('attractions')) {
      return `Top attractions in ${city} (2025):
1. Grand Palace - Royal complex, 500 THB entrance, 8:30-15:30 daily, Phra Nakhon District
2. Wat Pho - Temple of Reclining Buddha, 200 THB entrance, 8:00-18:30 daily
3. Wat Arun - Temple of Dawn, 100 THB entrance, 8:00-18:00 daily, Thonburi side
4. Chatuchak Weekend Market - Shopping paradise, Free entry, Weekends 9:00-18:00
5. Jim Thompson House - Silk museum, 200 THB entrance, 9:00-18:00 daily
6. Khao San Road - Backpacker hub, Free access, 24/7, Phra Nakhon District
7. Lumpini Park - Green oasis, Free entry, 4:30-21:00 daily, Pathumwan District
8. Damnoen Saduak Floating Market - Traditional market, 100 THB boat ride, 6:00-14:00
9. Bangkok National Museum - Cultural heritage, 200 THB entrance, Wed-Sun 9:00-16:00
10. Siam Paragon - Shopping mall, Free entry, 10:00-22:00 daily, BTS Siam Station`;
    }
    
    return `Fallback content for: ${query}`;
  }

  // Parse Perplexity response into structured data
  parsePerplexityResponse(response, category) {
    try {
      // This would parse the actual Perplexity response into our structured format
      // For now, return a basic structure
      return {
        items: [],
        metadata: {
          source: 'perplexity',
          query: response.query || '',
          timestamp: response.timestamp || new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Failed to parse Perplexity response:', error);
      return { error: error.message };
    }
  }
}

module.exports = PerplexityClient;
