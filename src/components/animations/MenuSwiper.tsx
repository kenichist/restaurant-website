'use client';

import { useEffect, useState, useCallback } from 'react';

// Define types for menu items and props
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MenuSwiperProps {
  items: MenuItem[];
  onAddToCart: (itemId: number) => void;
}

export const MenuSwiper = ({ items, onAddToCart }: MenuSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationKey, setAnimationKey] = useState<number>(0); // Add key to force re-render

  // Use useCallback to memoize these functions to avoid recreation on each render
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(1);
    setAnimationKey(prev => prev + 1); // Increment key to force animation
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with CSS transition duration
  }, [isAnimating, items.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection(-1);
    setAnimationKey(prev => prev + 1); // Increment key to force animation
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with CSS transition duration
  }, [isAnimating, items.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      handleNext();
    }

    if (touchStart - touchEnd < -100) {
      // Swipe right
      handlePrev();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentItem = items[currentIndex];

  return (
    <div 
      className="relative overflow-hidden bg-white rounded-xl shadow-xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
        <button 
          onClick={handlePrev}
          className="bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-700 transition-colors"
          aria-label="Previous item"
        >
          ←
        </button>
      </div>
      
      <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
        <button 
          onClick={handleNext}
          className="bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-amber-700 transition-colors"
          aria-label="Next item"
        >
          →
        </button>
      </div>
      
      <div className="w-full">
        <div 
          key={animationKey} // Add key to force re-render and animation
          className={`p-6 md:p-8 flex flex-col md:flex-row gap-8 transition-all duration-500 ${
            direction > 0 
              ? 'animate-slide-from-right' 
              : direction < 0 
                ? 'animate-slide-from-left' 
                : ''
          }`}
        >
          <div className="md:w-1/2 h-64 md:h-80 bg-amber-100 rounded-lg overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-amber-400 text-lg">
              {/* Placeholder for image */}
              [Image: {currentItem.name}]
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="mb-2 text-amber-600 font-medium">
              {currentItem.category}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-3">
              {currentItem.name}
            </h2>
            <p className="text-amber-700 mb-4">
              {currentItem.description}
            </p>
            <div className="text-2xl font-bold text-amber-900 mb-6">
              ${currentItem.price.toFixed(2)}
            </div>
            
            <button
              onClick={() => onAddToCart(currentItem.id)}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-2 p-4">
        {items.map((_: MenuItem, index: number) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-amber-600' : 'bg-amber-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
