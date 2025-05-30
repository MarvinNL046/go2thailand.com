import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import EzoicAd from '../components/EzoicAd';
import { EZOIC_AD_UNITS } from '../lib/ads/ezoic-config';

interface SocialPost {
  id: string;
  type: 'food' | 'city' | 'beach' | 'temple' | 'attraction' | 'culture';
  title: string;
  excerpt: string;
  imageUrl: string;
  link: string;
  hashtags: string[];
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface SocialPageProps {
  featuredPosts: SocialPost[];
  recentPosts: SocialPost[];
}

export default function SocialPage({ featuredPosts, recentPosts }: SocialPageProps) {
  const [filter, setFilter] = useState<string>('all');
  
  const categories = [
    { id: 'all', label: 'All Posts', emoji: '✨' },
    { id: 'food', label: 'Thai Food', emoji: '🍜' },
    { id: 'city', label: 'Cities', emoji: '🏙️' },
    { id: 'beach', label: 'Beaches', emoji: '🏖️' },
    { id: 'temple', label: 'Temples', emoji: '🛕' },
    { id: 'attraction', label: 'Attractions', emoji: '🎯' },
    { id: 'culture', label: 'Culture', emoji: '🎭' }
  ];

  const filteredPosts = filter === 'all' 
    ? recentPosts 
    : recentPosts.filter(post => post.type === filter);

  const getTypeColor = (type: string) => {
    const colors = {
      food: 'bg-orange-100 text-orange-800',
      city: 'bg-blue-100 text-blue-800',
      beach: 'bg-cyan-100 text-cyan-800',
      temple: 'bg-purple-100 text-purple-800',
      attraction: 'bg-green-100 text-green-800',
      culture: 'bg-pink-100 text-pink-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Head>
        <title>Go2Thailand on Social Media | Follow Our Journey</title>
        <meta name="description" content="Follow Go2Thailand on Facebook and Instagram for daily travel inspiration, Thai food discoveries, and insider tips for exploring the Land of Smiles!" />
        <meta name="keywords" content="Go2Thailand social media, Thailand travel Instagram, Thailand Facebook, travel inspiration, Thai food posts" />
        <link rel="canonical" href="https://go2-thailand.com/social/" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Follow Our Thailand Journey
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Daily inspiration from the Land of Smiles - food, beaches, temples, and adventures!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://facebook.com/go2thailand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-blue px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                <a 
                  href="https://instagram.com/go2thailand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-red px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Featured Posts
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {featuredPosts.map((post) => (
                <Link key={post.id} href={post.link} className="group">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(post.type)}`}>
                          {categories.find(c => c.id === post.type)?.emoji} {post.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-thailand-blue transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <span>❤️ {post.engagement.likes}</span>
                          <span>💬 {post.engagement.comments}</span>
                          <span>🔄 {post.engagement.shares}</span>
                        </div>
                        <span className="text-thailand-blue font-medium">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 💰 SOCIAL MEDIA AD */}
            <div className="mb-12">
              <EzoicAd 
                placementId={137}
                size="rectangle"
                className="mx-auto"
                lazy={true}
              />
            </div>

            {/* Filter Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filter === category.id
                        ? 'bg-thailand-blue text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.emoji} {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={post.link} className="group">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white text-sm font-medium line-clamp-2">
                            {post.title}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-medium ${getTypeColor(post.type)} px-2 py-1 rounded`}>
                          {post.type}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>❤️ {post.engagement.likes}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Social Feed Widget */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Live from Our Social Channels
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our community of Thailand lovers! Share your own adventures with #Go2Thailand
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Facebook Embed */}
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="font-semibold mb-4 flex items-center justify-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Follow on Facebook
                </h3>
                <p className="text-gray-600 mb-4">
                  Daily travel tips, live Q&As, and community discussions
                </p>
                <a 
                  href="https://facebook.com/go2thailand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Like Our Page
                </a>
              </div>

              {/* Instagram Embed */}
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <h3 className="font-semibold mb-4 flex items-center justify-center gap-2">
                  <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                  </svg>
                  Follow on Instagram
                </h3>
                <p className="text-gray-600 mb-4">
                  Stunning photos, stories, and reels from around Thailand
                </p>
                <a 
                  href="https://instagram.com/go2thailand" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  Follow Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-thailand-gold to-thailand-blue text-white section-padding">
          <div className="container-custom text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Start Planning Your Thailand Adventure
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              From social inspiration to real exploration - discover everything Thailand has to offer
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/city/" className="bg-white text-thailand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Cities
              </Link>
              <Link href="/food/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-thailand-blue transition-colors">
                Discover Food
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Fetch real social media data from API or database
  // For now, using sample data
  
  const featuredPosts: SocialPost[] = [
    {
      id: 'feat-1',
      type: 'beach',
      title: 'Hidden Paradise: Secret Beach in Koh Phangan',
      excerpt: 'Discovered this untouched beach after a 30-minute jungle hike. Crystal clear water, no crowds, pure bliss!',
      imageUrl: '/images/homepageHero/railayBeach.webp',
      link: '/city/krabi/attractions/railay-beach/',
      hashtags: ['#SecretBeach', '#KohPhangan', '#HiddenGems'],
      engagement: { likes: 1243, comments: 89, shares: 234 }
    },
    {
      id: 'feat-2',
      type: 'food',
      title: 'Best Pad Thai in Bangkok - 70 Year Old Recipe!',
      excerpt: 'Found the ultimate Pad Thai at a tiny street stall in Chinatown. The wok hei flavor is incredible!',
      imageUrl: '/images/food/pad-thai.webp',
      link: '/food/pad-thai/',
      hashtags: ['#PadThai', '#BangkokEats', '#StreetFood'],
      engagement: { likes: 2156, comments: 156, shares: 412 }
    },
    {
      id: 'feat-3',
      type: 'temple',
      title: 'Sunrise at Doi Suthep - Worth the Early Wake Up',
      excerpt: 'Watching the sun rise over Chiang Mai from this sacred temple. The monks chanting added pure magic to the moment.',
      imageUrl: '/images/cities/chiangmai/chiang-mai-park.webp',
      link: '/city/chiang-mai/attractions/doi-suthep/',
      hashtags: ['#DoiSuthep', '#ChiangMai', '#TempleSunrise'],
      engagement: { likes: 3421, comments: 234, shares: 567 }
    }
  ];

  const recentPosts: SocialPost[] = [
    {
      id: 'post-1',
      type: 'city',
      title: 'Bangkok Rooftop Bar Guide',
      excerpt: 'Top 5 rooftop bars with the best sunset views',
      imageUrl: '/images/cities/bangkok/downtown-bangkok.webp',
      link: '/city/bangkok/',
      hashtags: ['#Bangkok', '#RooftopBar'],
      engagement: { likes: 876, comments: 45, shares: 123 }
    },
    {
      id: 'post-2',
      type: 'food',
      title: 'Tom Yum Soup Masterclass',
      excerpt: 'Learning to make authentic Tom Yum from a local chef',
      imageUrl: '/images/food/tom-yum-goong.webp',
      link: '/food/tom-yum-goong/',
      hashtags: ['#TomYum', '#ThaiCooking'],
      engagement: { likes: 654, comments: 32, shares: 87 }
    },
    {
      id: 'post-3',
      type: 'beach',
      title: 'Phi Phi Islands Day Trip',
      excerpt: 'Maya Bay is finally open again and it\'s stunning!',
      imageUrl: '/images/homepageHero/lao-landing-beach.webp',
      link: '/city/phuket/attractions/phi-phi-islands/',
      hashtags: ['#PhiPhi', '#MayaBay'],
      engagement: { likes: 1432, comments: 78, shares: 234 }
    },
    {
      id: 'post-4',
      type: 'culture',
      title: 'Songkran Festival Prep',
      excerpt: 'Getting ready for the world\'s biggest water fight!',
      imageUrl: '/images/food/street-food.webp',
      link: '/city/bangkok/',
      hashtags: ['#Songkran', '#ThaiNewYear'],
      engagement: { likes: 987, comments: 56, shares: 178 }
    },
    {
      id: 'post-5',
      type: 'attraction',
      title: 'Ayutthaya Day Trip',
      excerpt: 'Exploring ancient temple ruins just 1 hour from Bangkok',
      imageUrl: '/images/cities/ayutthaya/ayutthaya-historical-park.webp',
      link: '/city/ayutthaya/',
      hashtags: ['#Ayutthaya', '#DayTrip'],
      engagement: { likes: 765, comments: 34, shares: 98 }
    },
    {
      id: 'post-6',
      type: 'food',
      title: 'Mango Sticky Rice Season',
      excerpt: 'It\'s mango season! Finding the best khao niao mamuang',
      imageUrl: '/images/food/mango-sticky-rice.webp',
      link: '/food/mango-sticky-rice/',
      hashtags: ['#MangoStickyRice', '#ThaiDessert'],
      engagement: { likes: 543, comments: 23, shares: 67 }
    },
    {
      id: 'post-7',
      type: 'temple',
      title: 'White Temple Wonder',
      excerpt: 'Wat Rong Khun is even more impressive in person!',
      imageUrl: '/images/cities/chiang-rai/chiang-rai-temple-front.webp',
      link: '/city/chiang-rai/attractions/white-temple/',
      hashtags: ['#WhiteTemple', '#ChiangRai'],
      engagement: { likes: 1876, comments: 92, shares: 312 }
    },
    {
      id: 'post-8',
      type: 'city',
      title: 'Phuket Old Town Walk',
      excerpt: 'Colorful Sino-Portuguese architecture everywhere!',
      imageUrl: '/images/cities/phuket/phuket-old-town.webp',
      link: '/city/phuket/',
      hashtags: ['#PhuketOldTown', '#Architecture'],
      engagement: { likes: 432, comments: 19, shares: 54 }
    }
  ];

  return {
    props: {
      featuredPosts,
      recentPosts
    }
  };
};