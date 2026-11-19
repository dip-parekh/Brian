import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { studioConfig } from '../config/studioConfig';
import { useActiveSection } from '../hooks/useActiveSection';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  onBookClick: () => void;
}

export function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    setMobileOpen(false);
    const id = href.replace('#', '');
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookSession = () => {
    setMobileOpen(false);
    onBookClick();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'border-b border-[#303030] bg-[#080808]/95 py-3.5 backdrop-blur-md'
            : 'border-b border-transparent bg-gradient-to-b from-[#080808]/80 to-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A6C]"
            aria-label={`${studioConfig.brand.studioName} — Back to top`}
          >
            <BrandMark />
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 lg:flex"
          >
            <ul className="flex items-center gap-8">
              {studioConfig.navigation.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`group relative py-1 text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A6C] ${
                        isActive
                          ? 'text-[#C49A6C]'
                          : 'text-[#F5F5F5]/80 hover:text-[#F5F5F5]'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-0 -bottom-0.5 h-px bg-[#C49A6C] transition-transform duration-300 origin-left ${
                          isActive
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={handleBookSession}
              className="cursor-pointer border border-[#C49A6C] bg-[#C49A6C] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#080808] transition-all duration-200 hover:bg-[#D4AE82] hover:border-[#D4AE82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C]"
            >
              BOOK A SESSION
            </button>
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={handleBookSession}
              className="hidden cursor-pointer border border-[#C49A6C] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C49A6C] transition-colors hover:bg-[#C49A6C] hover:text-[#080808] sm:inline-flex"
            >
              BOOK A SESSION
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-[#303030] bg-[#141414]/80 text-[#F5F5F5] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C]"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation-drawer"
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          mobileOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-[#080808]/95 backdrop-blur-lg"
          onClick={() => setMobileOpen(false)}
        />
        <div className="relative flex h-full flex-col justify-between px-6 py-6 sm:px-10">
          <div className="flex items-center justify-between border-b border-[#303030] pb-5">
            <BrandMark compact />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-[#303030] text-[#F5F5F5] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="my-auto py-8">
            <ul className="space-y-6">
              {studioConfig.navigation.map((item, idx) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      tabIndex={mobileOpen ? 0 : -1}
                      className={`group flex items-baseline gap-4 font-display text-3xl tracking-wide transition-colors sm:text-4xl ${
                        isActive
                          ? 'text-[#C49A6C]'
                          : 'text-[#F5F5F5] hover:text-[#C49A6C]'
                      }`}
                    >
                      <span className="font-sans text-xs tracking-[0.2em] text-[#C49A6C]/80">
                        0{idx + 1}
                      </span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-5 border-t border-[#303030] pt-6">
            <button
              type="button"
              onClick={handleBookSession}
              tabIndex={mobileOpen ? 0 : -1}
              className="w-full cursor-pointer bg-[#C49A6C] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#080808] transition-colors hover:bg-[#D4AE82]"
            >
              BOOK A SESSION
            </button>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A0A0A0]">
              <span>{studioConfig.contact.addressDisplay}</span>
              <span>{studioConfig.contact.phoneDisplay}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
