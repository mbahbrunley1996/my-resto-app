
// components/FeaturetteSection.js

// This component uses simple emojis for icons for broad compatibility.

const FeaturetteSectionComponent = () => {
    // Define the core features of the restaurant
    const features = [
        {
            title: "Farm-to-Table Sourcing",
            icon: "🌿",
            description: "Our commitment to working with local farms ensures every dish is crafted with peak-fresh, seasonal ingredients."
        },
        {
            title: "Classic & Comfortable Ambiance",
            icon: "✨",
            description: "Experience attentive, unhurried service in our beautifully designed, intimate dining room."
        },
        {
            title: "Curated Wine & Spirits",
            icon: "🍷",
            description: "Our Sommelier has hand-selected rare wines and craft cocktails to perfectly complement your meal."
        }
    ];

    return (
        // Featurette Section Container
        <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-amber-600 text-lg tracking-widest font-serif mb-2">***</p>
                    <h2 className="text-4xl font-serif font-bold text-gray-800">Why Choose Essence.</h2>
                </div>

                {/* 3-Column Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:translate-y-[-3px]">
                            
                            {/* Icon */}
                            <div className="text-5xl mb-4 p-3 bg-amber-50 rounded-full border-4 border-amber-200">
                                {feature.icon}
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-gray-600 text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturetteSectionComponent;