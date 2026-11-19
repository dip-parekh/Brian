import { useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { ServicesSection } from './components/ServicesSection';
import { studioConfig } from './config/studioConfig';

export function App() {
  const [styleSelection, setStyleSelection] = useState<{
    style: string;
    nonce: number;
  } | null>(null);

  useEffect(() => {
    document.title = `${studioConfig.brand.studioName} | Professional Tattoo Artist & Custom Tattoo Designs`;
  }, []);

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEnquireStyle = (styleValue: string) => {
    setStyleSelection({ style: styleValue, nonce: Date.now() });
    scrollToSection('booking-form');
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[#C49A6C] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-[#080808]"
      >
        Skip to main content
      </a>

      <Navbar onBookClick={() => scrollToSection('contact')} />

      <main id="main-content">
        <HeroSection
          onExploreClick={() => scrollToSection('work')}
          onBookClick={() => scrollToSection('contact')}
        />
        <AboutSection />
        <PortfolioSection onEnquireStyle={handleEnquireStyle} />
        <ServicesSection onEnquireStyle={handleEnquireStyle} />
        <ProcessSection />
        <ContactSection styleSelection={styleSelection} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
