"use client"
// components/MenuHero.js
import React, { useState, useEffect } from 'react';

// 1. Define the images you want to use in the slider
const SLIDE_IMAGES = [
    // Use the URLs for the images you uploaded earlier, or similar high-quality ones
    '/hero/hero-1.png', // Main interior shot
    '/hero/hero-2.png',  // Food shot
    '/hero/hero-3.png',     // Drink/Atmosphere shot
    '/hero/hero-4.png', // Detail/Elegance shot
];

// Set the transition duration (in milliseconds)
const SLIDE_DURATION = 5000; // 5 seconds per slide

const MenuHero = () => {
    // 2. State to track the currently active slide index
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // 3. useEffect to handle the auto-slide logic
    useEffect(() => {
        // Set up the interval for the auto-play
        const timer = setInterval(() => {
            setCurrentSlideIndex(prevIndex => 
                // Cycle to the next image, or wrap back to 0
                (prevIndex + 1) % SLIDE_IMAGES.length
            );
        }, SLIDE_DURATION);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, []); // Empty dependency array ensures this runs only once

    // 4. Get the URL of the current image
    const currentImageUrl = SLIDE_IMAGES[currentSlideIndex];

    return (
        <section 
            className="h-[350px] flex items-end justify-center text-center pt-14 relative overflow-hidden" // Added overflow-hidden
            style={{ marginTop: '5rem' }} // Ensure it starts below the fixed header
        >
            {/* 5. Render the sliding images */}
            {SLIDE_IMAGES.map((url, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out`}
                    style={{
                        // Use opacity to fade images in and out
                        opacity: index === currentSlideIndex ? 1 : 0,
                        // Ensure images cover the area
                        backgroundImage: `url('${url}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            ))}
            
            {/* Dark Overlay (menu-hero::before) - Keep the overlay */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
            
            {/* Hero Text Content - Keep this on top (relative z-10) */}
            <div className="relative z-10 text-white pb-8">
                {/* subtitle */}
                <p className="font-serif text-5xl mb-3">Our Menu</p>
                {/* hero-nav */}
                <nav className="text-sm font-semibold">
                    <a href="#" className="hover:text-amber-600 transition">Home</a>
                    <span className="mx-2">/</span>
                    <a href="#" className="text-amber-600">Menu</a>
                </nav>
            </div>
        </section>
    );
};

export default MenuHero;