'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewMenuItemPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '/images/default-food.png',
    isVegetarian: false,
    isSpicy: false,
    isPopular: false,
    ingredients: '',
    available: true,
    order: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch categories');
        }

        setCategories(data.data);
        
        // Set default category if available
        if (data.data.length > 0) {
          setFormData(prev => ({
            ...prev,
            category: data.data[0]._id
          }));
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' 
        ? checked 
        : name === 'price' 
          ? parseFloat(value) || '' 
          : name === 'order' 
            ? parseInt(value, 10) 
            : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Format ingredients as array
    const formattedData = {
      ...formData,
      ingredients: formData.ingredients ? formData.ingredients.split(',').map(i => i.trim()) : []
    };

    try {
      const res = await fetch('/api/menu-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to create menu item');
      }

      // Redirect to admin page
      router.push('/admin');
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Menu Item</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {categories.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Warning: You need to create at least one category before adding menu items.
          <Link href="/admin/categories/new" className="ml-2 underline">
            Create a category
          </Link>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Item Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Price ($) *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={categories.length === 0}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {categories.length === 0 ? (
              <option value="">No categories available</option>
            ) : (
              categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-gray-600 text-xs mt-1">
            Enter a URL for the menu item image
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">
            Ingredients
          </label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <p className="text-gray-600 text-xs mt-1">
            Comma-separated list of ingredients
          </p>
        </div>

        <div className="mb-4">
          <label htmlFor="order" className="block text-gray-700 text-sm font-bold mb-2">
            Display Order
          </label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="0"
          />
          <p className="text-gray-600 text-xs mt-1">
            Items with lower numbers will appear first
          </p>
        </div>

        <div className="mb-6 flex flex-wrap">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isVegetarian"
                checked={formData.isVegetarian}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700">Vegetarian</span>
            </label>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isSpicy"
                checked={formData.isSpicy}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700">Spicy</span>
            </label>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-gray-700">Popular</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-gray-700">Available</span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={saving || categories.length === 0}
            className={`bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              (saving || categories.length === 0) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {saving ? 'Creating...' : 'Create Menu Item'}
          </button>
          <Link
            href="/admin"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
