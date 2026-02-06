
// components/Booking/ReservationWidget.js

// const ReservationWidget = () => {
//     return (
//         <div className="mx-auto max-w-2xl p-6 lg:p-10 bg-white shadow-xl rounded-lg">
//             <h3 className="text-3xl font-serif text-gray-900 text-center mb-6">
//                 Find a Table
//             </h3>
            
//             {/* This is where the embed code (iframe or script) from OpenTable/Resy/Tock goes.
//               For demonstration, we use a placeholder: 
//             */}
//             <div className="bg-gray-100 p-8 border border-dashed border-gray-300 h-96 flex items-center justify-center text-gray-500">
//                 [Third-Party Reservation Widget Placeholder]
//                 {/* Example: <ResyWidget apiKey="..." /> or OpenTable iFrame */}
//             </div>
            
//         </div>
//     );
// };
// export default ReservationWidget;

// components/Booking/ReservationWidget.js
"use client";

import React, { useState } from 'react';
import { addReservation } from '@/lib/localStorage';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaClock, FaUsers, FaUtensils, FaCheckCircle } from 'react-icons/fa';

const ReservationWidget = () => {
    const [bookingData, setBookingData] = useState({
        name: '',
        email: '',
        phone: '',
        date: new Date().toISOString().split('T')[0],
        time: '19:00',
        guests: '2',
        occasion: '',
        command: ''
    });
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState(null);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!bookingData.name.trim()) newErrors.name = 'Name is required';
        if (!bookingData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(bookingData.email)) newErrors.email = 'Invalid email format';
        if (!bookingData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!bookingData.date) newErrors.date = 'Date is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSearch = () => {
        if (!validateForm()) return;

        setIsSearching(true);
        setResult(null);

        setTimeout(() => {
            setIsSearching(false);
            const tableNumber = Math.floor(Math.random() * 20) + 1;
            const reservationId = `ESS-RES-${Math.floor(Math.random() * 9000) + 1000}`;

            // Save to localStorage
            const savedReservation = addReservation({
                name: bookingData.name,
                email: bookingData.email,
                phone: bookingData.phone,
                date: bookingData.date,
                time: bookingData.time,
                guests: bookingData.guests,
                occasion: bookingData.occasion,
                specialRequests: bookingData.command,
                tableNumber: tableNumber,
                reservationId: reservationId
            });

            setResult({
                message: `Confirmed! Table #${tableNumber} is ready for ${bookingData.guests} guests.`,
                details: `Date: ${new Date(bookingData.date).toDateString()} | Time: ${bookingData.time}`,
                chefNote: bookingData.command ? `Chef's Note: "${bookingData.command}"` : "Standard Menu Service",
                id: reservationId,
                guestName: bookingData.name
            });

            // Reset form
            setBookingData({
                name: '',
                email: '',
                phone: '',
                date: new Date().toISOString().split('T')[0],
                time: '19:00',
                guests: '2',
                occasion: '',
                command: ''
            });
        }, 1500);
    };

    const occasions = ['', 'Birthday', 'Anniversary', 'Business Dinner', 'Date Night', 'Celebration', 'Other'];

    return (
        <>
        <div className="mx-auto max-w-2xl p-8 bg-white shadow-2xl border-t-4 border-amber-600">
            <h3 className="text-3xl font-serif text-center mb-2 uppercase tracking-tighter">Secure Your <span className="text-amber-600">Experience</span></h3>
            <p className="text-center text-gray-400 text-[10px] uppercase tracking-widest mb-8 text-balance">Personalized fine dining at your fingertips</p>
            
            <div className="space-y-4">
                {/* GUEST INFORMATION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-1 flex items-center gap-2">
                            <FaUser className="text-amber-600" /> Full Name *
                        </label>
                        <input 
                            type="text" 
                            placeholder="Your full name"
                            className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-zinc-200'} text-sm focus:border-amber-600 outline-none transition-all`}
                            value={bookingData.name}
                            onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-1 flex items-center gap-2">
                            <FaEnvelope className="text-amber-600" /> Email *
                        </label>
                        <input 
                            type="email" 
                            placeholder="your@email.com"
                            className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-zinc-200'} text-sm focus:border-amber-600 outline-none transition-all`}
                            value={bookingData.email}
                            onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-1 flex items-center gap-2">
                            <FaPhone className="text-amber-600" /> Phone *
                        </label>
                        <input 
                            type="tel" 
                            placeholder="+237 6XX XXX XXX"
                            className={`w-full p-3 border ${errors.phone ? 'border-red-500' : 'border-zinc-200'} text-sm focus:border-amber-600 outline-none transition-all`}
                            value={bookingData.phone}
                            onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-1 flex items-center gap-2">
                            <FaUtensils className="text-amber-600" /> Occasion
                        </label>
                        <select 
                            className="w-full p-3 border border-zinc-200 text-sm focus:border-amber-600 outline-none"
                            value={bookingData.occasion}
                            onChange={(e) => setBookingData({...bookingData, occasion: e.target.value})}
                        >
                            {occasions.map(occ => <option key={occ} value={occ}>{occ || 'Select occasion (optional)'}</option>)}
                        </select>
                    </div>
                </div>

                {/* RESERVATION DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-1 flex items-center gap-2">
                            <FaCalendarAlt className="text-amber-600" /> Date *
                        </label>
                        <input 
                            type="date" 
                            className={`w-full p-3 border ${errors.date ? 'border-red-500' : 'border-zinc-200'} text-sm focus:border-amber-600 outline-none transition-all`}
                            value={bookingData.date}
                            min={new Date().toISOString().split('T')[0]}
                            onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-1 flex items-center gap-2">
                            <FaClock className="text-amber-600" /> Time
                        </label>
                        <select 
                            className="w-full p-3 border border-zinc-200 text-sm focus:border-amber-600 outline-none"
                            value={bookingData.time}
                            onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                        >
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="18:00">6:00 PM</option>
                            <option value="19:00">7:00 PM</option>
                            <option value="20:00">8:00 PM</option>
                            <option value="21:00">9:00 PM</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mb-1 flex items-center gap-2">
                            <FaUsers className="text-amber-600" /> Guests
                        </label>
                        <select 
                            className="w-full p-3 border border-zinc-200 text-sm focus:border-amber-600 outline-none"
                            value={bookingData.guests}
                            onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>)}
                        </select>
                    </div>
                </div>

                {/* THE CULINARY COMMAND BOX */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Culinary Commands / Special Requests</label>
                    <textarea 
                        placeholder="e.g. 'Extra spice in the Ndole', 'Allergy to peanuts', 'It's our 5th Anniversary'..."
                        className="p-4 border border-zinc-200 text-sm min-h-[100px] focus:border-amber-600 outline-none italic"
                        value={bookingData.command}
                        onChange={(e) => setBookingData({...bookingData, command: e.target.value})}
                    />
                </div>

                <button 
                    onClick={handleSearch}
                    disabled={isSearching}
                    className="w-full bg-zinc-900 text-white py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-amber-600 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSearching ? "Transmitting to Kitchen..." : "Finalize Reservation"}
                </button>

                {/* DYNAMIC RESULT WITH CHEF NOTE */}
                {result && (
                    <div className="mt-8 p-8 bg-zinc-900 text-white border-b-4 border-amber-600 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="text-center mb-6">
                            <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
                            <span className="bg-amber-600 text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter">Reservation Confirmed</span>
                        </div>
                        
                        <div className="space-y-4 text-center">
                            <h4 className="font-serif text-2xl">{result.message}</h4>
                            <p className="text-white/80">Welcome, <span className="text-amber-500 font-semibold">{result.guestName}</span>!</p>
                            <p className="text-zinc-400 text-xs tracking-widest">{result.details}</p>
                            
                            {/* The "Command" displayed back to user */}
                            <div className="py-3 px-4 bg-white/5 border border-white/10 rounded italic text-amber-500 text-sm">
                                {result.chefNote}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between items-center text-[10px] text-zinc-500 font-mono border-t border-white/10 pt-4">
                            <span>ID: {result.id}</span>
                            <span className="uppercase tracking-widest text-amber-600">The Essence Timeless</span>
                        </div>

                        <p className="text-center text-xs text-zinc-500 mt-4">
                            A confirmation email will be sent to your inbox shortly.
                        </p>
                    </div>
                )}
            </div>
        </div>
        </>
    );
};

export default ReservationWidget;