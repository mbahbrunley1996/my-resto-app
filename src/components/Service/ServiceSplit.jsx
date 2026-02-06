
// components/ServiceSplit.js
import Link from 'next/link';
import Image from 'next/image';

const ServiceSplit = () => {
    return (
        <section className="bg-white py-0 overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
                
                {/* --- LEFT SIDE: THE DINING ROOM --- */}
                <div className="relative w-full lg:w-1/2 flex items-center justify-center p-12 group">
                    {/* Background Image */}
                    <Image 
                        src="/taste/image.png" // Change to your plated food image
                        alt="Fine dining experience"
                        fill
                        className="object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-1000"
                    />
                    
                    <div className="relative z-10 text-center text-white">
                        <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                            Experience
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">The Dining Room</h2>
                        <p className="max-w-md mx-auto mb-8 text-gray-300 font-light leading-relaxed">
                            Savor the heat of the kitchen delivered straight to your table. 
                            An immersive atmosphere designed for the art of the meal.
                        </p>
                        <Link href="/menu" className="inline-block border border-white px-8 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                            View Full Menu
                        </Link>
                    </div>
                </div>

                {/* --- RIGHT SIDE: THE BOUTIQUE / TO-GO --- */}
                <div className="relative w-full lg:w-1/2 flex items-center justify-center p-12 group bg-zinc-900">
                    {/* Background Image */}
                    <Image 
                        src="/image.png" // Change to your packaging/to-go image
                        alt="Premium packaged food to go"
                        fill
                        className="object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-1000 opacity-60"
                    />
                    
                    <div className="relative z-10 text-center text-white">
                        <span className="text-amber-500 uppercase tracking-[0.4em] text-xs font-bold mb-4 block">
                            To-Go & Retail
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">Essence To-Go</h2>
                        <p className="max-w-md mx-auto mb-8 text-gray-300 font-light leading-relaxed">
                            Chef-prepared meals meticulously packaged for your journey. 
                            Bring the culinary excellence of our kitchen into your home.
                        </p>
                        <Link href="/menu" className="inline-block bg-amber-600 px-8 py-3 text-[11px] uppercase tracking-[0.3em] hover:bg-amber-700 transition-all">
                            Order for Pickup
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServiceSplit;