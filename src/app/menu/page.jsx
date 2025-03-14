'use client';

import { useState, useEffect } from 'react';
import MenuSwiper from '@/components/animations/MenuSwiper';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/lib/formatRupiah';

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [viewMode, setViewMode] = useState('swipe'); // 'swipe' or 'grid'
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesRes = await fetch('/api/categories');
        const categoriesData = await categoriesRes.json();

        if (!categoriesData.success) {
          throw new Error(categoriesData.message || 'Failed to fetch categories');
        }

        const sortedCategories = categoriesData.data.sort((a, b) => a.order - b.order);
        setCategories(sortedCategories);

        // Set active category to first one if available
        if (sortedCategories.length > 0) {
          setActiveCategory(sortedCategories[0]._id);
        }

        // Fetch all menu items
        const menuItemsRes = await fetch('/api/menu-items');
        const menuItemsData = await menuItemsRes.json();

        if (!menuItemsData.success) {
          throw new Error(menuItemsData.message || 'Failed to fetch menu items');
        }

        setMenuItems(menuItemsData.data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter menu items by active category; if activeCategory is null, show all items
  const filteredMenuItems = activeCategory
    ? menuItems.filter(item => item.category._id === activeCategory)
    : menuItems;

  // Map filtered items for the swipe view including ingredients
  const swiperItems = filteredMenuItems.map(item => ({
    id: item._id,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image || '/images/default-food.png',
    category: item.category.name,
    ingredients: item.ingredients,
    isPopular: item.isPopular,
    isVegetarian: item.isVegetarian,
    isSpicy: item.isSpicy,
    available: item.available,
  }));


  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading menu...</p>
          </div>
        ) : (
          <>
            {/* Category Navigation */}
            <div className="flex flex-wrap justify-center mb-8">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 m-1 rounded-full transition-colors ${
                  activeCategory === null
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category._id}
                  onClick={() => setActiveCategory(category._id)}
                  className={`px-4 py-2 m-1 rounded-full transition-colors ${
                    activeCategory === category._id
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setViewMode('swipe')}
                className={`px-4 py-2 m-1 rounded-full transition-colors ${
                  viewMode === 'swipe'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Swipe View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 m-1 rounded-full transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Grid View
              </button>
            </div>

            {filteredMenuItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No menu items found in this category.</p>
              </div>
            ) : viewMode === 'swipe' ? (
              // Render the interactive swipe view
              <MenuSwiper
                items={swiperItems}
                onAddToCart={(itemId) => {
                  const item = menuItems.find(it => it._id === itemId);
                  if (item) addToCart(item);
                }}
              />
            ) : (
              // Render the grid view
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.map(item => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-48 bg-gray-200 relative">
                      <img
                        src={item.image || '/images/default-food.png'}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/default-food.png';
                        }}
                      />
                      {!item.available && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            Currently Unavailable
                          </span>
                        </div>
                      )}
                      {item.isPopular && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          Popular
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <span className="text-amber-600 font-bold">
                          Rp {formatRupiah(item.price)}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      {item.ingredients && item.ingredients.length > 0 && (
                        <div className="text-xs text-gray-500 mt-2">
                          <span className="font-semibold">Ingredients:</span>{' '}
                          {item.ingredients.join(', ')}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.isVegetarian && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Vegetarian
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Spicy
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(item)}
                        disabled={!item.available}
                        className={`mt-4 w-full py-2 font-bold rounded-lg transition-colors ${
                          item.available
                            ? 'bg-amber-600 text-white hover:bg-amber-700'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        {item.available ? 'Add to Cart' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-auto py-10"></div>
    </div>
  );
}
