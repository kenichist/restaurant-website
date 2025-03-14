'use client';

import { useState, useEffect, useCallback } from 'react';
import { formatRupiah } from '@/lib/formatRupiah';

export interface MenuSwiperItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients?: string[];
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  available?: boolean;
}

interface MenuSwiperProps {
  items: MenuSwiperItem[];
  onAddToCart: (id: string) => void;
}

const MenuSwiper = ({ items, onAddToCart }: MenuSwiperProps) => {
  // Fallback UI if no items available
  if (!items || items.length === 0) {
    return <div>No items available</div>;
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setAnimationKey(prev => prev + 1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, items.length]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setAnimationKey(prev => prev + 1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, items.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      handleNext();
    }
    if (touchStart - touchEnd < -100) {
      handlePrev();
    }
  };

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
      className="relative overflow-hidden bg-white rounded-xl shadow-xl max-w-[900px] mx-auto"
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
          key={animationKey}
          className={`p-8 md:p-10 flex flex-col md:flex-row gap-8 transition-all duration-500 ${
            direction > 0
              ? 'animate-slide-from-right'
              : direction < 0
              ? 'animate-slide-from-left'
              : ''
          }`}
        >
          {/* Image Section */}
          <div className="relative md:w-1/2 h-64 md:h-80 bg-amber-100 rounded-lg overflow-hidden">
            <img
              src={currentItem.image}
              alt={currentItem.name}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = '/images/default-food.png';
              }}
            />
            {/* Unavailable Overlay */}
            {currentItem.available === false && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  Currently Unavailable
                </span>
              </div>
            )}
            {/* Popular Badge */}
            {currentItem.isPopular && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Popular
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="mb-2 text-amber-600 font-medium">
                {currentItem.category}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-3">
                {currentItem.name}
              </h2>
              <p className="text-amber-700 mb-4">
                {currentItem.description}
              </p>
              {currentItem.ingredients && currentItem.ingredients.length > 0 && (
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Ingredients: </strong>
                  {currentItem.ingredients.join(', ')}
                </div>
              )}
              {/* Badges for Vegetarian and Spicy */}
              <div className="flex flex-wrap gap-2 mb-4">
                {currentItem.isVegetarian && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Vegetarian
                  </span>
                )}
                {currentItem.isSpicy && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    Spicy
                  </span>
                )}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-900 mb-6">
                Rp {formatRupiah(currentItem.price)}
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
      </div>

      <div className="flex justify-center gap-2 p-4">
        {items.map((_, index) => (
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

export default MenuSwiper;
