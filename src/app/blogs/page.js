
// app/blogs/page.js

import React from 'react';
import BlogCard from '../../components/BlogCard/BlogCardComponent';
import { BlogData } from '../../data/blogData';
import FooterComponent from '@/components/Footer/FooterComponent';

export const metadata = {
  title: 'Essence. - Blog & Stories',
};

const BlogPage = () => {
    return (
        <>
            <main className="pt-24 bg-gray-50 min-h-screen">
                
                {/* === Blog Hero/Header Section === */}
                <div className="text-center py-16 bg-white border-b shadow-sm">
                    <h1 className="text-6xl font-serif font-bold text-gray-900">
                        Our Latest Stories
                    </h1>
                    <p className="text-lg text-gray-500 mt-3">
                        Insights into our kitchen, bar, and restaurant culture.
                    </p>
                </div>

                {/* === Blog Grid Listing Section === */}
                <section className="max-w-7xl mx-auto py-16 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Map over the imported data and render a card for each post */}
                        {BlogData.map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                </section>
                
                {/* Add pagination or a simple footer here */}
            </main>

            <FooterComponent />
        </>
    );
};

export default BlogPage;