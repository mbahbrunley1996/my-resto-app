
// components/MenuSection.js
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { MenuData } from '@/data/menuData';
import { getMenuItems, saveMenuItems } from '@/lib/localStorage';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

const CollectionPage = () => {
    // 1. Get unique categories + add a special "To-Go" filter
    const categories = ['All', 'Main Course', 'Appetizers', 'Desserts', 'To-Go Specials'];
    const [activeFilter, setActiveFilter] = useState('All');
    const [menuItems, setMenuItems] = useState([]);

    const { addToCart } = useCart(); // 2. Get the addToCart function from context

    // Load menu items from localStorage on mount
    useEffect(() => {
        const loadMenuItems = () => {
            let storedMenu = getMenuItems().filter(item => item !== null);
            // If localStorage is empty, use the default MenuData and save it
            if (storedMenu.length === 0) {
                storedMenu = MenuData;
                saveMenuItems(storedMenu);
            }
            setMenuItems(storedMenu);
        };

        loadMenuItems();

        // Listen for storage changes (when admin updates in another tab)
        const handleStorageChange = (e) => {
            if (e.key === 'essence_menu_items') {
                loadMenuItems();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // 2. Advanced Filtering Logic - now using menuItems state instead of static MenuData
    const filteredMenu = useMemo(() => {
        if (activeFilter === 'All') return menuItems;
        
        // If they click the To-Go filter
        if (activeFilter === 'To-Go Specials') {
            return menuItems.filter(item => item.isToGo === true);
        }

        // Standard category filtering
        return menuItems.filter(item => item.category === activeFilter);
    }, [activeFilter, menuItems]);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif tracking-tight text-gray-900 uppercase">
                        The <span className="text-amber-600">Culinary</span> Collection
                    </h2>
                    <p className="text-gray-500 mt-4 italic">Plated for the table or packaged for your journey.</p>

                    <Link className='hover:text-green-300' href="/menu">
  ← Back to Signature Menu
</Link>

                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-6 py-2 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 border-b-2 ${
                                activeFilter === cat 
                                ? 'border-amber-600 text-amber-600' 
                                : 'border-transparent text-gray-400 hover:text-gray-900'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  {filteredMenu.map((item) => {
    const isOutOfStock = item.stock === 0;
    const isLowStock = item.stock > 0 && item.stock <= 3;

    return (
        <div key={item.id} className={`flex flex-col bg-white border border-gray-100 rounded-sm overflow-hidden transition-all duration-500 ${isOutOfStock ? 'opacity-60 grayscale' : 'hover:shadow-2xl hover:border-amber-200'}`}>
            
            {/* --- IMAGE SECTION --- */}
            <div className="relative w-full h-64 bg-zinc-100 overflow-hidden group">
                <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Travel Badge for Boutique items */}
                {item.isToGo && !isOutOfStock && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-amber-900 text-[8px] px-3 py-1 uppercase tracking-widest font-bold shadow-sm">
                        Travel Ready
                    </div>
                )}

                {/* Tag Badge (NEW, POPULAR, etc.) */}
                {item.tag && (
                    <div className="absolute top-4 right-4 bg-amber-600 text-white text-[8px] px-3 py-1 uppercase tracking-[0.2em] font-bold">
                        {item.tag}
                    </div>
                )}
            </div>

            {/* --- CONTENT SECTION --- */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-serif text-gray-900 leading-tight">{item.name}</h3>
                    <span className="text-amber-600 font-bold ml-4">FCFA{item.price}</span>
                </div>

                {/* Stock Status Badge */}
                <div className="mb-4">
                    {isOutOfStock ? (
                        <span className="text-[10px] text-red-600 font-bold uppercase tracking-tighter italic">Currently Unavailable</span>
                    ) : isLowStock ? (
                        <span className="text-[10px] text-amber-700 font-bold uppercase animate-pulse italic">
                            Hurry! Only {item.stock} left in storehouse
                        </span>
                    ) : (
                        <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                           Available for Order
                        </span>
                    )}
                </div>

                <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-2 italic">
                    {item.desc}
                </p>

                {/* --- ACTION BUTTON --- */}
                <div className="mt-auto">
                    <button 
                        onClick={() => !isOutOfStock && addToCart(item)}
                        disabled={isOutOfStock}
                        className={`w-full py-4 text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-500
                            ${isOutOfStock 
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
                                : 'bg-zinc-900 text-white hover:bg-amber-600 hover:shadow-lg'
                            }`}
                    >
                        {isOutOfStock ? 'Sold Out' : '+ Add to Order'}
                    </button>
                </div>
            </div>
        </div>
    );
})}
                </div>
                <div className='hover:text-green-300 text-center mt-20'>
                 <Link className='' href="/menu">
  ← Back to Signature Menu
</Link>
</div>

            </div>
        </section>
    );
};

export default CollectionPage;