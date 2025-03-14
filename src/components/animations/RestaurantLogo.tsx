'use client';

import { useEffect, useState } from 'react';

export const RestaurantLogo = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`w-40 h-40 md:w-56 md:h-56 mx-auto relative transition-all duration-800 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
      <div 
        className={`absolute inset-0 bg-amber-500 rounded-full transition-all duration-600 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
      />
      <div 
        className={`absolute inset-4 bg-white rounded-full flex items-center justify-center transition-all duration-600 delay-400 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
      >
        <div 
          className={`text-4xl md:text-6xl font-bold text-amber-600 transition-opacity duration-400 delay-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          SD
        </div>
      </div>
      <div
        className={`absolute -bottom-2 -right-2 w-12 h-12 md:w-16 md:h-16 bg-amber-700 rounded-full transition-all duration-500 delay-600 ${isVisible ? 'opacity-100 scale-100 translate-x-0 translate-y-0' : 'opacity-0 scale-0 translate-x-5 translate-y-5'}`}
      />
    </div>
  );
};
