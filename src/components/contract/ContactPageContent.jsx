
// components/Contact/ContactPageContent.js
"use client";

import React, { useState } from 'react';
import { FaClock, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaGlassCheers } from 'react-icons/fa';
import FooterComponent from '../Footer/FooterComponent';

const ContactPageContent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
            setLoading(false);
        }, 1500);
    };

    return (
        <>
        <main className="pt-20 lg:pt-28"> 
            
            {/* Contact Hero - Simple Header */}
            <header className="text-center py-12 bg-gray-50">
                <p className="text-sm font-semibold uppercase tracking-widest text-amber-600 mb-2">
                    Connect With Us
                </p>
                <h1 className="text-5xl font-serif text-gray-900">
                    Reach Out to The Essence
                </h1>
            </header>

            {/* Section 1: Contact Details & Hours (Split Layout) */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* Column 1: Operating Hours */}
                        <div className="bg-white p-8 border-t-4 border-amber-600 shadow-lg rounded-lg">
                            <h3 className="text-2xl font-serif text-gray-900 mb-4 flex items-center">
                                <FaClock className="text-amber-600 mr-3 text-2xl" />
                                Operating Hours
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex justify-between border-b border-gray-100 pb-1">
                                    <span className="font-semibold">Dinner Service:</span>
                                    <span>Mon - Sat: 5:00 PM - 10:00 PM</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-1">
                                    <span className="font-semibold">Lunch Service:</span>
                                    <span>Fri: 12:00 PM - 2:30 PM (Lounge Only)</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-100 pb-1">
                                    <span className="font-semibold">Sunday:</span>
                                    <span>Closed</span>
                                </li>
                            </ul>
                            <p className="text-sm text-gray-500 mt-4 italic">
                                Reservations are highly recommended for dinner service.
                            </p>
                        </div>

                        {/* Column 2: Contact Info */}
                        <div className="bg-white p-8 border-t-4 border-amber-600 shadow-lg rounded-lg">
                            <h3 className="text-2xl font-serif text-gray-900 mb-4 flex items-center">
                                <FaPhone className="text-amber-600 mr-3 text-2xl" />
                                Contact Information
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li>
                                    <span className="font-semibold">Reservations:</span> 
                                    <br/> (555) 123-4567
                                </li>
                                <li>
                                    <span className="font-semibold">General Inquiry:</span> 
                                    <br/> brunleym@gmail.com
                                </li>
                                <li>
                                    <span className="font-semibold">Media & Press:</span> 
                                    <br/> press@theessence.com
                                </li>
                            </ul>
                            <a href="#inquiry-form" className="inline-block mt-6 text-sm font-semibold text-amber-600 hover:text-amber-700 transition">
                                Or Send Us a Message &rarr;
                            </a>
                        </div>
                        
                        {/* Column 3: Location */}
                        <div className="bg-white p-8 border-t-4 border-amber-600 shadow-lg rounded-lg">
                            <h3 className="text-2xl font-serif text-gray-900 mb-4 flex items-center">
                                <FaMapMarkerAlt className="text-amber-600 mr-3 text-2xl" />
                                Our Location
                            </h3>
                            <address className="not-italic text-gray-600 space-y-1">
                                <p className="font-semibold">THE ESSENCE</p>
                                <p>Akwa Palace, Suite 101</p>
                                <p>Douala, Cameroon</p>
                            </address>
                            <a 
                                href="https://maps.app.goo.gl/example" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-block mt-6 text-sm font-semibold text-amber-600 hover:text-amber-700 transition"
                            >
                                Get Directions &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Inquiry Form (Full Width) */}
            <section id="inquiry-form" className="py-20 bg-gray-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <h2 className="text-3xl font-serif text-gray-900 text-center mb-10">
                        Send Us a Quick Message
                    </h2>
                    
                    {submitted ? (
                        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg text-center">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FaPaperPlane className="text-2xl" />
                            </div>
                            <h3 className="text-2xl font-serif text-gray-900 mb-2">Message Sent!</h3>
                            <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input 
                                    type="text" 
                                    placeholder="Your Full Name" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition-all" 
                                    required 
                                />
                                <input 
                                    type="email" 
                                    placeholder="Your Email Address" 
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="border border-gray-300 p-3 rounded focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition-all" 
                                    required 
                                />
                            </div>
                            <input 
                                type="tel" 
                                placeholder="Phone Number (Optional)" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="border border-gray-300 p-3 rounded w-full focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition-all" 
                            />
                            <textarea 
                                rows="5" 
                                placeholder="Your Message or Inquiry..." 
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                className="border border-gray-300 p-3 rounded w-full focus:ring-2 focus:ring-amber-600 focus:border-amber-600 outline-none transition-all" 
                                required
                            ></textarea>
                            
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    We aim to respond within 24 business hours.
                                </p>
                                <button 
                                    type="submit" 
                                    disabled={loading}
                                    className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-md flex items-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <FaPaperPlane />
                                            Submit Inquiry
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* Section 3: Interactive Map (Visual Location) */}
            <section className="h-96 w-full relative">
                <div className="absolute inset-0">
                    <iframe 
                        title="Restaurant Location Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8531!2d9.7003!3d4.0511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDMnMDQuMCJOIDnCsDQyJzAxLjEiRQ!5e0!3m2!1sen!2scm!4v1625097600000" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy"
                    ></iframe>
                </div>
            </section>
            
            {/* Section 4: Private Events CTA (Final Upsell) */}
            <section className="py-20 bg-gray-900 text-white text-center">
                <FaGlassCheers className="text-5xl text-amber-600 mx-auto mb-4" />
                <h2 className="text-4xl font-serif text-amber-600 mb-4">
                    Planning a Special Event?
                </h2>
                <p className="text-gray-300 max-w-xl mx-auto mb-8">
                    For large parties, corporate functions, or exclusive buy-outs, please contact us for personalized arrangements.
                </p>
                <a 
                    href="/reservations" 
                    className="bg-white text-gray-900 hover:bg-gray-200 font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
                >
                    Make a Reservation &rarr;
                </a>
            </section>
        </main>
        <FooterComponent />
        </>
    );
};

export default ContactPageContent;