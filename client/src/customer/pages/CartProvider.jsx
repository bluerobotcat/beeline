import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const cartFunctions = useCartFunctions();
  return (
    <CartContext.Provider value={cartFunctions}>
      {children}
    </CartContext.Provider>
  );
}

function useCartFunctions() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const updateItem = (id, updatedDish) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? updatedDish : item
    );
    setCart(updatedCart);
  };

  return { cart, addToCart, removeItem, updateItem };
}

export function useCart() {
  return useContext(CartContext);
}
