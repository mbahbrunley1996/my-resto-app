"use client";
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                // CHECK STOCK: Only add if current quantity is less than stock
                if (existingItem.quantity < product.stock) {
                    return prevCart.map(item =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                } else {
                    alert(`Sorry, we only have ${product.stock} of these in stock.`);
                    return prevCart;
                }
            }
            // If it's a new item, check if at least 1 is in stock
            if (product.stock > 0) {
                return [...prevCart, { ...product, quantity: 1 }];
            } else {
                alert("This item is currently out of stock.");
                return prevCart;
            }
        });
    };

    // Remove 1 from quantity, or remove item if quantity hits 0
    const decrementQuantity = (id) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === id);
            if (existingItem.quantity === 1) {
                return prevCart.filter(item => item.id !== id);
            }
            return prevCart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, decrementQuantity, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);