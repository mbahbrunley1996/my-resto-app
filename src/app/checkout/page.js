"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { addOrder } from '@/lib/localStorage';
import { FaCheckCircle, FaPrint, FaHome, FaCalendarAlt, FaUtensils } from 'react-icons/fa';

const CheckoutPage = () => {
    // Added 'clearCart' - ensure this is defined in your CartContext!
    const { cart, removeFromCart, addToCart, decrementQuantity, cartTotal, clearCart } = useCart();
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('idle'); 
    const [orderId, setOrderId] = useState('');
    
    // Store the final amounts when payment succeeds (before cart is cleared)
    const [finalAmounts, setFinalAmounts] = useState({
        subtotal: 0,
        tax: 0,
        total: 0
    });

    // --- FORMAL TAX CALCULATIONS ---
    const taxRate = 0.08; // 8%
    const taxAmount = cartTotal * taxRate;
    const grandTotal = cartTotal + taxAmount;

    const handlePayment = async () => {
        setIsProcessing(true);
        
        // Save the amounts BEFORE clearing the cart
        const savedAmounts = {
            subtotal: cartTotal,
            tax: cartTotal * taxRate,
            total: cartTotal + (cartTotal * taxRate)
        };

        // Save current cart items for the order
        const orderItems = [...cart];
        
        // Simulate bank delay
        setTimeout(() => {
            const success = Math.random() > 0.05; // 95% success rate

            if (success) {
                // Save order to localStorage
                const savedOrder = addOrder({
                    items: orderItems,
                    subtotal: savedAmounts.subtotal,
                    tax: savedAmounts.tax,
                    total: savedAmounts.total
                });
                
                setOrderId(savedOrder.id);
                setFinalAmounts(savedAmounts); // Store the amounts
                setPaymentStatus('success');
                if(clearCart) clearCart(); // Empty the bag after payment
            } else {
                setPaymentStatus('error');
                setIsProcessing(false);
            }
        }, 2000);
    };

    // --- 1. SUCCESS STATE (THE INVOICE RECEIPT) ---
    if (paymentStatus === 'success') {
        return (
            <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white flex flex-col items-center justify-center px-6 py-20">
                <div className="max-w-md w-full bg-white border border-zinc-100 p-8 shadow-2xl rounded-sm">
                    {/* Success Header */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCheckCircle className="text-4xl" />
                        </div>
                        <h2 className="text-2xl font-serif uppercase tracking-widest">Payment Received</h2>
                        <p className="text-gray-400 text-[10px] mt-2 tracking-widest uppercase">Order {orderId}</p>
                    </div>

                    {/* Receipt Details */}
                    <div className="space-y-3 border-t border-b border-zinc-100 py-6 mb-6 font-light text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500 uppercase">Subtotal</span>
                            <span>FCFA {finalAmounts.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 uppercase">Sales Tax (8%)</span>
                            <span>FCFA {finalAmounts.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t border-zinc-50">
                            <span className="uppercase">Total Paid</span>
                            <span className="text-amber-600">FCFA {finalAmounts.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Print Receipt */}
                    <button 
                        onClick={() => window.print()} 
                        className="w-full text-[10px] uppercase tracking-widest text-gray-400 hover:text-black mb-6 transition-colors font-bold flex items-center justify-center gap-2"
                    >
                        <FaPrint /> Print Receipt
                    </button>

                    {/* Book a Table CTA */}
                    <div className="bg-amber-50 border border-amber-200 rounded-sm p-6 mb-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaUtensils className="text-amber-600 text-lg" />
                            </div>
                            <div>
                                <h3 className="font-serif text-lg text-gray-800 mb-1">Dine With Us?</h3>
                                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                                    Enjoy your meal in our elegant dining room. Reserve a table and experience THE ESSENCE ambiance.
                                </p>
                                <Link 
                                    href="/reservations"
                                    className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-700 transition-all rounded-sm"
                                >
                                    <FaCalendarAlt /> Book a Table
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Back to Home */}
                    <Link 
                        href="/" 
                        className="flex items-center justify-center gap-2 w-full bg-zinc-900 text-white text-center py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all"
                    >
                        <FaHome /> Back to Home
                    </Link>
                </div>

                {/* Additional Info */}
                <p className="text-[10px] text-gray-400 mt-8 text-center max-w-md">
                    A confirmation email has been sent. Your order will be ready for pickup in approximately 20-30 minutes.
                </p>
            </div>
        );
    }

    // --- 2. EMPTY STATE ---
    if (cart.length === 0 && paymentStatus !== 'success') {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaUtensils className="text-4xl text-gray-300" />
                    </div>
                    <h2 className="text-2xl font-serif mb-4 uppercase tracking-widest">Your Bag is Empty</h2>
                    <p className="text-gray-500 mb-8 text-sm">Looks like you haven't added any items yet.</p>
                    <Link href="/menu" className="border border-amber-600 text-amber-600 px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-amber-600 hover:text-white transition-all inline-block">
                        Browse Our Menu
                    </Link>
                </div>
            </div>
        );
    }

    // --- 3. CHECKOUT FORM ---
    return (
        <main className="pt-32 pb-24 bg-zinc-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-serif mb-12 uppercase tracking-tighter">Review <span className="text-amber-600">Order</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    
                    {/* --- LEFT: ITEMS --- */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center gap-6 bg-white p-6 rounded-sm border border-zinc-100">
                                <div className="relative w-20 h-20 flex-shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-serif text-lg">{item.name}</h3>
                                    <p className="text-gray-400 text-[10px] uppercase tracking-widest">{item.category}</p>
                                    <button onClick={() => removeFromCart(item.id)} className="text-[9px] text-red-800 uppercase font-bold mt-2">Remove</button>
                                </div>
                                
                                <div className="flex items-center space-x-3 border px-3 py-1 border-zinc-100">
                                    <button onClick={() => decrementQuantity(item.id)} className="text-lg hover:text-amber-600">−</button>
                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => addToCart(item)} className="text-lg hover:text-amber-600">+</button>
                                </div>

                                <div className="text-right min-w-[80px]">
                                    <p className="font-bold">FCFA {(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- RIGHT: THE INVOICE SUMMARY --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-zinc-900 text-white p-8 sticky top-32 rounded-sm">
                            <h2 className="text-xl font-serif mb-8 uppercase tracking-widest border-b border-white/10 pb-4 text-amber-500">Invoice</h2>
                            
                            <div className="space-y-4 mb-8 text-xs font-light tracking-wider">
                                <div className="flex justify-between">
                                    <span className="text-gray-400 uppercase">Subtotal</span>
                                    <span>FCFA {cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400 uppercase">VAT / Sales Tax (8%)</span>
                                    <span>FCFA {taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="h-[1px] bg-white/10 w-full my-4"></div>
                                <div className="flex justify-between text-lg font-bold">
                                    <span className="uppercase tracking-widest">Grand Total</span>
                                    <span className="text-amber-500">FCFA {grandTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {paymentStatus === 'error' && (
                                <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 text-[10px] uppercase mb-4 text-center">
                                    Transaction Failed. Please check card details.
                                </div>
                            )}

                            <button 
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className={`w-full py-5 text-[10px] font-bold uppercase tracking-[0.4em] transition-all flex items-center justify-center
                                    ${isProcessing ? 'bg-zinc-800 text-zinc-500' : 'bg-amber-600 hover:bg-amber-700'}
                                `}
                            >
                                {isProcessing ? 'Verifying...' : 'Pay & Confirm Order'}
                            </button>
                            
                            <p className="text-[8px] text-gray-500 mt-6 text-center leading-relaxed uppercase tracking-widest">
                                Secure Encrypted Transaction
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;