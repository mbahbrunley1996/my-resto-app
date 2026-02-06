// // components/MenuSection.js
// "use client";

// import React, { useState, useMemo } from 'react';
// import Image from 'next/image';
// import { MenuData } from '@/data/menuData';
// import { useCart } from '@/context/CartContext';

// const MenuSectionComponent = () => {
//     // 1. Get unique categories + add a special "To-Go" filter
//     const categories = ['All', 'Main Course', 'Appetizers', 'Desserts', 'To-Go Specials'];
//     const [activeFilter, setActiveFilter] = useState('All');

//     const { addToCart } = useCart(); // 2. Get the addToCart function from context

//     // 2. Advanced Filtering Logic
//     const filteredMenu = useMemo(() => {
//         if (activeFilter === 'All') return MenuData;
        
//         // If they click the To-Go filter
//         if (activeFilter === 'To-Go Specials') {
//             return MenuData.filter(item => item.isToGo === true);
//         }

//         // Standard category filtering
//         return MenuData.filter(item => item.category === activeFilter);
//     }, [activeFilter]);

//     return (
//         <section className="py-24 bg-white">
//             <div className="max-w-7xl mx-auto px-6">
                
//                 {/* Header */}
//                 <div className="text-center mb-16">
//                     <h2 className="text-4xl font-serif tracking-tight text-gray-900 uppercase">
//                         The <span className="text-amber-600">Culinary</span> Collection
//                     </h2>
//                     <p className="text-gray-500 mt-4 italic">Plated for the table or packaged for your journey.</p>
//                 </div>

//                 {/* Filter Tabs */}
//                 <div className="flex justify-center flex-wrap gap-4 mb-16">
//                     {categories.map((cat) => (
//                         <button
//                             key={cat}
//                             onClick={() => setActiveFilter(cat)}
//                             className={`px-6 py-2 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 border-b-2 ${
//                                 activeFilter === cat 
//                                 ? 'border-amber-600 text-amber-600' 
//                                 : 'border-transparent text-gray-400 hover:text-gray-900'
//                             }`}
//                         >
//                             {cat}
//                         </button>
//                     ))}
//                 </div>

//                 {/* Menu Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
//                   {filteredMenu.map((item) => {
//     const isOutOfStock = item.stock === 0;
//     const isLowStock = item.stock > 0 && item.stock <= 3;

//     return (
//         <div key={item.id} className={`flex flex-col bg-white border border-gray-100 rounded-sm overflow-hidden transition-all duration-500 ${isOutOfStock ? 'opacity-60 grayscale' : 'hover:shadow-2xl hover:border-amber-200'}`}>
            
//             {/* --- IMAGE SECTION --- */}
//             <div className="relative w-full h-64 bg-zinc-100 overflow-hidden group">
//                 <Image 
//                     src={item.image} 
//                     alt={item.name}
//                     fill
//                     className="object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
                
//                 {/* Travel Badge for Boutique items */}
//                 {item.isToGo && !isOutOfStock && (
//                     <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-amber-900 text-[8px] px-3 py-1 uppercase tracking-widest font-bold shadow-sm">
//                         Travel Ready
//                     </div>
//                 )}

//                 {/* Tag Badge (NEW, POPULAR, etc.) */}
//                 {item.tag && (
//                     <div className="absolute top-4 right-4 bg-amber-600 text-white text-[8px] px-3 py-1 uppercase tracking-[0.2em] font-bold">
//                         {item.tag}
//                     </div>
//                 )}
//             </div>

//             {/* --- CONTENT SECTION --- */}
//             <div className="p-6 flex flex-col flex-grow">
//                 <div className="flex justify-between items-start mb-2">
//                     <h3 className="text-xl font-serif text-gray-900 leading-tight">{item.name}</h3>
//                     <span className="text-amber-600 font-bold ml-4">${item.price}</span>
//                 </div>

//                 {/* Stock Status Badge */}
//                 <div className="mb-4">
//                     {isOutOfStock ? (
//                         <span className="text-[10px] text-red-600 font-bold uppercase tracking-tighter italic">Currently Unavailable</span>
//                     ) : isLowStock ? (
//                         <span className="text-[10px] text-amber-700 font-bold uppercase animate-pulse italic">
//                             Hurry! Only {item.stock} left in storehouse
//                         </span>
//                     ) : (
//                         <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
//                            Available for Order
//                         </span>
//                     )}
//                 </div>

//                 <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 line-clamp-2 italic">
//                     {item.desc}
//                 </p>

//                 {/* --- ACTION BUTTON --- */}
//                 <div className="mt-auto">
//                     <button 
//                         onClick={() => !isOutOfStock && addToCart(item)}
//                         disabled={isOutOfStock}
//                         className={`w-full py-4 text-[10px] tracking-[0.3em] uppercase font-bold transition-all duration-500
//                             ${isOutOfStock 
//                                 ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200' 
//                                 : 'bg-zinc-900 text-white hover:bg-amber-600 hover:shadow-lg'
//                             }`}
//                     >
//                         {isOutOfStock ? 'Sold Out' : '+ Add to Order'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// })}
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default MenuSectionComponent;



































































"use client";

import { useState, useMemo, useEffect } from "react";
import MenuItemsComponent from "../MenuItems/MenuItemsComponent";
import { MenuData } from "@/data/menuData";
import { getMenuItems, saveMenuItems } from "@/lib/localStorage";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";

const persons = [
  {
    id: 0,
    name: "Person One",
    category: "BreakFast & Appetizers",
    image: "/persons/person-1.png",
  },
  {
    id: 1,
    name: "Person Two",
    category: "Day Dishes",
    image: "/persons/person-2.png",
  },
  {
    id: 2,
    name: "Person Three",
    category: "Desserts & Parties",
    image: "/persons/person-3.png",
  },
  {
    id: 3,
    name: "Person Four",
    category: "Drinks & Cocktail",
    image: "/persons/person-4.png",
  },
  {
    id: 4,
    name: "Person Five",
    category: "Juice & Beverages",
    image: "/persons/person-5.png",
  },
];

const MenuSectionComponent = () => {
  const [activePersonIndex, setActivePersonIndex] = useState(0);
  const [menuItems, setMenuItems] = useState([]);

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

  const activePerson = persons[activePersonIndex];

  // 🔑 FILTER MENU BY PERSON CATEGORY - now using menuItems state instead of static MenuData
  const filteredMenu = useMemo(() => {
    return menuItems.filter(
      (item) => item.category === activePerson.category
    );
  }, [activePerson, menuItems]);

  const nextPerson = () => {
    setActivePersonIndex((prev) => (prev + 1) % persons.length);
  };

  const prevPerson = () => {
    setActivePersonIndex(
      (prev) => (prev - 1 + persons.length) % persons.length
    );
  };

  return (
    <section className="py-20">
      {/* HEADER */}
      <div className="text-center mb-12">
        <p className="text-sm tracking-[0.2em] font-semibold text-gray-500 uppercase">
          FOOD MENU
        </p>
        <h2 className="text-5xl font-serif font-bold text-gray-800">
          Timeless Culinary Delights
        </h2>
        <Link href="/collection">
         <button className="mt-10 px-6 py-3 bg-zinc-900 text-white hover:bg-amber-600 transition-all duration-300 flex items-center gap-2 mx-auto">
                 View Full Menu <FaArrowRight className="text-sm" />
         </button>
       </Link>
      </div>

      {/* PERSON NAVIGATION */}
      <div className="flex justify-center items-center gap-6 mb-10">
        <button 
          onClick={prevPerson} 
          className="px-4 py-2 border border-gray-300 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 flex items-center gap-2"
        >
          <FaChevronLeft className="text-sm" /> Prev
        </button>

        <span className="text-2xl font-serif text-amber-600">
          {activePerson.category}
        </span>

        <button 
          onClick={nextPerson} 
          className="px-4 py-2 border border-gray-300 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-all duration-300 flex items-center gap-2"
        >
          Next <FaChevronRight className="text-sm" />
        </button>
      </div>

      {/* MENU + IMAGE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6">
        {/* MENU LIST */}
        <div className="flex flex-col gap-6">
          {filteredMenu.map((item) => (
            <MenuItemsComponent
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.desc}
              price={item.price}
              tag={item.tag}
              imageUrl={item.image}
              stock={item.stock}
              isToGo={item.isToGo}
              item={item}
            />
          ))}
        </div>

        {/* PERSON IMAGE */}
        <div className="hidden lg:block rounded-xl overflow-hidden shadow-xl">
          <img
            src={activePerson.image}
            alt={activePerson.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default MenuSectionComponent;

