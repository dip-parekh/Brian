import { ArrowRight } from 'lucide-react';
import { studioConfig } from '../config/studioConfig';

interface HeroSectionProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

export function HeroSection({ onExploreClick, onBookClick }: HeroSectionProps) {
  const { hero } = studioConfig;

  return (
    <section
      id="home"
      aria-label="Hero showcase"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#080808] pt-24 pb-20 lg:py-32"
    >
      {/* Background Artwork Photograph */}
      <div className="absolute inset-0">
        <img
          src={hero.backgroundImage}
          alt={hero.backgroundAlt}
          className="h-full w-full object-cover object-center sm:object-right"
          loading="eager"
          decoding="async"
        />
        {/* Layered Editorial Vignettes for Cinematic Depth & Text Contrast */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60"
        />
        <div
          aria-hidden="true"
          className="film-grain pointer-events-none absolute inset-0"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#C49A6C]" aria-hidden="true" />
            <p className="text-xs font-medium uppercase tracking-[0.26em] text-[#C49A6C]">
              {hero.label}
            </p>
          </div>

          <h1 className="font-display text-4xl leading-[1.06] font-semibold tracking-tight text-[#F5F5F5] sm:text-6xl lg:text-7xl">
            <span className="block">{hero.headlineLine1}</span>
            <span className="mt-1 block italic font-normal text-[#F5F5F5]">
              {hero.headlineLine2}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-[#A0A0A0] sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onExploreClick}
              className="group inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-[#C49A6C] bg-[#C49A6C] px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#080808] transition-all duration-300 hover:bg-[#D4AE82] hover:border-[#D4AE82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C] sm:w-auto"
            >
              <span>{hero.primaryCta}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={onBookClick}
              className="inline-flex w-full cursor-pointer items-center justify-center border border-[#F5F5F5]/30 bg-[#080808]/40 px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F5F5] backdrop-blur-sm transition-all duration-300 hover:border-[#C49A6C] hover:text-[#C49A6C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C] sm:w-auto"
            >
              {hero.secondaryCta}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
        aria-label="Scroll down to About section"
        className="group absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#A0A0A0] transition-colors hover:text-[#C49A6C] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A6C]"
      >
        <span>Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-[#303030]">
          <span className="animate-scroll-line absolute inset-0 bg-[#C49A6C]" />
        </span>
      </a>
    </section>
  );
}
