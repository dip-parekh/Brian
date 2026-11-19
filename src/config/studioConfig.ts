import type {
  ExperienceStat,
  PortfolioCategory,
  PortfolioItem,
  ProcessFeature,
  ServiceItem,
} from '../types/portfolio';

/**
 * =============================================================================
 * CENTRAL STUDIO CUSTOMISATION CONFIG
 * =============================================================================
 * Replace all bracketed placeholders (e.g. [STUDIO NAME], [Artist Name]) and
 * temporary imagery paths below before deploying to production.
 *
 * Imagery replacement:
 * Drop your own studio and portfolio photographs into `/public/images/` and
 * update the corresponding `image` paths below.
 * =============================================================================
 */

export const studioConfig = {
  brand: {
    studioName: '[STUDIO NAME]',
    artistName: '[Artist Name]',
    artistRole: 'Founder & Lead Tattoo Artist',
    shortStatement:
      'Bespoke tattoo artistry crafted with discipline, precision, and enduring respect for the craft.',
    /** Optional path to a custom logo image (e.g., '/images/logo.svg'). Leave empty to use the built-in monogram mark. */
    logoImageUrl: '',
    copyrightYear: '2026',
  },

  navigation: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Our Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ],

  hero: {
    label: 'PROFESSIONAL TATTOO ARTIST',
    headlineLine1: 'ART THAT LIVES',
    headlineLine2: 'ON YOUR SKIN.',
    description:
      'Every tattoo tells a story. Discover custom tattoo designs crafted with creativity, precision and passion, turning personal ideas into permanent works of art.',
    primaryCta: 'EXPLORE OUR WORK',
    secondaryCta: 'BOOK A SESSION',
    backgroundImage: '/images/hero-tattoo.jpg',
    backgroundAlt:
      'Detailed black-and-grey shoulder and arm tattoo photographed in moody studio lighting',
  },

  about: {
    heading: 'BEHIND THE INK',
    subheading: "More Than Tattoos. It's Personal Expression.",
    portraitImage: '/images/artist-portrait.jpg',
    portraitAlt:
      'Tattoo artist examining a custom stencil design at the studio drafting table',
    paragraphs: [
      'Welcome to our creative space, where art, individuality and self-expression come together.',
      'With a passion for artistic design and attention to detail, every tattoo is approached as a unique piece of artwork.',
      'From the first consultation to the final result, the focus is on understanding your vision, creating a design that reflects your personality and delivering artwork with precision and care.',
      'Whether you are looking for something minimal and meaningful or a bold, detailed masterpiece, every piece is created with dedication and creativity.',
    ],
    highlights: [
      'CUSTOM DESIGNS',
      'ATTENTION TO DETAIL',
      'QUALITY & PRECISION',
    ],
    /**
     * Replace placeholder metrics with your real studio figures, or set to []
     * to hide the statistics row entirely.
     */
    stats: [
      { value: '[XX]+', label: 'Years Experience' },
      { value: '[XXX]+', label: 'Tattoos Completed' },
      { value: '[XXX]+', label: 'Happy Clients' },
    ] as ExperienceStat[],
  },

  portfolio: {
    heading: 'THE ARTWORK',
    subheading: 'Every Line. Every Detail. Every Story.',
    categories: [
      'ALL WORK',
      'BLACK & GREY',
      'REALISM',
      'FINE LINE',
      'TRIBAL',
      'GEOMETRIC',
      'TRADITIONAL',
      'CUSTOM DESIGNS',
    ] as PortfolioCategory[],
    items: [
      {
        id: 'work-01',
        title: 'Classical Chiaroscuro Bust',
        primaryCategory: 'BLACK & GREY',
        categories: ['BLACK & GREY', 'REALISM'],
        image: '/images/work-black-grey-1.jpg',
        alt: 'Black and grey forearm tattoo of a classical marble bust with soft smoke shading',
        aspectRatio: '3/4',
        placement: 'Outer Forearm',
        description:
          'Smooth greywash transitions and fine tonal depth inspired by classical sculpture.',
      },
      {
        id: 'work-02',
        title: 'Botanical & Lunar Moth',
        primaryCategory: 'FINE LINE',
        categories: ['FINE LINE', 'CUSTOM DESIGNS'],
        image: '/images/work-fine-line-1.jpg',
        alt: 'Delicate single-needle fine line botanical stems and moth tattoo on inner forearm',
        aspectRatio: '1/1',
        placement: 'Inner Forearm',
        description:
          'Single-needle botanical anatomy composed to flow naturally with the arm contour.',
      },
      {
        id: 'work-03',
        title: 'Apex Portrait Study',
        primaryCategory: 'REALISM',
        categories: ['REALISM', 'BLACK & GREY'],
        image: '/images/work-realism-1.jpg',
        alt: 'Hyper-realistic black and grey lion portrait tattoo across upper arm and shoulder',
        aspectRatio: '3/4',
        placement: 'Upper Arm & Shoulder',
        description:
          'High-contrast micro-realism focused on texture, depth, and lifelike studio lighting.',
      },
      {
        id: 'work-04',
        title: 'Sacred Symmetry Sleeve',
        primaryCategory: 'GEOMETRIC',
        categories: ['GEOMETRIC', 'CUSTOM DESIGNS'],
        image: '/images/work-geometric-1.jpg',
        alt: 'Intricate geometric sacred mandala and dotwork sleeve tattoo across shoulder',
        aspectRatio: '4/3',
        placement: 'Shoulder & Upper Sleeve',
        description:
          'Precision linework and gradated dotwork engineered around shoulder anatomy.',
      },
      {
        id: 'work-05',
        title: 'Ornamental Dagger & Flora',
        primaryCategory: 'CUSTOM DESIGNS',
        categories: ['CUSTOM DESIGNS', 'BLACK & GREY'],
        image: '/images/work-custom-1.jpg',
        alt: 'Custom ornamental filigree dagger and dark botanical tattoo along forearm',
        aspectRatio: '3/4',
        placement: 'Forearm',
        description:
          'One-of-one bespoke composition blending dark botanicals with structured metalwork.',
      },
      {
        id: 'work-06',
        title: 'Contemporary Blackwork Armour',
        primaryCategory: 'TRIBAL',
        categories: ['TRIBAL', 'CUSTOM DESIGNS'],
        image: '/images/work-tribal-1.jpg',
        alt: 'Bold blackwork tribal shoulder and upper chest pattern following natural musculature',
        aspectRatio: '1/1',
        placement: 'Shoulder & Chest Cap',
        description:
          'Solid blackwork geometry and rhythmic negative space tailored to body movement.',
      },
      {
        id: 'work-07',
        title: 'Heritage Panther & Rose',
        primaryCategory: 'TRADITIONAL',
        categories: ['TRADITIONAL'],
        image: '/images/work-traditional-1.jpg',
        alt: 'Bold traditional panther and vintage rose tattoo on lower forearm',
        aspectRatio: '3/4',
        placement: 'Lower Arm',
        description:
          'Timeless bold outlines, solid black saturation, and enduring traditional silhouettes.',
      },
      {
        id: 'work-08',
        title: 'Architectural Spire & Constellation',
        primaryCategory: 'FINE LINE',
        categories: ['FINE LINE', 'GEOMETRIC'],
        image: '/images/work-fine-line-2.jpg',
        alt: 'Minimalist fine line architectural spire and delicate celestial constellation tattoo along upper back spine',
        aspectRatio: '3/4',
        placement: 'Upper Back / Spine',
        description:
          'Whisper-thin architectural geometry aligned precisely along the spine.',
      },
    ] as PortfolioItem[],
  },

  services: {
    heading: 'WHAT WE CREATE',
    subheading: 'From Minimal Details to Bold Masterpieces.',
    /**
     * Remove or edit any service objects below so only the styles you actively
     * offer appear on the live site.
     */
    items: [
      {
        id: 'service-fine-line',
        number: '01',
        title: 'Fine Line Tattoos',
        styleValue: 'Fine Line',
        description:
          'Delicate, detailed tattoos created using fine, precise lines.',
        image: '/images/service-fine-line.jpg',
        alt: 'Close-up of delicate fine line architectural tattoo artwork along the spine',
      },
      {
        id: 'service-black-grey',
        number: '02',
        title: 'Black & Grey Tattoos',
        styleValue: 'Black & Grey',
        description:
          'Beautiful monochromatic tattoo artwork using shading, contrast and depth.',
        image: '/images/service-black-grey.jpg',
        alt: 'Monochromatic black and grey shaded filigree and portrait tattoo detail',
      },
      {
        id: 'service-realism',
        number: '03',
        title: 'Realism Tattoos',
        styleValue: 'Realism',
        description:
          'Highly detailed artwork inspired by real-life portraits, objects and imagery.',
        image: '/images/service-realism.jpg',
        alt: 'Photorealistic black and grey wildlife portrait tattoo detail',
      },
      {
        id: 'service-custom',
        number: '04',
        title: 'Custom Tattoos',
        styleValue: 'Custom Design',
        description:
          'Personalised tattoo designs created around your ideas, inspiration and story.',
        image: '/images/service-custom.jpg',
        alt: 'Hand-drawn custom tattoo stencil beside rotary machine on studio drafting table',
      },
      {
        id: 'service-geometric',
        number: '05',
        title: 'Geometric Tattoos',
        styleValue: 'Geometric',
        description:
          'Modern designs combining shapes, symmetry and intricate patterns.',
        image: '/images/service-geometric.jpg',
        alt: 'Symmetric dotwork and sacred geometric mandala tattoo on shoulder',
      },
      {
        id: 'service-cover-up',
        number: '06',
        title: 'Cover-Up Tattoos',
        styleValue: 'Cover-Up',
        description:
          'Creative tattoo solutions designed to transform or incorporate existing tattoos.',
        image: '/images/service-cover-up.jpg',
        alt: 'Bold high-density blackwork shoulder tattoo illustrating seamless coverage work',
      },
    ] as ServiceItem[],
  },

  process: {
    heading: 'WHY TRUST THE PROCESS?',
    features: [
      {
        id: 'personalised',
        title: 'Personalised Designs',
        description:
          "Every design is developed around the client's individual vision.",
        icon: 'pen',
      },
      {
        id: 'craftsmanship',
        title: 'Professional Craftsmanship',
        description: 'Careful attention to detail, precision and quality.',
        icon: 'craft',
      },
      {
        id: 'hygiene',
        title: 'Clean & Safe Environment',
        description:
          'Dedicated hygiene standards, single-use sterile needles, and safe tattoo procedures throughout every session.',
        icon: 'hygiene',
      },
      {
        id: 'client-experience',
        title: 'Client-Focused Experience',
        description:
          'A comfortable experience from consultation to completion.',
        icon: 'client',
      },
    ] as ProcessFeature[],
  },

  contact: {
    heading: "LET'S CREATE SOMETHING PERMANENT.",
    supportingText:
      "Have an idea in mind? Whether it's your first tattoo or your next masterpiece, let's bring your vision to life.",
    studioName: '[STUDIO NAME]',
    phoneDisplay: '[+00 000 000 000]',
    phoneHref: 'tel:+00000000000',
    whatsappDisplay: '[+00 000 000 000]',
    /** Digits only (with country code, no + or spaces) for https://wa.me/<number> */
    whatsappNumberRaw: '00000000000',
    emailDisplay: '[booking@yourstudio.com]',
    emailAddress: 'booking@yourstudio.com',
    addressDisplay: '[123 Studio Street, Suite 4, City, Country]',
    openingHours: [
      '[Tuesday – Saturday: 10:00 AM – 6:00 PM]',
      '[Sunday – Monday: By Appointment Only]',
    ],
    socials: {
      instagram: {
        label: 'Instagram',
        handle: '[@yourstudio]',
        url: 'https://instagram.com/yourstudio',
      },
      facebook: {
        label: 'Facebook',
        handle: '[Your Studio Page]',
        url: 'https://facebook.com/yourstudio',
      },
      tiktok: {
        label: 'TikTok',
        handle: '[@yourstudio]',
        url: 'https://tiktok.com/@yourstudio',
      },
    },
  },

  booking: {
    /**
     * INTEGRATION CONFIGURATION:
     * To enable direct backend / email delivery (e.g., Formspree, Web3Forms,
     * Resend endpoint, or your own API), set `endpointUrl` to your POST URL.
     *
     * Example:
     * endpointUrl: 'https://formspree.io/f/your-form-id'
     *
     * While `endpointUrl` is empty (''), submitting the form runs complete
     * validation and presents an honest enquiry-handoff panel allowing the
     * client to dispatch their validated booking via WhatsApp, Email, or copy.
     */
    endpointUrl: '',
    styles: [
      'Fine Line',
      'Black & Grey',
      'Realism',
      'Custom Design',
      'Geometric',
      'Cover-Up',
      'Tribal',
      'Traditional',
      'Unsure — Need Advice',
    ],
    sizes: [
      'Micro / Small (Under 5 cm)',
      'Medium (5 – 15 cm)',
      'Large (15 – 25 cm)',
      'Half Sleeve / Large Panel',
      'Full Sleeve / Back Piece',
      'Not Sure Yet',
    ],
    /** Customize budget ranges and currency symbol before going live */
    budgets: [
      '[Currency] Small Piece / Studio Minimum',
      '[Currency] Half-Day Session',
      '[Currency] Full-Day Session',
      '[Currency] Multi-Session Project',
      'Open to Artist Quote',
    ],
  },
} as const;
