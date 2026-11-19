import { ArrowUpRight } from 'lucide-react';
import { studioConfig } from '../config/studioConfig';
import { useReveal } from '../hooks/useReveal';

interface ServicesSectionProps {
  onEnquireStyle: (styleValue: string) => void;
}

export function ServicesSection({ onEnquireStyle }: ServicesSectionProps) {
  const { services } = studioConfig;
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id="services"
      ref={ref}
      aria-labelledby="services-heading"
      className="border-t border-[#303030]/70 bg-[#080808] py-24 lg:py-32"
    >
      <div
        className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-[#303030] pb-10 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C49A6C]" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.26em] text-[#C49A6C]">
                Tattoo Specialties
              </span>
            </div>
            <h2
              id="services-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#F5F5F5] sm:text-4xl lg:text-5xl"
            >
              {services.heading}
            </h2>
          </div>

          <p className="max-w-md font-display text-xl italic text-[#A0A0A0] lg:text-right">
            {services.subheading}
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col overflow-hidden border border-[#303030] bg-[#1C1C1C] transition-colors duration-300 hover:border-[#C49A6C]/60"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#141414]">
                <img
                  src={service.image}
                  alt={service.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-transparent to-[#080808]/30"
                />
                <span className="absolute top-4 left-4 border border-[#303030] bg-[#080808]/85 px-3 py-1 text-xs font-semibold tracking-[0.22em] text-[#C49A6C] backdrop-blur-sm">
                  {service.number}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <h3 className="font-display text-2xl font-medium text-[#F5F5F5] transition-colors group-hover:text-[#C49A6C]">
                    <span className="mr-2 text-[#C49A6C]">{service.number}.</span>
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A0A0A0]">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#303030]/80 pt-5">
                  <button
                    type="button"
                    onClick={() => onEnquireStyle(service.styleValue)}
                    className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#C49A6C] transition-colors hover:text-[#F5F5F5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C49A6C]"
                  >
                    <span>Enquire About This Style</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
