"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
    // 1. Added addToCart here to handle the "+" button
    const { cart, addToCart, decrementQuantity, removeFromCart, cartTotal } = useCart();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <>
            {/* Backdrop Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-500 
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Side Panel */}
            <aside className={`fixed top-0 right-0 h-full w-[85%] sm:w-full sm:max-w-md bg-white dark:bg-neutral-950 z-[100] shadow-2xl transform transition-transform duration-500 ease-in-out 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-100 dark:border-neutral-800">
                    <h2 className="text-xl font-serif tracking-widest uppercase dark:text-white">Your Selection</h2>
                    <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform duration-300">
                        <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 h-[calc(100vh-250px)]">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <p className="text-neutral-400 font-light tracking-widest uppercase text-sm">Your cart is empty</p>
                            <Link href="/menu" onClick={onClose} className="text-amber-700 dark:text-amber-600 text-xs font-bold tracking-[0.2em] uppercase border-b border-amber-700 pb-1">Browse Menu</Link>
                        </div>
                    ) : (
                        /* 2. Changed cartItems to cart */
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-900 overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-sm font-bold uppercase tracking-wider dark:text-white">{item.name}</h3>
                                        <button onClick={() => removeFromCart(item.id)} className="text-neutral-400 hover:text-red-500 transition-colors">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                    <p className="text-xs text-neutral-500 font-light">{item.category}</p>
                                    <div className="flex justify-between items-center pt-2">
                                        <div className="flex items-center border dark:border-neutral-800 rounded-sm">
                                            {/* 3. Logic fix: decrementQuantity only needs ID */}
                                            <button onClick={() => decrementQuantity(item.id)} className="px-2 py-1 text-neutral-500">-</button>
                                            <span className="px-2 text-xs dark:text-white">{item.quantity}</span>
                                            {/* 4. Logic fix: use addToCart for the plus button */}
                                            <button onClick={() => addToCart(item)} className="px-2 py-1 text-neutral-500">+</button>
                                        </div>
                                        <span className="text-sm font-medium dark:text-amber-500">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-neutral-50 dark:bg-neutral-900 space-y-4 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="flex justify-between items-center">
                            <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">Subtotal</span>
                            <span className="text-xl font-serif dark:text-white">${cartTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-neutral-400 leading-relaxed">Shipping and taxes calculated at checkout.</p>
                        <Link 
                            href="/checkout" 
                            onClick={onClose}
                            className="block w-full bg-neutral-900 dark:bg-amber-600 text-white dark:text-black py-4 text-center text-[11px] tracking-[0.3em] font-bold uppercase hover:bg-amber-700 dark:hover:bg-white transition-all duration-500"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </aside>
        </>
    );
};

export default CartDrawer;