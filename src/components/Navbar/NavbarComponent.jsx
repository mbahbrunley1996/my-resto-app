"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import CartDrawer from '../CartDrawer/CartDrawer';
import { FaUser, FaSignOutAlt, FaShoppingBag, FaMoon, FaSun } from 'react-icons/fa';

const NavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' }, 
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact Us', path: '/contact' },
];

const NavbarComponent = () => {
    const pathname = usePathname();
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // --- THEME LOGIC ---
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setDarkMode(true);
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    const handleLogout = async () => {
        try {
            await logout();
            setIsProfileOpen(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500 bg-white/95 dark:bg-black/95 text-neutral-900 dark:text-white shadow-sm backdrop-blur-md border-b border-neutral-100 dark:border-white/10">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 lg:px-10 py-4 md:py-5">
                    
                    {/* --- LOGO --- */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="group flex flex-col items-center">
                            <span className="text-base md:text-lg lg:text-xl font-serif font-light tracking-[0.2em] md:tracking-[0.3em] uppercase transition-colors duration-500">
                                THE <span className="text-amber-700 dark:text-amber-600 font-bold">ESSENCE</span>
                            </span>
                        </Link>
                    </div>
                    
                    {/* --- NAVIGATION (Tablet & Desktop) --- */}
                    <nav className="hidden md:flex items-center space-x-3 lg:space-x-8">
                        {NavLinks.map((item) => (
                            <Link 
                                key={item.name} 
                                href={item.path}
                                className={`text-[9px] lg:text-[10px] tracking-[0.15em] lg:tracking-[0.2em] uppercase font-semibold transition-all duration-300 whitespace-nowrap
                                ${pathname === item.path ? 'text-amber-700 dark:text-amber-500' : 'text-neutral-600 dark:text-neutral-400 hover:text-amber-700'}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    
                    {/* --- ACTION AREA --- */}
                    <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
                        
                        {/* THEME TOGGLE (Desktop) */}
                        <button 
                            onClick={toggleTheme}
                            className="relative w-8 h-4 lg:w-10 lg:h-5 flex items-center bg-neutral-200 dark:bg-neutral-800 rounded-full p-0.5 transition-colors duration-500"
                            aria-label="Toggle theme"
                        >
                            <div className={`bg-white dark:bg-amber-600 w-3 h-3 lg:w-4 lg:h-4 rounded-full shadow-sm transform transition-transform duration-500 ${darkMode ? 'translate-x-4 lg:translate-x-5' : 'translate-x-0'}`} />
                        </button>

                        {/* USER PROFILE DROPDOWN */}
                        <div className="relative hidden sm:block">
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 hover:text-amber-700 transition-colors p-1"
                            >
                                {user?.photoURL ? (
                                    <img 
                                        src={user.photoURL} 
                                        alt="Profile" 
                                        className="w-6 h-6 lg:w-7 lg:h-7 rounded-full object-cover border-2 border-amber-600"
                                    />
                                ) : (
                                    <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                    </div>
                                )}
                            </button>

                            {/* Profile Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-100 dark:border-neutral-800 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
                                        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">
                                            {user?.displayName || 'Guest'}
                                        </p>
                                        <p className="text-xs text-neutral-500 truncate">
                                            {user?.email}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                    >
                                        <FaSignOutAlt />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* CART ICON - Now opens Drawer */}
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative py-1 outline-none transition-colors hover:text-amber-700 dark:hover:text-amber-500"
                        >
                            <FaShoppingBag className="h-4 w-4 lg:h-5 lg:w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1.5 bg-neutral-900 dark:bg-amber-600 text-white text-[7px] font-bold h-3.5 w-3.5 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* CTA (Visible on Large Screens) */}
                        <div className="hidden lg:block">
                            <Link href="/reservations" className="border border-neutral-900 dark:border-amber-600 text-neutral-900 dark:text-amber-600 hover:bg-neutral-900 dark:hover:bg-amber-600 hover:text-white dark:hover:text-black px-4 py-2 rounded-sm text-[9px] tracking-[0.15em] font-bold transition-all uppercase whitespace-nowrap">
                                Book a Table
                            </Link>
                        </div>

                        {/* MOBILE TOGGLE (Hamburger Icon) */}
                        <div className="md:hidden">
                            <button onClick={toggleMenu} className="text-neutral-900 dark:text-white p-2">
                                <div className="relative w-5 h-4">
                                    <span className={`absolute block h-0.5 w-full bg-current transform transition duration-500 ${isOpen ? 'rotate-45 top-2' : 'top-0'}`}></span>
                                    <span className={`absolute block h-0.5 w-full bg-current transition-all duration-500 ${isOpen ? 'opacity-0' : 'top-1.5'}`}></span>
                                    <span className={`absolute block h-0.5 w-full bg-current transform transition duration-500 ${isOpen ? '-rotate-45 top-2' : 'top-3'}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- MOBILE MENU OVERLAY --- */}
                <div className={`md:hidden fixed inset-0 bg-white dark:bg-black z-40 transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                    <nav className="flex flex-col items-center justify-center space-y-8 h-full">
                        {NavLinks.map((item, index) => (
                            <Link 
                                key={item.name} 
                                href={item.path}
                                onClick={closeMenu}
                                style={{ 
                                    transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                                    transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                                    opacity: isOpen ? 1 : 0
                                }}
                                className={`text-2xl tracking-[0.2em] uppercase font-light transition-all duration-500 
                                ${pathname === item.path ? 'text-amber-700 dark:text-amber-500' : 'text-neutral-800 dark:text-neutral-200'}`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        
                        <div 
                            className="flex flex-col items-center space-y-6 pt-12 transition-all duration-700 delay-500 text-center"
                            style={{ transform: isOpen ? 'translateY(0)' : 'translateY(20px)', opacity: isOpen ? 1 : 0 }}
                        >
                            <button onClick={toggleTheme} className="text-amber-700 dark:text-amber-500 text-[10px] tracking-[0.3em] uppercase font-bold">
                               Switch to {darkMode ? 'Light' : 'Dark'} Mode
                            </button>

                            {/* Mobile User Info */}
                            <div className="flex flex-col items-center gap-2 text-neutral-400 dark:text-neutral-500 text-xs tracking-[0.2em] uppercase border-b border-neutral-100 dark:border-neutral-800 pb-4">
                                <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-white text-lg font-bold mb-2">
                                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                                </div>
                                <span className="text-neutral-800 dark:text-white font-medium normal-case">
                                    {user?.displayName || 'Guest'}
                                </span>
                                <span className="text-[10px] normal-case">{user?.email}</span>
                            </div>

                            <button 
                                onClick={() => { handleLogout(); closeMenu(); }}
                                className="flex items-center gap-2 text-red-500 text-xs tracking-[0.3em] uppercase font-bold"
                            >
                                <FaSignOutAlt />
                                Sign Out
                            </button>

                            <Link href="/reservations" onClick={closeMenu} className="bg-neutral-900 dark:bg-amber-600 text-white dark:text-black px-12 py-4 text-[12px] tracking-[0.3em] uppercase font-bold">
                                Book a Table
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Cart Drawer Component */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default NavbarComponent;