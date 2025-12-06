import { Equipment } from '@/lib/types';

export const equipment: Equipment[] = [
  {
    id: 'burr-grinder',
    name: 'Burr Grinder',
    category: 'grinder',
    description: 'The gold standard for coffee grinding. Uses two burrs to crush beans consistently, resulting in uniform particle size.',
    priceRange: 'mid-range',
    difficulty: 'beginner',
    pros: [
      'Consistent grind size',
      'Adjustable settings for different brewing methods',
      'Better flavor extraction',
      'Durable and long-lasting',
      'Worth the investment'
    ],
    cons: [
      'More expensive than blade grinders',
      'Takes up more counter space',
      'Can be slower than blade grinders'
    ]
  },
  {
    id: 'blade-grinder',
    name: 'Blade Grinder',
    category: 'grinder',
    description: 'Affordable grinder that uses spinning blades to chop coffee beans. Less consistent but budget-friendly.',
    priceRange: 'budget',
    difficulty: 'beginner',
    pros: [
      'Very affordable',
      'Compact size',
      'Quick grinding',
      'Good for beginners'
    ],
    cons: [
      'Inconsistent grind size',
      'Can create heat (affects flavor)',
      'Requires shaking for even grind',
      'Not ideal for espresso'
    ]
  },
  {
    id: 'v60',
    name: 'V60 Pour-Over Dripper',
    category: 'brewer',
    description: 'Cone-shaped dripper that allows precise control over brewing. Produces clean, bright coffee.',
    priceRange: 'budget',
    difficulty: 'intermediate',
    pros: [
      'Affordable equipment',
      'Clean, bright coffee',
      'Full control over brewing',
      'Lightweight and portable',
      'Many size options'
    ],
    cons: [
      'Requires technique and practice',
      'Needs gooseneck kettle',
      'Requires filters',
      'Takes time to master'
    ]
  },
  {
    id: 'french-press',
    name: 'French Press',
    category: 'brewer',
    description: 'Simple immersion brewer that produces rich, full-bodied coffee. No filters needed.',
    priceRange: 'budget',
    difficulty: 'beginner',
    pros: [
      'Very affordable',
      'Simple to use',
      'No paper filters needed',
      'Rich, full-bodied coffee',
      'Durable (glass or stainless steel)'
    ],
    cons: [
      'Some sediment in cup',
      'Requires coarse grind',
      'Can be messy to clean',
      'Coffee can over-extract if left too long'
    ]
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    category: 'brewer',
    description: 'Versatile, portable brewer that can make espresso-like coffee or regular coffee. Quick and easy.',
    priceRange: 'budget',
    difficulty: 'beginner',
    pros: [
      'Very affordable',
      'Quick brewing (1-2 minutes)',
      'Portable and durable',
      'Easy to clean',
      'Versatile (many recipes)'
    ],
    cons: [
      'Makes single serving only',
      'Requires filters',
      'Plastic construction (some prefer glass/metal)'
    ]
  },
  {
    id: 'espresso-machine',
    name: 'Espresso Machine',
    category: 'brewer',
    description: 'Professional-grade equipment that makes concentrated coffee under pressure. Can make lattes and cappuccinos.',
    priceRange: 'premium',
    difficulty: 'advanced',
    pros: [
      'Rich, concentrated coffee',
      'Can make milk drinks',
      'Professional results',
      'Many features and options'
    ],
    cons: [
      'Very expensive',
      'Requires skill and practice',
      'Takes up counter space',
      'Requires maintenance',
      'Needs good grinder'
    ]
  },
  {
    id: 'cold-brew-maker',
    name: 'Cold Brew Maker',
    category: 'brewer',
    description: 'Specialized equipment for making cold brew coffee. Makes large batches of smooth, less acidic coffee.',
    priceRange: 'mid-range',
    difficulty: 'beginner',
    pros: [
      'Smooth, less acidic coffee',
      'Easy to use',
      'Makes large batches',
      'Great for hot weather',
      'Lasts in fridge for days'
    ],
    cons: [
      'Takes 12-24 hours',
      'Requires planning ahead',
      'Takes up fridge space',
      'Limited to cold coffee'
    ]
  },
  {
    id: 'moka-pot',
    name: 'Moka Pot',
    category: 'brewer',
    description: 'Stovetop brewer that makes strong, espresso-like coffee. Italian tradition, no electricity needed.',
    priceRange: 'budget',
    difficulty: 'intermediate',
    pros: [
      'Affordable',
      'Strong, concentrated coffee',
      'No electricity needed',
      'Durable (aluminum or stainless)',
      'Italian tradition'
    ],
    cons: [
      'Requires stovetop',
      'Can be tricky to get right',
      'Can make bitter coffee if not careful',
      'Requires medium-fine grind'
    ]
  },
  {
    id: 'gooseneck-kettle',
    name: 'Gooseneck Kettle',
    category: 'kettle',
    description: 'Kettle with a thin, curved spout for precise water pouring. Essential for pour-over brewing.',
    priceRange: 'mid-range',
    difficulty: 'beginner',
    pros: [
      'Precise pour control',
      'Essential for pour-over',
      'Temperature control available',
      'Better than regular kettle for coffee',
      'Stainless steel or electric options'
    ],
    cons: [
      'More expensive than regular kettle',
      'Takes longer to pour',
      'Electric versions need outlet'
    ]
  },
  {
    id: 'scale',
    name: 'Coffee Scale',
    category: 'accessory',
    description: 'Digital scale for precise coffee and water measurements. Essential for consistent brewing.',
    priceRange: 'budget',
    difficulty: 'beginner',
    pros: [
      'Precise measurements',
      'Consistent results',
      'Affordable',
      'Measures to 0.1g',
      'Often includes timer'
    ],
    cons: [
      'Requires batteries or charging',
      'Another device to manage',
      'Can be small (hard to read)'
    ]
  }
];

export const getEquipment = (id: string): Equipment | undefined => {
  return equipment.find(item => item.id === id);
};

export const getEquipmentByCategory = (category: Equipment['category']): Equipment[] => {
  return equipment.filter(item => item.category === category);
};

export const getAllEquipment = (): Equipment[] => {
  return equipment;
};

