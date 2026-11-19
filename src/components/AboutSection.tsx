import { studioConfig } from '../config/studioConfig';
import { useReveal } from '../hooks/useReveal';

export function AboutSection() {
  const { about, brand } = studioConfig;
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      aria-labelledby="about-heading"
      className="relative border-t border-[#303030]/70 bg-[#080808] py-24 lg:py-32"
    >
      <div
        className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Artist Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Subtle offset editorial border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 -left-3 right-4 bottom-4 hidden border border-[#C49A6C]/35 sm:block"
              />
              <div className="relative overflow-hidden border border-[#303030] bg-[#141414]">
                <img
                  src={about.portraitImage}
                  alt={about.portraitAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-xl text-[#F5F5F5]">
                    {brand.artistName}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#C49A6C]">
                    {brand.artistRole}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C49A6C]" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.26em] text-[#C49A6C]">
                The Studio &amp; Artist
              </span>
            </div>

            <h2
              id="about-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#F5F5F5] sm:text-4xl lg:text-5xl"
            >
              {about.heading}
            </h2>

            <p className="mt-3 font-display text-xl italic text-[#C49A6C] sm:text-2xl">
              {about.subheading}
            </p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-[#A0A0A0]">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Three Core Highlights */}
            <ul className="mt-9 flex flex-wrap gap-3">
              {about.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="inline-flex items-center gap-2.5 border border-[#303030] bg-[#141414] px-4 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-[#F5F5F5]"
                >
                  <span
                    className="h-1.5 w-1.5 rotate-45 bg-[#C49A6C]"
                    aria-hidden="true"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Editable Placeholder Experience Statistics */}
            {about.stats.length > 0 && (
              <dl className="mt-11 grid grid-cols-1 gap-6 border-t border-[#303030] pt-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[#303030]">
                {about.stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={index === 0 ? 'sm:pr-8' : 'sm:px-8'}
                  >
                    <dt className="text-xs uppercase tracking-[0.18em] text-[#A0A0A0]">
                      {stat.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-3xl font-semibold text-[#F5F5F5] lg:text-4xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
