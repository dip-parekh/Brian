import { useMemo, useState } from 'react';
import { Eye } from 'lucide-react';
import { studioConfig } from '../config/studioConfig';
import { useReveal } from '../hooks/useReveal';
import type { PortfolioCategory, PortfolioItem } from '../types/portfolio';
import { LightboxModal } from './LightboxModal';

interface PortfolioSectionProps {
  onEnquireStyle: (styleValue: string) => void;
}

function getAspectClass(ratio: PortfolioItem['aspectRatio']): string {
  switch (ratio) {
    case '3/4':
      return 'aspect-[3/4]';
    case '4/5':
      return 'aspect-[4/5]';
    case '1/1':
      return 'aspect-square';
    case '4/3':
      return 'aspect-[4/3]';
  }
}

export function PortfolioSection({ onEnquireStyle }: PortfolioSectionProps) {
  const { portfolio } = studioConfig;
  const { ref, isVisible } = useReveal<HTMLElement>(0.05);
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>('ALL WORK');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'ALL WORK') {
      return portfolio.items;
    }
    return portfolio.items.filter((item) =>
      item.categories.includes(selectedCategory)
    );
  }, [portfolio.items, selectedCategory]);

  const handleCategoryChange = (category: PortfolioCategory) => {
    setSelectedCategory(category);
    setLightboxIndex(null);
  };

  return (
    <section
      id="work"
      ref={ref}
      aria-labelledby="portfolio-heading"
      className="border-t border-[#303030] bg-[#141414] py-24 lg:py-32"
    >
      <div
        className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C49A6C]" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.26em] text-[#C49A6C]">
                Selected Portfolio
              </span>
            </div>
            <h2
              id="portfolio-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#F5F5F5] sm:text-4xl lg:text-5xl"
            >
              {portfolio.heading}
            </h2>
          </div>

          <p className="font-display text-xl italic text-[#A0A0A0]">
            {portfolio.subheading}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter tattoo portfolio by style"
          className="no-scrollbar mt-10 flex items-center gap-2 overflow-x-auto border-b border-[#303030] pb-4"
        >
          {portfolio.categories.map((category) => {
            const isActive = selectedCategory === category;
            const count =
              category === 'ALL WORK'
                ? portfolio.items.length
                : portfolio.items.filter((item) =>
                    item.categories.includes(category)
                  ).length;

            return (
              <button
                key={category}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(category)}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-2 border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C] ${
                  isActive
                    ? 'border-[#C49A6C] bg-[#C49A6C] text-[#080808]'
                    : 'border-[#303030] bg-[#1C1C1C] text-[#A0A0A0] hover:border-[#C49A6C]/60 hover:text-[#F5F5F5]'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] ${
                    isActive ? 'text-[#080808]/75' : 'text-[#A0A0A0]/60'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Editorial Masonry Gallery */}
        {filteredItems.length === 0 ? (
          <div className="mt-12 border border-[#303030] bg-[#1C1C1C] p-12 text-center">
            <p className="font-display text-xl text-[#F5F5F5]">
              No pieces currently listed under {selectedCategory}.
            </p>
            <button
              type="button"
              onClick={() => handleCategoryChange('ALL WORK')}
              className="mt-5 cursor-pointer border border-[#C49A6C] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#C49A6C] transition-colors hover:bg-[#C49A6C] hover:text-[#080808]"
            >
              Show All Work
            </button>
          </div>
        ) : (
          <div className="mt-10 columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="break-inside-avoid">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Open ${item.title} (${item.primaryCategory}) in full screen`}
                  className="group relative block w-full cursor-pointer overflow-hidden rounded-[2px] border border-[#303030] bg-[#1C1C1C] text-left transition-colors duration-300 hover:border-[#C49A6C]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C]"
                >
                  <div
                    className={`relative w-full overflow-hidden ${getAspectClass(
                      item.aspectRatio
                    )}`}
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle Gradient Overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {/* Top Right Quick View Icon */}
                    <span
                      aria-hidden="true"
                      className="absolute top-3.5 right-3.5 inline-flex h-8 w-8 items-center justify-center border border-[#F5F5F5]/20 bg-[#080808]/75 text-[#F5F5F5] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:border-[#C49A6C] group-hover:text-[#C49A6C] group-hover:opacity-100"
                    >
                      <Eye className="h-4 w-4" />
                    </span>

                    {/* Caption Metadata */}
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="inline-block border border-[#C49A6C]/45 bg-[#080808]/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C49A6C] backdrop-blur-xs">
                        {item.primaryCategory}
                      </span>
                      <h3 className="mt-2.5 font-display text-xl font-medium text-[#F5F5F5] transition-colors group-hover:text-[#C49A6C]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#A0A0A0]">
                        {item.placement}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full-Screen Modal Lightbox */}
      <LightboxModal
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(nextIdx) => setLightboxIndex(nextIdx)}
        onEnquireStyle={onEnquireStyle}
      />
    </section>
  );
}
