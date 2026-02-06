
// components/Booking/BookATable.js
import FooterComponent from "../Footer/FooterComponent";
import ReservationWidget from "./ReservationWidget";
import { FaUserTie, FaTimesCircle, FaUsers, FaLeaf } from 'react-icons/fa';

const BookATable = () => {
    return (
        <>
        <main className="pt-20 lg:pt-28 bg-gray-50">
            
            {/* Hero Section */}
            <header className="relative h-64 flex items-center justify-center text-center" 
                style={{ backgroundImage: 'url("/gallery/guest-toast.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <h1 className="relative z-10 text-6xl font-serif text-white">
                    Reserve Your Experience
                </h1>
            </header>

            {/* Main Booking Area */}
            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    <ReservationWidget />
                </div>
            </section>
            
            {/* Policies Section */}
            <section className="bg-white py-12 border-t border-gray-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <h2 className="text-3xl font-serif text-gray-900 text-center mb-8">
                        Good to Know
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        
                        {/* Policy Card 1: Attire */}
                        <div className="p-4">
                            <FaUserTie className="text-4xl text-amber-600 mb-2 mx-auto" />
                            <h4 className="font-semibold mb-1">Dress Code</h4>
                            <p className="text-sm text-gray-600">Smart Casual. Jackets preferred but not required.</p>
                        </div>

                        {/* Policy Card 2: Cancellation */}
                        <div className="p-4">
                            <FaTimesCircle className="text-4xl text-amber-600 mb-2 mx-auto" />
                            <h4 className="font-semibold mb-1">Cancellation</h4>
                            <p className="text-sm text-gray-600">Fee for cancellations within 24 hours.</p>
                        </div>

                        {/* Policy Card 3: Large Parties */}
                        <div className="p-4">
                            <FaUsers className="text-4xl text-amber-600 mb-2 mx-auto" />
                            <h4 className="font-semibold mb-1">Large Parties</h4>
                            <p className="text-sm text-gray-600">Parties of 7+ require direct contact or Private Dining inquiry.</p>
                        </div>

                        {/* Policy Card 4: Dietary */}
                        <div className="p-4">
                            <FaLeaf className="text-4xl text-amber-600 mb-2 mx-auto" />
                            <h4 className="font-semibold mb-1">Dietary Needs</h4>
                            <p className="text-sm text-gray-600">Please note all allergies in your reservation details.</p>
                        </div>

                    </div>
                </div>
            </section>
            
            {/* Contact CTA */}
            <section className="py-16 bg-gray-900 text-white text-center">
                <h2 className="text-2xl font-serif mb-4">
                    Specific Request or Large Group?
                </h2>
                <a 
                    href="/contact" 
                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
                >
                    Contact Us Directly
                </a>
            </section>
        </main>
         <FooterComponent />
        </>
    );
};

export default BookATable;