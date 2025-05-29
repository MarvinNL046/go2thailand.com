import { NextApiRequest, NextApiResponse } from 'next';
import { getAllCities } from '../../../lib/cities';
import { getAllDishes } from '../../../lib/food';
import { getAllAttractions } from '../../../lib/sitemap';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query;
  
  // Security: Add your n8n webhook key
  const authKey = req.headers['x-webhook-key'];
  if (authKey !== process.env.N8N_WEBHOOK_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    let posts = [];

    switch (type) {
      case 'food':
        const dishes = getAllDishes();
        posts = dishes.slice(0, 10).map((dish: any) => ({
          id: `food-${dish.id}`,
          type: 'food',
          title: dish.name.en,
          caption: {
            default: `🍜 ${dish.name.en} - Authentic ${dish.category} from ${dish.region} Thailand! ${dish.spice_level !== 'none' ? `🌶️ Spice level: ${dish.spice_level}` : ''}`,
            facebook: `🍜 ${dish.name.en.toUpperCase()} - ${dish.name.thai}\n\nExperience authentic Thai flavors with this ${dish.category}!\n\n📍 Region: ${dish.region}\n🌶️ Spice Level: ${dish.spice_level}\n💰 Price: ${dish.price_range}\n⏱️ Prep Time: ${dish.preparation_time}\n\nDiscover the authentic recipe and where to find the best ${dish.name.en} in Thailand!`,
            instagram: `🍜 ${dish.name.en.toUpperCase()} 🇹🇭\n\n${dish.name.thai}\n\n🌶️ Spice: ${dish.spice_level}\n📍 ${dish.region} specialty\n💰 ${dish.price_range}\n\n✨ Swipe up for recipe!`
          },
          imageUrl: dish.image,
          link: `/food/${dish.slug}/`,
          hashtags: [
            `#${dish.name.en.replace(/\s+/g, '')}`,
            '#ThaiFood',
            '#AuthenticThai',
            `#${dish.region}Food`,
            '#ThailandEats',
            '#FoodieTravel',
            '#Go2Thailand'
          ],
          location: `${dish.region}, Thailand`
        }));
        break;

      case 'city':
        const cities = getAllCities();
        posts = cities.slice(0, 10).map((city: any) => ({
          id: `city-${city.id}`,
          type: 'city',
          title: `${city.name} - ${city.tagline}`,
          caption: {
            default: `🏙️ ${city.name}: ${city.description}`,
            facebook: `🏙️ ${city.name.toUpperCase()} - ${city.tagline} 🇹🇭\n\n${city.description}\n\n✨ Highlights:\n${city.highlights.slice(0, 5).map(h => `• ${h}`).join('\n')}\n\n📍 Region: ${city.region}\n🌡️ Best Time: ${city.bestTime}\n\nPlan your perfect ${city.name} adventure with our complete city guide!`,
            instagram: `🏙️ ${city.name.toUpperCase()} 🇹🇭\n\n${city.tagline}\n\n✨ Must-do:\n${city.highlights.slice(0, 3).map(h => `• ${h}`).join('\n')}\n\n📍 ${city.region}\n🌡️ Visit: ${city.bestTime}`
          },
          imageUrl: city.image,
          link: `/city/${city.slug}/`,
          hashtags: [
            `#${city.name.replace(/\s+/g, '')}`,
            '#ThailandTravel',
            `#${city.region}Thailand`,
            '#TravelGuide',
            '#ExploreThailand',
            '#Go2Thailand'
          ],
          location: city.name + ', Thailand'
        }));
        break;

      case 'attraction':
        const attractions = getAllAttractions();
        posts = attractions.slice(0, 20).map((attr: any) => ({
          id: `attr-${attr.slug}`,
          type: 'attraction',
          title: attr.name,
          caption: {
            default: `🏛️ ${attr.name} in ${attr.city}. A must-visit attraction in Thailand!`,
            facebook: `🏛️ ${attr.name} - ${attr.city} 🇹🇭\n\nDiscover one of Thailand's most incredible attractions!\n\n📍 Location: ${attr.city}\n⏰ Best time to visit: Early morning or late afternoon\n\nExplore our complete guide with insider tips, best photo spots, and how to avoid the crowds!`,
            instagram: `🏛️ ${attr.name} 📸\n\n📍 ${attr.city}, Thailand\n\n✨ Insider tip: Visit early morning for best photos!\n\nTap link in bio for complete guide!`
          },
          imageUrl: `/images/attractions/${attr.city}/${attr.slug}.jpg`,
          link: `/city/${attr.city}/attractions/${attr.slug}/`,
          hashtags: [
            `#${attr.name.replace(/\s+/g, '')}`,
            `#${attr.city}Attractions`,
            '#ThailandTravel',
            '#MustVisit',
            '#TravelThailand',
            '#Go2Thailand'
          ],
          location: `${attr.city}, Thailand`
        }));
        break;

      case 'beach':
        // Beach-specific posts from your top attractions
        posts = [
          {
            id: 'beach-railay',
            type: 'beach',
            title: 'Railay Beach - Hidden Paradise',
            caption: {
              default: '🏝️ Railay Beach: Only accessible by boat, featuring limestone cliffs and crystal-clear water!',
              facebook: '🏝️ RAILAY BEACH - Krabi\'s Hidden Gem! 🚤\n\nOnly accessible by longtail boat, this peninsula paradise is worth the journey!\n\n✨ 4 stunning beaches\n🧗‍♀️ World-class rock climbing\n🌅 Incredible sunsets\n\n📍 Boats from Ao Nang: 100 THB\n\nDiscover why Railay is Thailand\'s most unique beach destination!',
              instagram: '🏝️ RAILAY BEACH 🚤\n\nOnly by boat! 🇹🇭\n\n📸 4 beaches\n🧗‍♀️ Rock climbing\n🌅 Sunset magic\n\n📍 Krabi, Thailand'
            },
            imageUrl: '/images/homepageHero/railayBeach.webp',
            link: '/city/krabi/attractions/railay-beach/',
            hashtags: ['#RailayBeach', '#Krabi', '#ThailandBeaches', '#IslandParadise', '#HiddenGem', '#Go2Thailand'],
            location: 'Railay, Krabi'
          }
          // Add more beach posts...
        ];
        break;

      default:
        return res.status(400).json({ error: 'Invalid content type' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}