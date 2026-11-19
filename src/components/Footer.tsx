import { ArrowUp } from 'lucide-react';
import { studioConfig } from '../config/studioConfig';
import { BrandMark } from './BrandMark';
import { FacebookIcon, InstagramIcon, TikTokIcon } from './SocialIcons';

export function Footer() {
  const { brand, navigation, contact } = studioConfig;

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    const target = document.getElementById(href.replace('#', ''));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#303030] bg-[#080808] pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label={`${brand.studioName} — Back to top`}
            >
              <BrandMark />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#A0A0A0]">
              {brand.shortStatement}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={contact.socials.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center border border-[#303030] bg-[#141414] text-[#A0A0A0] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C]"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={contact.socials.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center border border-[#303030] bg-[#141414] text-[#A0A0A0] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C]"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={contact.socials.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex h-10 w-10 items-center justify-center border border-[#303030] bg-[#141414] text-[#A0A0A0] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C]"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C49A6C]">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-[#A0A0A0] transition-colors hover:text-[#F5F5F5]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Summary */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C49A6C]">
              Studio Contact
            </h4>
            <div className="mt-5 space-y-3 text-sm text-[#A0A0A0]">
              <p>{contact.addressDisplay}</p>
              <p>
                <a
                  href={contact.phoneHref}
                  className="transition-colors hover:text-[#F5F5F5]"
                >
                  {contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${contact.emailAddress}`}
                  className="break-all transition-colors hover:text-[#F5F5F5]"
                >
                  {contact.emailDisplay}
                </a>
              </p>
              <p className="text-xs text-[#A0A0A0]/80">
                {contact.openingHours[0]}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#303030] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs uppercase tracking-[0.18em] text-[#A0A0A0]">
            &copy; {brand.copyrightYear} {brand.studioName}. ALL RIGHTS RESERVED.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex cursor-pointer items-center gap-2 border border-[#303030] bg-[#141414] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A0A0A0] transition-colors hover:border-[#C49A6C] hover:text-[#C49A6C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C49A6C]"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
