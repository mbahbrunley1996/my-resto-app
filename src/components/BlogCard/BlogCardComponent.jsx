

// components/BlogCard.js

import Link from 'next/link';

// Simple utility for category styling
const getCategoryColor = (category) => {
    switch (category) {
        case 'Cuisine Focus':
            return 'text-red-700 bg-red-100';
        case 'Drinks & Cocktails':
            return 'text-blue-700 bg-blue-100';
        case 'Ingredients':
            return 'text-green-700 bg-green-100';
        case 'Wine & Spirits':
            return 'text-purple-700 bg-purple-100';
        case 'Restaurant Culture':
            return 'text-gray-700 bg-gray-200';
        default:
            return 'text-amber-600 bg-amber-100';
    }
};

const BlogCardComponent = ({ post }) => {
    const categoryClasses = getCategoryColor(post.category);
    
    return (
        // Wrapper with shadow, radius, and a subtle zoom on hover
        <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-500 hover:shadow-2xl hover:scale-[1.02]">
            
            {/* Image Placeholder */}
            {/* In a real project, replace <img> with the Next.js <Image> component */}
            <img 
                src={post.image || "/images/placeholder-default.jpg"} 
                alt={post.title} 
                className="w-full h-48 object-cover" 
            />
            
            <div className="p-6">
                
                {/* Category and Date */}
                <div className="flex justify-between items-center text-xs mb-3">
                    <span className={`px-3 py-1 rounded-full font-semibold uppercase ${categoryClasses}`}>
                        {post.category}
                    </span>
                    <span className="text-gray-500">{post.date}</span>
                </div>
                
                {/* Title (The most important element) */}
                <h3 className="text-2xl font-serif font-bold text-gray-800 leading-tight mt-2 mb-3 hover:text-amber-700 transition duration-300">
                    <Link href={`/blogs/${post.slug}`}>
                        {post.title}
                    </Link>
                </h3>
                
                {/* Summary */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.summary}
                </p>
                
                {/* Read More Link */}
                <Link 
                    href={`/blogs/${post.slug}`} 
                    className="text-amber-600 font-semibold hover:text-amber-700 transition duration-300 flex items-center"
                >
                    Read More 
                    <span className="ml-1 text-lg leading-none">&rarr;</span>
                </Link>
            </div>
        </div>
    );
};

export default BlogCardComponent;