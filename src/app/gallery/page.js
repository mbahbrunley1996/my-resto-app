
"use client";

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FooterComponent from '@/components/Footer/FooterComponent';

const GalleryPage = () => {
    const galleryData = [
        {
            title: "The Atmosphere",
            category: "Interior",
            description: "A blend of minimalist architecture and warm, organic textures.",
            images: ["/gallery/interior-x.png", "/gallery/interior-y.png", "/gallery/interior-t.png", "/gallery/bar-scene.png", "/gallery/interior-main.png", "/gallery/private-dinning.png", "/gallery/table-setting.png"]
        },
        {
            title: "Culinary Art",
            category: "Food",
            description: "Plates designed with precision and seasonal ingredients.",
            images: [ "/gallery/vegetable-fufucorn.png", "/gallery/spark-eggs.png", "/gallery/eru-apark.png", "/gallery/arishpotatoes.png", "/gallery/spaghetti-spark.png", "/gallery/ripeplantain-ndolle.png", "/gallery/rice sauce.png", "/gallery/noddles.png", "/gallery/jlove-spark.png", "/gallery/hot-tea.png", "/gallery/achu-spark.png", "/gallery/perfect-sear.png", "/gallery/fresh-oysters.png", "/gallery/pasta-plating.png"]
        },
        {
            title: "Liquid Gold",
            category: "Drinks",
            description: "Crafted cocktails and a curated cellar of vintage wines.",
            images: ["/gallery/whisky-collection.png", "/gallery/sommelier-pour.png", "/gallery/softdrink-collection.png", "/gallery/smoked-drink.png", "/gallery/redwine-collection.png", "/gallery/natual juice.png", "/gallery/heeneken.png", "/gallery/guinness.png", "/gallery/icewind-collection.png",]
        },
        {
            title: "Private Occasions",
            category: "Events",
            description: "Memorable gatherings in our bespoke event spaces.",
            images: ["/gallery/party-table.png", "/gallery/local ingredient.png", "/gallery/full-table-party-dishes.png"]
        }
    ];

    return (
        <>
        <main className="pt-32 pb-24 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-20 text-center">
                    <h1 className="text-5xl font-serif uppercase tracking-tighter mb-4">The <span className="text-amber-600">Visuals</span></h1>
                    <div className="w-20 h-1 bg-amber-600 mx-auto mb-6"></div>
                    <p className="text-gray-500 italic max-w-xl mx-auto">Explore the different dimensions of The Essence, from our kitchen to your table.</p>
                </header>

                {galleryData.map((section, index) => (
                    <div key={index} className="mb-32">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                            <div>
                                <span className="text-amber-600 text-[10px] uppercase tracking-[0.4em] font-bold">{section.category}</span>
                                <h2 className="text-3xl font-serif mt-2 uppercase tracking-widest">{section.title}</h2>
                            </div>
                            <p className="text-gray-400 text-sm max-w-md md:text-right italic">
                                {section.description}
                            </p>
                        </div>

                        {/* The Carousel */}
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 5000 }}
                            breakpoints={{
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 2.5 }
                            }}
                            className="rounded-sm overflow-hidden shadow-xl"
                        >
                            {section.images.map((img, idx) => (
                                <SwiperSlide key={idx}>
                                    <div className="relative h-[500px] w-full bg-zinc-100 group">
                                        <Image 
                                            src={img} 
                                            alt={`${section.title} ${idx}`} 
                                            fill 
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ))}
            </div>
        </main>
        <FooterComponent />
    </>
    );
};

export default GalleryPage;