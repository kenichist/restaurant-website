'use client';

import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItem = prevItems.find(i => i._id === item._id);
      if (existingItem) {
        // Increase the quantity if item exists
        return prevItems.map(i =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Otherwise add the item with quantity 1
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
