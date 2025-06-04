import { useState } from 'react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-thailand-red to-thailand-red-600 text-white py-2 px-4 text-center relative">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm md:text-base font-medium">
          🎉 New content added regularly! Check back often for the latest Thailand travel guides and tips! 🌴
        </p>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
        aria-label="Close announcement"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default AnnouncementBar;