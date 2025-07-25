'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import AnnouncementBar from './AnnouncementBar';
import { useTranslation } from '../hooks/useTranslation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, locale } = useTranslation('common');

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-thailand-red shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <div className="h-24 w-24 relative transform transition-transform group-hover:scale-110">
                  <Image
                    src="/images/go2thailand-logo-original.webp"
                    alt="Go2Thailand - Your Ultimate Thailand Travel Guide"
                    height={96}
                    width={96}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <Link 
                href="/" 
                className="text-thailand-blue-700 hover:text-thailand-red px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-thailand-red-50 relative group"
              >
                {t('nav.home')}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-thailand-red transition-all duration-300 group-hover:w-full"></div>
              </Link>
              <Link 
                href="/city/" 
                className="text-thailand-blue-700 hover:text-thailand-red px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-thailand-red-50 relative group"
              >
                {t('nav.cities')}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-thailand-red transition-all duration-300 group-hover:w-full"></div>
              </Link>
              {/* Food & Drinks Dropdown */}
              <div className="relative group">
                <button className="text-thailand-blue-700 hover:text-thailand-red px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-thailand-red-50 flex items-center space-x-1 relative">
                  <span>🍜 {t('nav.foodDrinks')}</span>
                  <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-thailand-red transition-all duration-300 group-hover:w-full"></div>
                </button>
                
                <div className="absolute left-0 mt-2 w-full max-w-[14rem] sm:w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-thailand-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="py-2">
                    <Link href="/food/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🍜</span>
                      {t('nav.thaiFood')}
                    </Link>
                    <Link href="/drinks/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🍹</span>
                      {t('nav.thaiDrinks')}
                    </Link>
                    <div className="border-t border-gray-100 my-2"></div>
                    <Link href="/food/category/main-dish/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🍛</span>
                      Main Dishes
                    </Link>
                    <Link href="/food/category/soup/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🍲</span>
                      Soups & Curries
                    </Link>
                    <Link href="/drinks/category/alcohol/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🍺</span>
                      Thai Beers & Spirits
                    </Link>
                    <Link href="/drinks/category/tea/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🫖</span>
                      Thai Teas & Coffee
                    </Link>
                  </div>
                </div>
              </div>

              {/* Travel Needs Dropdown */}
              <div className="relative group">
                <button className="text-thailand-blue-700 hover:text-thailand-red px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-thailand-red-50 flex items-center space-x-1 relative">
                  <span>💼 {t('nav.travelNeeds')}</span>
                  <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-thailand-red transition-all duration-300 group-hover:w-full"></div>
                </button>
                
                <div className="absolute left-0 mt-2 w-full max-w-[14rem] sm:w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-thailand-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="py-2">
                    <Link href="/esim/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">📱</span>
                      {t('nav.esim')}
                    </Link>
                    <Link href="/travel-insurance/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🛡️</span>
                      {t('nav.insurance')}
                    </Link>
                    <Link href="/travel-gear/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🎒</span>
                      {t('nav.gear')}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Plan Your Trip Dropdown */}
              <div className="relative group">
                <button className="text-thailand-blue-700 hover:text-thailand-red px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-thailand-red-50 flex items-center space-x-1 relative">
                  <span>{t('nav.planTrip')}</span>
                  <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-thailand-red transition-all duration-300 group-hover:w-full"></div>
                </button>
                
                <div className="absolute left-0 mt-2 w-full max-w-[14rem] sm:w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-thailand-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="py-2">
                    <Link href="/weather/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🌤️</span>
                      {t('nav.weather')}
                    </Link>
                    <Link href="/transport/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🚌</span>
                      {t('nav.transport')}
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <Link href="/social/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                        <span className="mr-3">📸</span>
                        {t('nav.social')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top 10 Guides Dropdown */}
              <div className="relative group">
                <button className="text-thailand-blue-700 hover:text-thailand-red px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-thailand-red-50 flex items-center space-x-1 relative">
                  <span>🏆 {t('nav.top10')}</span>
                  <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-thailand-red transition-all duration-300 group-hover:w-full"></div>
                </button>
                
                <div className="absolute left-0 mt-2 w-full max-w-[16rem] sm:w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-thailand-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-thailand-blue-500 uppercase tracking-wider border-b border-gray-100">
                      {t('nav.byCategory')}
                    </div>
                    <Link href="/top-10/restaurants/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🍽️</span>
                      {t('nav.restaurantGuides')}
                    </Link>
                    <Link href="/top-10/hotels/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🏨</span>
                      {t('nav.hotelGuides')}
                    </Link>
                    <Link href="/top-10/attractions/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <span className="mr-3">🎯</span>
                      {t('nav.attractionGuides')}
                    </Link>
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <div className="px-4 py-2 text-xs font-semibold text-thailand-blue-500 uppercase tracking-wider">
                        {t('nav.popularCities')}
                      </div>
                      <Link href="/city/bangkok/top-10-restaurants/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                        <span className="mr-3">📍</span>
                        {t('nav.bangkokTop10')}
                      </Link>
                      <Link href="/city/phuket/top-10-hotels/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                        <span className="mr-3">📍</span>
                        {t('nav.phuketTop10')}
                      </Link>
                      <Link href="/city/chiang-mai/top-10-attractions/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                        <span className="mr-3">📍</span>
                        {t('nav.chiangMaiTop10')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Regions Dropdown */}
              <div className="relative group">
                <button className="text-thailand-blue-700 hover:text-thailand-red px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-thailand-red-50 flex items-center space-x-1 relative">
                  <span>{t('nav.regions')}</span>
                  <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-thailand-red transition-all duration-300 group-hover:w-full"></div>
                </button>
                
                <div className="absolute left-0 mt-2 w-full max-w-[14rem] sm:w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-thailand-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="py-2">
                    <Link href="/region/northern/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <div className="w-2 h-2 bg-thailand-red rounded-full mr-3"></div>
                      {t('nav.northernThailand')}
                    </Link>
                    <Link href="/region/central/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <div className="w-2 h-2 bg-thailand-blue rounded-full mr-3"></div>
                      {t('nav.centralThailand')}
                    </Link>
                    <Link href="/region/southern/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <div className="w-2 h-2 bg-thailand-red rounded-full mr-3"></div>
                      {t('nav.southernThailand')}
                    </Link>
                    <Link href="/region/isaan/" className="flex items-center px-4 py-3 text-sm text-thailand-blue-700 hover:bg-gradient-to-r hover:from-thailand-red-50 hover:to-thailand-blue-50 hover:text-thailand-red transition-all duration-200">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {t('nav.isaanNortheast')}
                    </Link>
                  </div>
                </div>
              </div>

              {/* CTA Button and Language Switcher */}
              <div className="ml-2 pl-4 border-l border-thailand-blue-200 flex items-center gap-3">
                <Link 
                  href="/city/" 
                  className="bg-gradient-to-r from-thailand-red to-thailand-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-thailand-red-600 hover:to-thailand-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {t('nav.exploreNow')}
                </Link>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="bg-thailand-blue-50 inline-flex items-center justify-center p-3 rounded-lg text-thailand-blue hover:text-thailand-red hover:bg-thailand-red-50 transition-all duration-300 transform hover:scale-105"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">{t('nav.openMainMenu')}</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-6 space-y-1 bg-gradient-to-b from-thailand-blue-50 to-white rounded-b-xl border-t border-thailand-blue-100 mt-4">
            <Link 
              href="/" 
              className="text-thailand-blue-700 hover:text-thailand-red block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-thailand-red-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🏠 {t('nav.home')}
            </Link>
            <Link 
              href="/city/" 
              className="text-thailand-blue-700 hover:text-thailand-red block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-thailand-red-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🏙️ {t('nav.cities')}
            </Link>
            <div className="border-t border-thailand-blue-100 pt-2 mt-2">
              <div className="px-4 py-2 text-xs font-semibold text-thailand-blue-500 uppercase tracking-wider">🍜 {t('nav.foodDrinks')}</div>
              <Link 
                href="/food/" 
                className="text-thailand-blue-600 hover:text-thailand-red block px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-thailand-red-50 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🍜 {t('nav.thaiFood')}
              </Link>
              <Link 
                href="/drinks/" 
                className="text-thailand-blue-600 hover:text-thailand-red block px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-thailand-red-50 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🍹 {t('nav.thaiDrinks')}
              </Link>
            </div>
            <Link 
              href="/esim/" 
              className="text-thailand-blue-700 hover:text-thailand-red block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-thailand-red-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📱 eSIM
            </Link>
            <Link 
              href="/travel-insurance/" 
              className="text-thailand-blue-700 hover:text-thailand-red block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-thailand-red-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🛡️ {t('nav.insurance')}
            </Link>
            <Link 
              href="/travel-gear/" 
              className="text-thailand-blue-700 hover:text-thailand-red block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-thailand-red-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🎒 {t('nav.gear')}
            </Link>
            <Link 
              href="/weather/" 
              className="text-thailand-blue-700 hover:text-thailand-red block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-thailand-red-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🌤️ {t('nav.weather')}
            </Link>
            <Link 
              href="/transport/" 
              className="text-thailand-blue-700 hover:text-thailand-red block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-thailand-red-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🚌 {t('nav.transport')}
            </Link>
            <Link 
              href="/social/" 
              className="text-thailand-blue-700 hover:text-thailand-red block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-thailand-red-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📸 {t('nav.social')}
            </Link>
            
            <div className="border-t border-thailand-blue-100 pt-2 mt-2">
              <div className="px-4 py-2 text-xs font-semibold text-thailand-blue-500 uppercase tracking-wider">🏆 {t('nav.top10')}</div>
              <Link 
                href="/top-10/restaurants/" 
                className="text-thailand-blue-600 hover:text-thailand-red block px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-thailand-red-50 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🍽️ {t('nav.restaurantGuides')}
              </Link>
              <Link 
                href="/top-10/hotels/" 
                className="text-thailand-blue-600 hover:text-thailand-red block px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-thailand-red-50 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏨 {t('nav.hotelGuides')}
              </Link>
              <Link 
                href="/top-10/attractions/" 
                className="text-thailand-blue-600 hover:text-thailand-red block px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-thailand-red-50 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🎯 {t('nav.attractionGuides')}
              </Link>
            </div>
            
            <div className="border-t border-thailand-blue-100 pt-2 mt-2">
              <div className="px-4 py-2 text-xs font-semibold text-thailand-blue-500 uppercase tracking-wider">{t('nav.regions')}</div>
              <Link 
                href="/region/northern/" 
                className="text-thailand-blue-600 hover:text-thailand-red block px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-thailand-red-50 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏔️ {t('nav.northernThailand')}
              </Link>
              <Link 
                href="/region/central/" 
                className="text-thailand-blue-600 hover:text-thailand-red block px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-thailand-red-50 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏛️ {t('nav.centralThailand')}
              </Link>
              <Link 
                href="/region/southern/" 
                className="text-thailand-blue-600 hover:text-thailand-red block px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-thailand-red-50 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🏖️ {t('nav.southernThailand')}
              </Link>
              <Link 
                href="/region/isaan/" 
                className="text-thailand-blue-600 hover:text-thailand-red block px-4 py-3 rounded-lg text-sm transition-all duration-300 hover:bg-thailand-red-50 ml-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🌾 {t('nav.isaanNortheast')}
              </Link>
            </div>

            <div className="pt-4 mt-4 border-t border-thailand-blue-100">
              <Link 
                href="/city/" 
                className="bg-gradient-to-r from-thailand-red to-thailand-red-600 text-white block px-4 py-3 rounded-lg text-center font-semibold hover:from-thailand-red-600 hover:to-thailand-red-700 transition-all duration-300 shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🚀 {t('nav.exploreThailandNow')}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
};

export default Header;
