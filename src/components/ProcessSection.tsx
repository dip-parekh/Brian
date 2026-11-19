import { Compass, HeartHandshake, PenTool, ShieldCheck } from 'lucide-react';
import { studioConfig } from '../config/studioConfig';
import { useReveal } from '../hooks/useReveal';
import type { ProcessFeature } from '../types/portfolio';

function FeatureIcon({ icon }: { icon: ProcessFeature['icon'] }) {
  const iconClass = 'h-5 w-5 text-[#C49A6C]';

  switch (icon) {
    case 'pen':
      return <PenTool className={iconClass} strokeWidth={1.5} aria-hidden="true" />;
    case 'craft':
      return <Compass className={iconClass} strokeWidth={1.5} aria-hidden="true" />;
    case 'hygiene':
      return <ShieldCheck className={iconClass} strokeWidth={1.5} aria-hidden="true" />;
    case 'client':
      return <HeartHandshake className={iconClass} strokeWidth={1.5} aria-hidden="true" />;
  }
}

export function ProcessSection() {
  const { process } = studioConfig;
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <section
      id="process"
      ref={ref}
      aria-labelledby="process-heading"
      className="border-y border-[#303030] bg-[#141414] py-24 lg:py-28"
    >
      <div
        className={`mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 ${
          isVisible ? 'reveal-visible' : 'reveal-hidden'
        }`}
      >
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-6 bg-[#C49A6C]" aria-hidden="true" />
            <span className="text-xs font-medium uppercase tracking-[0.26em] text-[#C49A6C]">
              Studio Standards
            </span>
            <span className="h-px w-6 bg-[#C49A6C]" aria-hidden="true" />
          </div>

          <h2
            id="process-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight text-[#F5F5F5] sm:text-4xl lg:text-5xl"
          >
            {process.heading}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.features.map((feature, index) => (
            <div
              key={feature.id}
              className="group relative flex flex-col border border-[#303030] bg-[#1C1C1C] p-7 transition-colors duration-300 hover:border-[#C49A6C]/60"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center border border-[#303030] bg-[#080808] transition-colors group-hover:border-[#C49A6C]/50">
                  <FeatureIcon icon={feature.icon} />
                </div>
                <span className="font-display text-sm tracking-[0.2em] text-[#A0A0A0]/60">
                  0{index + 1}
                </span>
              </div>

              <h3 className="mt-7 font-display text-xl font-medium text-[#F5F5F5]">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#A0A0A0]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
