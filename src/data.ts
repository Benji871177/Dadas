import { Product, Testimonial } from './types';

export const BRAND_LOGO = 'https://i.postimg.cc/C5hHQntH/FB-IMG-1782285641126.jpg';

export const HERO_BG = 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1800&q=80';

export const CATEGORIES = [
  {
    id: 'flower' as const,
    name: 'Curated Flower',
    description: 'Sought-after genetics, cold-cured and hand-trimmed to absolute perfection.',
    image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=1200&q=80',
    tagline: 'The Apex of Cultivation'
  },
  {
    id: 'edible' as const,
    name: 'Artisanal Edibles',
    description: 'Gourmet delicacies infused with clean, single-source live rosin.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Gastronomy & Elevation'
  },
  {
    id: 'vape' as const,
    name: 'Bespoke Vapes',
    description: 'Full-spectrum liquid diamonds inside custom gold-plated ceramic cartridges.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Discreet and Sophisticated'
  },
  {
    id: 'oil' as const,
    name: 'Restorative Elixirs',
    description: 'Cold-pressed high-potency sublingual tinctures for exact, daily dosing.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Wellness with Precision'
  }
];

export const BENEFITS = [
  {
    icon: 'Shield',
    title: 'Discreet Delivery',
    description: 'Delivered in unmarked, scent-proof matte black luxury packaging directly to your private address.'
  },
  {
    icon: 'Compass',
    title: 'Curated Strains',
    description: 'Extremely limited batch releases, bred exclusively for Dada’s Circle members by award-winning legacy cultivators.'
  },
  {
    icon: 'Crown',
    title: 'Private Circle Access',
    description: 'Access-only entry. Unlocking rare strain drops, personal consultation rooms, and private lifestyle events.'
  },
  {
    icon: 'Sparkles',
    title: 'Certified Lab Testing',
    description: 'Comprehensive multi-phase pesticide, terpene, and cannabinoid analysis certificates available for every batch.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'dada-gold-reserve',
    name: 'Dada’s Golden Reserve',
    category: 'flower',
    type: 'Hybrid',
    thc: '29.4%',
    cbd: '0.2%',
    terpenes: ['Limonene', 'Caryophyllene', 'Myrcene'],
    price: 75,
    weight: '3.5g',
    effects: ['Euphoric Uplift', 'Full-Body Ease', 'Inspired Focus'],
    description: 'Our signature private reserve strain. A masterfully bred cross between Jealousy and White Truffle, slow-cured in dark glass jars for 60 days. Extremely dense buds glistening with golden amber trichomes and releasing a sweet, heavy dessert gas aroma.',
    image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=1200&q=80',
    strainLineage: 'Jealousy x White Truffle',
    isCollectorDrop: true
  },
  {
    id: 'midnight-velvet',
    name: 'Midnight Velvet',
    category: 'flower',
    type: 'Indica',
    thc: '27.8%',
    cbd: '0.5%',
    terpenes: ['Myrcene', 'Linalool', 'Humulene'],
    price: 70,
    weight: '3.5g',
    effects: ['Deep Sedation', 'Stress Relief', 'Dreamy Tranquility'],
    description: 'An premium nighttime selection featuring deeply purple, violet-hued calyxes covered in dense silver frost. Delivers a heavy grape-must and diesel flavor. Perfect for tranquil evenings and restoring alignment in body and mind.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
    strainLineage: 'Grandaddy Purp x Kush Mints'
  },
  {
    id: 'ghost-whisper',
    name: 'Ghost Whisper',
    category: 'flower',
    type: 'Sativa',
    thc: '25.6%',
    cbd: '0.1%',
    terpenes: ['Terpinolene', 'Pinene', 'Ocimene'],
    price: 70,
    weight: '3.5g',
    effects: ['Sensory Heightening', 'Clean Clarity', 'Social Radiance'],
    description: 'A crisp, pine-fresh daytime Sativa with rapid cerebral activation. Grown strictly in organic soil, it offers subtle citrus blossoms and mint undertones. Fosters long-term mental stamina and a vibrant aesthetic sense.',
    image: 'https://images.unsplash.com/photo-1536846840956-dfd85fa97e25?auto=format&fit=crop&w=1200&q=80',
    strainLineage: 'Ghost OG x Super Silver Haze'
  },
  {
    id: 'gold-leaf-truffles',
    name: '24K Gold Leaf Rosin Truffles',
    category: 'edible',
    type: 'Hybrid',
    thc: '10mg/piece',
    cbd: '2mg/piece',
    price: 45,
    weight: '10-Pack (100mg)',
    effects: ['Harmonious Warmth', 'Social Ease', 'Sensory Delight'],
    description: 'Gourmet single-origin Belgian dark chocolates, infused with premium, solventless live rosin hash. Hand-painted with edible 24-karat gold leaf flakes. Offers a precise, balanced, and elegant body relaxation accompanied by sweet flavor profiles.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    isCollectorDrop: true
  },
  {
    id: 'aether-live-resin',
    name: 'Aether Gold Live Resin Cartridge',
    category: 'vape',
    type: 'Sativa',
    thc: '91.2%',
    cbd: '1.4%',
    terpenes: ['Limonene', 'Beta-Caryophyllene'],
    price: 65,
    weight: '1.0g',
    effects: ['Electric Focus', 'Elevated Creativity', 'Discreet Relief'],
    description: '100% pure full-spectrum liquid diamonds extracted from fresh-frozen crop. Housed in a proprietary medical-grade glass and 24-karat gold plated heating core, ensuring perfectly tempered draws with no combustion taste.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'obelisk-elixir',
    name: 'Obelisk restorative Tincture',
    category: 'oil',
    type: 'CBD-Rich',
    thc: '5mg/ml',
    cbd: '50mg/ml',
    price: 85,
    weight: '30ml',
    effects: ['Anti-Inflammatory', 'Mental Stillness', 'Somatic Balance'],
    description: 'A high-potency restorative elixir, combining cold-pressed hemp oil, organic avocado seed lipids, and fractionated coconut oil. Scented with wild mountain peppermint, designed to soothe inflammation, physical stress, and foster a peaceful focus.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: "Dada's has completely rewritten how I experience cannabis. The discretion is immaculate, and the Golden Reserve strain is the cleanest burn I have found worldwide.",
    author: "Elena R.",
    location: "Cape Town / Constantia",
    verified: true
  },
  {
    id: 't2',
    quote: "The private circle membership makes sourcing feel exclusive and thoroughly curated. It is like having a private sommelier for premium organic cannabis.",
    author: "Marcus K.",
    location: "Johannesburg / Sandton",
    verified: true
  },
  {
    id: 't3',
    quote: "Every single vape cartridge and chocolate truffle feels like a work of luxury craftsmanship. The black and gold packaging is beautiful.",
    author: "Sofia de V.",
    location: "Cape Town / Camps Bay",
    verified: true
  }
];
