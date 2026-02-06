// components/AboutUs/MeetTheChef.js

const MeetTheChef = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif text-gray-900">
                        Meet the Culinary Master
                    </h2>
                    <p className="text-gray-500 mt-2">
                        The visionary behind our kitchen's success and passion.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-12">
                    
                    {/* Left Side: Chef Image, Title, and Pull Quote */}
                    <div className="w-full lg:w-1/3 text-center sticky top-20">
                        <img 
                            src="/images/contact.png" 
                            alt="Head Chef Elena Rossi plating a dish"
                            // Using a regular rounded shape for a professional feel
                            className="w-full h-80 object-cover object-top rounded-lg shadow-xl mb-6 mx-auto lg:h-96"
                        />
                        <h3 className="text-2xl font-serif text-gray-900">
                            Chef Recson Brunley
                        </h3>
                        <p className="text-amber-600 font-semibold mb-6">
                            Founder & Executive Chef
                        </p>
                        
                        {/* New Pull Quote Section */}
                        <blockquote className="border-l-4 border-amber-600 pl-4 py-2 text-left italic text-gray-700">
                            "The kitchen is my canvas. Every plate is a tribute to the simplicity and purity of the ingredients."
                        </blockquote>
                    </div>

                    {/* Right Side: Biography and Image Grid */}
                    <div className="w-full lg:w-2/3">
                        <h4 className="text-xl font-semibold text-gray-900 mb-4">
                            A Journey Rooted in Excellence
                        </h4>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Chef Recson journey began in Douala, where he trained under one-star Resturant before bringing his expertise to the States. His approach to cooking is minimalist yet powerful, focusing on clean flavors and perfect technique. He champions sustainability and local farmers, ensuring every ingredient tells a story. His dedication to European tradition, combined with a modern sensibility, defines The Classic Resto’s menu.
                        </p>

                        {/* Image Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <img 
                                src="/gallery/perfect-sear.png" 
                                alt="Perfectly seared dish"
                                className="w-full h-40 object-cover rounded-lg shadow-md"
                            />
                            <img 
                                src="/gallery/local ingredient.png" 
                                alt="Fresh, local ingredients"
                                className="w-full h-40 object-cover rounded-lg shadow-md"
                            />
                        </div>

                        <h4 className="text-xl font-semibold text-gray-900 mb-4">
                            Vision & Philosophy
                        </h4>
                        <ul className="space-y-3 text-gray-600">
                            <li className="flex items-center">
                                <span className="text-amber-600 mr-3 text-2xl">🔪</span>
                                **Signature Style:** Loacal Cameroonian, focused on seasonal, minimalist, yet powerful flavors.
                            </li>
                            <li className="flex items-center">
                                <span className="text-amber-600 mr-3 text-2xl">🏅</span>
                                **Accolades:** Three-time 'Best New Chef' nominee; recipient of the Golden Fork Award.
                            </li>
                            <li className="flex items-center">
                                <span className="text-amber-600 mr-3 text-2xl">🌱</span>
                                **Commitment:** Sourcing 90% of our produce from local, sustainable farms within a 50-mile radius.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MeetTheChef;