
// components/AboutUs/AboutUsHero.js

const AboutUsHero = () => {
    // Using one of our existing strong images for the background
    const BG_IMAGE_URL = '/gallery/local ingredient.png'; 

    return (
        <section 
            className="h-[350px] flex items-end justify-center text-center pt-14 relative"
            style={{ 
                backgroundImage: `url('${BG_IMAGE_URL}')`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                marginTop: '5rem' // Below fixed header
            }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            
            <div className="relative z-10 text-white pb-8">
                <p className="font-serif text-5xl mb-3">Our Story</p>
                <nav className="text-sm font-semibold">
                    <a href="#" className="hover:text-amber-600 transition">Home</a>
                    <span className="mx-2">/</span>
                    <a href="#" className="text-amber-600">About Us</a>
                </nav>
            </div>
        </section>
    );
};

export default AboutUsHero;