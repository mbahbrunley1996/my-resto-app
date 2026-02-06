
"use client";
// app/page.js

import HeroComponent from '@/components/HeroMenu/HeroComponent';
import BlogSnippetComponent from '@/components/BlogSnippet/BlogSnippetComponent';
import FeaturetteSectionComponent from '@/components/FeaturetteSection/FeaturetteSectionComponent';
import FooterComponent from '@/components/Footer/FooterComponent';
import GallerySection from '@/components/GallarySection/GallarySection';
import ServiceSplit from '@/components/Service/ServiceSplit';

const HomePage = () => {
    return (
        <>
            <main>
                <HeroComponent />
                <FeaturetteSectionComponent />
                <GallerySection isSnippet={true} />
                <BlogSnippetComponent />
                <ServiceSplit />
            </main>
            <FooterComponent />
        </>
    );
};
export default HomePage;
