// checkout/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlateAnimation } from '@/components/animations/PlateAnimation';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [showAnimation, setShowAnimation] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 100); // Small delay to ensure component is fully rendered
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  // Calculate total items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  
  return (
    <main className="min-h-screen bg-amber-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/menu" className="text-amber-800 hover:text-amber-600">
            <span className="text-2xl">←</span> Back to Menu
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">Checkout</h1>
        
        <div className="mb-12 h-64 flex items-center justify-center">
          <PlateAnimation isVisible={showAnimation} />
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-6">Your Order</h2>
            
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-600">Your cart is empty.</p>
            ) : (
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div 
                    key={item._id}
                    className={`flex items-center justify-between border-b border-amber-100 pb-4 transition-all duration-500 delay-${item._id * 100} ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 mr-4">
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-medium text-amber-900">{item.name}</div>
                        <div className="text-sm text-amber-600">Rp {item.price.toFixed(3)} × {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-bold text-amber-900">
                      Rp {(item.price * item.quantity).toFixed(3)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div 
              className={`flex justify-between items-center pt-4 border-t border-amber-200 transition-opacity duration-500 delay-1000 ${showAnimation ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className="text-xl font-bold text-amber-900">Total ({totalItems} items)</div>
              <div className="text-2xl font-bold text-amber-900">Rp {totalPrice.toFixed(3)}</div>
            </div>
          </div>
          
          <div 
            className={`bg-amber-600 p-6 transition-all duration-500 delay-1200 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          >
            <button className="w-full py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 transition-colors">
              Complete Order
            </button>
          </div>
        </div>
        
        <div className={`mt-8 bg-white p-6 rounded-lg shadow-md transition-all duration-500 delay-1500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h3 className="text-xl font-semibold text-amber-900 mb-4">Delivery Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-amber-700 mb-1">First Name</label>
                <input type="text" className="w-full p-2 border border-amber-300 rounded-md" />
              </div>
              <div>
                <label className="block text-amber-700 mb-1">Last Name</label>
                <input type="text" className="w-full p-2 border border-amber-300 rounded-md" />
              </div>
            </div>
            <div>
              <label className="block text-amber-700 mb-1">Address</label>
              <input type="text" className="w-full p-2 border border-amber-300 rounded-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-amber-700 mb-1">City</label>
                <input type="text" className="w-full p-2 border border-amber-300 rounded-md" />
              </div>
              <div>
                <label className="block text-amber-700 mb-1">State</label>
                <input type="text" className="w-full p-2 border border-amber-300 rounded-md" />
              </div>
              <div>
                <label className="block text-amber-700 mb-1">Zip Code</label>
                <input type="text" className="w-full p-2 border border-amber-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
