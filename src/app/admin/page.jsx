'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        
        setCategories(categoriesData.data);
        
        // Fetch menu items
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

  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete category');
      }
      
      // Update categories state
      setCategories(categories.filter(category => category._id !== id));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleDeleteMenuItem = async (id) => {
    if (!confirm('Are you sure you want to delete this menu item? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`/api/menu-items/${id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to delete menu item');
      }
      
      // Update menu items state
      setMenuItems(menuItems.filter(item => item._id !== id));
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Menu Administration</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      <div className="flex mb-6">
        <button
          className={`px-4 py-2 mr-2 rounded-t-lg ${
            activeTab === 'categories' 
              ? 'bg-amber-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg ${
            activeTab === 'menuItems' 
              ? 'bg-amber-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('menuItems')}
        >
          Menu Items
        </button>
      </div>
      
      <div className="mb-4 flex justify-end">
        <Link 
          href={activeTab === 'categories' ? '/admin/categories/new' : '/admin/menu-items/new'}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add New {activeTab === 'categories' ? 'Category' : 'Menu Item'}
        </Link>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {activeTab === 'categories' ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No categories found. Add your first category!
                      </td>
                    </tr>
                  ) : (
                    categories.map((category) => (
                      <tr key={category._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {category.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">
                            {category.description || 'No description'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {category.order}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/admin/categories/${category._id}`}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteCategory(category._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {menuItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No menu items found. Add your first menu item!
                      </td>
                    </tr>
                  ) : (
                    menuItems.map((item) => (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {item.category?.name || 'Uncategorized'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            ${item.price.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.available 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.available ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/admin/menu-items/${item._id}`}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteMenuItem(item._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
