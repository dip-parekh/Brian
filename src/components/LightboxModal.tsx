import { useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PortfolioItem } from '../types/portfolio';

interface LightboxModalProps {
  items: PortfolioItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onEnquireStyle: (styleValue: string) => void;
}

function mapCategoryToBookingStyle(category: string): string {
  switch (category) {
    case 'BLACK & GREY':
      return 'Black & Grey';
    case 'REALISM':
      return 'Realism';
    case 'FINE LINE':
      return 'Fine Line';
    case 'TRIBAL':
      return 'Tribal';
    case 'GEOMETRIC':
      return 'Geometric';
    case 'TRADITIONAL':
      return 'Traditional';
    case 'CUSTOM DESIGNS':
      return 'Custom Design';
    default:
      return 'Custom Design';
  }
}

export function LightboxModal({
  items,
  activeIndex,
  onClose,
  onNavigate,
  onEnquireStyle,
}: LightboxModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;
  const activeItem = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft' && items.length > 1) {
        event.preventDefault();
        onNavigate((activeIndex! - 1 + items.length) % items.length);
      } else if (event.key === 'ArrowRight' && items.length > 1) {
        event.preventDefault();
        onNavigate((activeIndex! + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [activeIndex, isOpen, items.length, onClose, onNavigate]);

  if (!isOpen || !activeItem) {
    return null;
  }

  const handlePrevious = () => {
    onNavigate((activeIndex - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    onNavigate((activeIndex + 1) % items.length);
  };

  const handleEnquire = () => {
    const mappedStyle = mapCategoryToBookingStyle(activeItem.primaryCategory);
    onClose();
    onEnquireStyle(mappedStyle);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Tattoo portfolio detail: ${activeItem.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]/95 p-4 backdrop-blur-md sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden border border-[#303030] bg-[#141414] lg:grid lg:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close artwork gallery"
          className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-[#303030] bg-[#080808]/90 text-[#F5F5F5] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C]"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Image Stage */}
        <div className="relative flex items-center justify-center bg-[#080808] p-4 sm:p-8 lg:col-span-8">
          <img
            src={activeItem.image}
            alt={activeItem.alt}
            className="max-h-[55vh] w-auto max-w-full object-contain lg:max-h-[78vh]"
          />

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous artwork"
                className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer border border-[#303030] bg-[#080808]/85 p-2.5 text-[#F5F5F5] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C] sm:left-5"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next artwork"
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer border border-[#303030] bg-[#080808]/85 p-2.5 text-[#F5F5F5] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C] sm:right-5"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Right Editorial Metadata Panel */}
        <div className="flex flex-col justify-between overflow-y-auto border-t border-[#303030] p-6 sm:p-8 lg:col-span-4 lg:border-t-0 lg:border-l">
          <div>
            <div className="flex items-center justify-between pr-12">
              <span className="border border-[#C49A6C]/50 bg-[#C49A6C]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C49A6C]">
                {activeItem.primaryCategory}
              </span>
              <span className="text-xs tracking-[0.2em] text-[#A0A0A0]">
                {String(activeIndex + 1).padStart(2, '0')} /{' '}
                {String(items.length).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-6 font-display text-2xl font-semibold text-[#F5F5F5] sm:text-3xl">
              {activeItem.title}
            </h3>

            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#A0A0A0]">
              Placement: <span className="text-[#F5F5F5]">{activeItem.placement}</span>
            </p>

            <p className="mt-5 text-sm leading-relaxed text-[#A0A0A0]">
              {activeItem.description}
            </p>

            {activeItem.categories.length > 1 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {activeItem.categories.map((cat) => (
                  <span
                    key={cat}
                    className="border border-[#303030] bg-[#1C1C1C] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#A0A0A0]"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 space-y-4 border-t border-[#303030] pt-6">
            <button
              type="button"
              onClick={handleEnquire}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-[#C49A6C] px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#080808] transition-colors hover:bg-[#D4AE82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C]"
            >
              <span>Enquire About This Style</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            {items.length > 1 && (
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex-1 cursor-pointer border border-[#303030] py-2.5 text-xs uppercase tracking-[0.18em] text-[#A0A0A0] transition-colors hover:border-[#C49A6C] hover:text-[#F5F5F5]"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 cursor-pointer border border-[#303030] py-2.5 text-xs uppercase tracking-[0.18em] text-[#A0A0A0] transition-colors hover:border-[#C49A6C] hover:text-[#F5F5F5]"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
