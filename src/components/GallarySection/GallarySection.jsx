// components/GallerySection.js
"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GalleryData } from '@/data/galleryData';

/**
 * GallerySection Component
 * @param {boolean} isSnippet - If true, displays a limited set of images and a "View All" button.
 */
const GallerySection = ({ isSnippet = false }) => { 
    
    // 1. Setup Categories for the filter (Full Gallery Page only)
    const allCategories = useMemo(() => {
        return ['All', ...new Set(GalleryData.map(item => item.category))];
    }, []);

    const [activeCategory, setActiveCategory] = useState('All');

    // 2. Optimized Filtering Logic
    const filteredImages = useMemo(() => {
        // First, filter by category
        let list = GalleryData.filter(img => 
            activeCategory === 'All' || img.category === activeCategory
        );

        // Second, if it's a snippet for the Home page, limit the count
        if (isSnippet) {
            return list.slice(0, 8); 
        }

        return list;
    }, [activeCategory, isSnippet]);

    return (
        <section id="gallery" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-amber-600 text-lg tracking-widest font-serif mb-2">***</p>
                    <h2 className="text-4xl font-serif font-bold text-gray-800 uppercase tracking-tight">
                        {isSnippet ? 'Visual Highlights' : 'Our Visual Journey'}
                    </h2>
                    <p className="text-gray-500 mt-2 max-w-lg mx-auto italic">
                        A glimpse into the atmosphere and culinary artistry of The Essence.
                    </p>
                </div>

                {/* Category Filter - Hidden on Home Page Snippet */}
                {!isSnippet && (
                    <div className="flex justify-center flex-wrap gap-3 mb-12">
                        {allCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-8 py-2 rounded-sm font-medium transition-all duration-300 text-xs uppercase tracking-[0.2em] ${
                                    activeCategory === cat 
                                        ? 'bg-amber-600 text-white shadow-lg' 
                                        : 'bg-white text-gray-600 hover:text-amber-600 border border-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
                
                {/* Responsive Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredImages.map((img, index) => (
                        <div 
                            key={img.id} 
                            className="overflow-hidden rounded-sm shadow-sm group relative h-64 bg-gray-200" 
                        >
                            <Image
                                src={img.image} // Corrected: Uses the 'image' property from your data
                                alt={img.alt}
                                fill // Using 'fill' with a container height for better responsiveness
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                className="object-cover transition-transform duration-700 transform group-hover:scale-110"
                                priority={index < 4} // Load the first few images immediately
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <span className="text-white text-xs uppercase tracking-widest font-semibold border-b border-amber-500 pb-1">
                                    {img.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Home Page "View More" CTA */}
                {isSnippet && (
                    <div className="text-center mt-16">
                        <Link 
                            href="/gallery"
                            className="inline-block border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-bold py-4 px-10 rounded-sm text-xs transition-all duration-500 uppercase tracking-[0.3em]"
                        >
                            Explore Full Gallery (15+ photos)
                        </Link>
                    </div>
                )}
                
            </div>
        </section>
    );
};

export default GallerySection;