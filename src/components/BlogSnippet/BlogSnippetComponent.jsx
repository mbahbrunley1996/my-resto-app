
// components/BlogSnippet.js

import Link from 'next/link';
// Assuming your BlogData and BlogCard paths are correct relative to this component
import { BlogData } from '@/data/blogData'; // Path to your data
import BlogCardComponent from '../BlogCard/BlogCardComponent';          // Path to your card component

// Simple utility to determine category styling (can be centralized if needed)
const getCategoryColor = (category) => {
    switch (category) {
        case 'Cuisine Focus':
            return 'text-red-700 bg-red-100';
        case 'Drinks & Cocktails':
            return 'text-blue-700 bg-blue-100';
        case 'Ingredients':
            return 'text-green-700 bg-green-100';
        case 'Restaurant Culture':
            return 'text-gray-700 bg-gray-200';
        default:
            return 'text-amber-600 bg-amber-100';
    }
};

const BlogSnippetComponent = () => {
    // Get the two most recent posts (assuming lower IDs are older, so slice the first two)
    const latestPosts = BlogData.slice(0, 2); 

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-amber-600 text-lg tracking-widest font-serif mb-2">***</p>
                    <h2 className="text-4xl font-serif font-bold text-gray-800">Latest Stories from Essence.</h2>
                    <p className="text-gray-500 mt-2">Insights into our kitchen, bar, and history.</p>
                </div>

                {/* 2-Column Grid for Blog Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* ------------------------------------------------------------------ */}
                    {/* FIX 1: Map over 'latestPosts' (the data array), NOT 'BlogCardComponent' */}
                    {/* FIX 2: Call the BlogCardComponent and pass the post data as a prop */}
                    {/* ------------------------------------------------------------------ */}
                    {latestPosts.map(post => (
                        <BlogCardComponent 
                            key={post.id} 
                            post={post} // Pass the entire post object as a prop
                        />
                    ))}
                </div>

                {/* Call to Action to full blog */}
                <div className="text-center mt-12">
                    <Link 
                        href="/blogs" 
                        className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-md text-base transition duration-300 uppercase tracking-widest"
                    >
                        Explore All Culinary Stories
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogSnippetComponent;