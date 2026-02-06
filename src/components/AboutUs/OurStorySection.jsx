
// components/AboutUs/OurStorySection.js

const OurStorySection = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    
                    {/* Left Side: Image */}
                    <div className="w-full lg:w-1/2 relative">
                        {/* We use one of the elegant plating images */}
                        <img 
                            src="/gallery/pasta-plating.png" 
                            alt="Beautifully plated pasta dish"
                            className="w-full h-auto object-cover rounded-lg shadow-2xl"
                        />
                        {/* Small decorative accent */}
                        <div className="absolute bottom-0 right-0 p-4 bg-amber-600 text-white rounded-tl-lg text-sm font-semibold">
                            Crafted with Passion
                        </div>
                    </div>

                    {/* Right Side: Text */}
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-3">
                            THE ESSENCE STORY
                        </h3>
                        <h2 className="text-4xl font-serif text-gray-900 mb-6">
                            Where Tradition Meets the Table
                        </h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Founded in 2010 by Chef Recson Brunley, The Classic Resto was born from a simple idea: to bring authentic, time-honored Local Cameroonian Meals techniques to a modern setting. Our philosophy is rooted in the belief that the best food starts with the best ingredients—sourced locally and prepared without compromise.
                        </p>
                        <p className="text-gray-600 leading-relaxed italic border-l-4 border-amber-600 pl-4">
                            "We aim to create an experience that is both sophisticated and deeply comforting, ensuring every guest feels the passion we pour into our craft."
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OurStorySection;