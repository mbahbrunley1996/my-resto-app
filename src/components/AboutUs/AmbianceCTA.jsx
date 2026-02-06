
// components/AboutUs/AmbianceCTA.js

const AmbianceCTA = () => {
    return (
        <section 
            className="py-24 bg-gray-900 text-white" 
            style={{ backgroundImage: 'url("/gallery/lounge-area.png")', backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundSize: 'cover' }}
        >
            <div className="container mx-auto px-6 lg:px-12 bg-black bg-opacity-70 p-10 rounded-lg text-center">
                <h2 className="text-4xl font-serif text-amber-600 mb-4">
                    Experience the Classic Ambiance
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                    Beyond the food, we've crafted an intimate and elegant space, perfect for any occasion—from a casual weeknight dinner to a private milestone celebration.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg">
                        View Our Gallery
                    </button>
                    <button className="bg-transparent border-2 border-white hover:border-amber-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
                        Book Private Dining
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AmbianceCTA;