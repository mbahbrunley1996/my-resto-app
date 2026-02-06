

// pages/menu.js
// Note: Using metadata export for App Router instead of next/head
import HeroMenuComponent from '@/components/HeroMenu/HeroComponent';
import MenuSectionComponent from '@/components/MenuSection/MenuSectionComponent';
import FooterComponent from '@/components/Footer/FooterComponent';

export const metadata = {
  title: 'Restro. - Our Menu',
};

const MenuPage = () => {
  return (
    <>
      <main>
        <HeroMenuComponent />
        <MenuSectionComponent />
      </main>
      
      <FooterComponent />
    </>
  );
};

export default MenuPage;