// components/Footer.js
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaCog } from 'react-icons/fa';

const NavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Reservations', path: '/reservations' },
];

const FooterComponent = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setSubscribed(true);
            setLoading(false);
            setEmail('');
        }, 1000);
    };

    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* === Main Footer Grid === */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-10">

                    {/* Column 1: Brand & Social */}
                    <div>
                        <Link href="/" className="text-3xl font-serif font-bold text-amber-600 hover:text-amber-500 transition duration-300">
                            ESSENCE.
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed">
                            A culinary tradition where timeless recipes meet modern elegance. Join us for an unforgettable evening.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex space-x-4 mt-6 text-xl">
                            <a href="#" className="hover:text-amber-600 transition" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="#" className="hover:text-amber-600 transition" aria-label="Facebook">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="hover:text-amber-600 transition" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-600 w-fit pb-1">Quick Links</h3>
                        <ul className="space-y-2">
                            {NavLinks.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.path}
                                        className="text-sm hover:text-amber-600 transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Column 3: Contact & Location */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-600 w-fit pb-1">Get In Touch</h3>
                        <p className="text-sm mb-2 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-amber-600" />
                            Douala Akwa, Culinary City, Akwa Palace 
                        </p>
                        <p className="text-sm mb-2 flex items-center gap-2">
                            <FaPhoneAlt className="text-amber-600" />
                            (555) 123-4567
                        </p>
                        <p className="text-sm mb-2 flex items-center gap-2">
                            <FaEnvelope className="text-amber-600" />
                            brunleym@gmail.com
                        </p>
                        
                        {/* Booking CTA (for quick access) */}
                        <a 
                            href="#booking"
                            className="inline-block mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-md text-sm transition"
                        >
                            BOOK NOW
                        </a>
                    </div>

                    {/* Column 4: Hours of Operation */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4 border-b border-amber-600 w-fit pb-1">Hours</h3>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                                <span>BreakFast:</span>
                                <span className="text-white">Closed</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Lunch (Mon - Thu):</span>
                                <span className="text-white">5:00 PM – 10:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Dinner (Fri - Sat):</span>
                                <span className="text-white">5:00 PM – 11:00 PM</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday:</span>
                                <span className="text-white">Closed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* === Newsletter Section === */}
                <div className="py-10 border-b border-gray-700">
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-serif text-white mb-2">Stay Connected</h3>
                        <p className="text-gray-400 text-sm mb-6">
                            Subscribe to receive exclusive updates, special offers, and culinary insights.
                        </p>
                        
                        {subscribed ? (
                            <div className="bg-green-900/30 border border-green-500/50 text-green-400 px-6 py-4 rounded-lg">
                                <p className="font-medium">Thank you for subscribing!</p>
                                <p className="text-sm text-green-500/80">You'll receive our latest updates soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-600 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <span className="animate-pulse">Subscribing...</span>
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Subscribe
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* === Copyright Section === */}
                <div className="text-center pt-8 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <span>&copy; {new Date().getFullYear()} Essence. All Rights Reserved. | Crafted with Passion.</span>
                    <Link 
                        href="/admin" 
                        className="flex items-center gap-1 text-gray-600 hover:text-amber-600 transition-colors"
                    >
                        <FaCog /> Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;