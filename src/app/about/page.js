
import AboutUsHero from '@/components/AboutUs/AboutUsHero';
import OurStorySection from '@/components/AboutUs/OurStorySection';
import MeetTheChef from '@/components/AboutUs/MeetTheChef';
import AmbianceCTA from '@/components/AboutUs/AmbianceCTA';
import FooterComponent from '@/components/Footer/FooterComponent';

export default function AboutPage() {
    return (
        <>
        <main>
            <AboutUsHero />
            <OurStorySection />
            <MeetTheChef />
            <AmbianceCTA />
        </main>
        <FooterComponent />
        </>
    );
}