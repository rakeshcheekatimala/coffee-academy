import { FeaturedBrew } from '@/lib/types';
import { getRecommendation } from './recommendations';
import { getRecipe } from './recipes';

// Weekly featured brews - rotates based on week number
export const featuredBrews: FeaturedBrew[] = [
  {
    id: 'week-1',
    weekOf: '2024-12-02',
    coffee: {
      id: 'ethiopian-yirgacheffe',
      name: 'Ethiopian Yirgacheffe',
      origin: 'Ethiopia',
      roast: 'light',
      flavorProfile: ['Floral', 'Jasmine', 'Blueberry', 'Citrus', 'Tea-like'],
      acidity: 'high',
      body: 'light',
      description: 'A legendary origin known for its delicate, floral character. Yirgacheffe coffees are prized for their jasmine-like aromatics and bright fruit notes that dance on the palate.',
      bestFor: ['Pour-over', 'Light roast enthusiasts', 'Black coffee drinkers'],
    },
    recipe: getRecipe('v60-pour-over') || {
      id: 'v60-pour-over',
      title: 'V60 Pour-Over',
      description: 'The perfect method to showcase Ethiopian Yirgacheffe\'s delicate flavors',
      category: 'hot',
      difficulty: 'medium',
      time: '4 minutes',
      servings: 1,
      coffeeAmount: '20g',
      waterAmount: '300ml',
      waterTemp: '200°F',
      brewTime: '3-4 minutes',
      ingredients: [
        { name: 'Ethiopian Yirgacheffe', amount: '20', unit: 'g' },
        { name: 'Water', amount: '300', unit: 'ml' },
      ],
      tools: ['V60', 'Gooseneck kettle', 'Scale', 'Timer'],
      grindSize: 'medium-fine',
      steps: [
        { step: 1, instruction: 'Heat water to 200°F and rinse filter' },
        { step: 2, instruction: 'Add 20g medium-fine ground coffee' },
        { step: 3, instruction: 'Bloom with 40g water for 30 seconds' },
        { step: 4, instruction: 'Pour in circles to 300g total' },
        { step: 5, instruction: 'Total brew time: 3-4 minutes' },
      ],
      tips: ['Use a gooseneck kettle for control', 'Slightly cooler water highlights florals'],
    },
    tastingNotes: [
      'Bright jasmine aromatics from the first sniff',
      'Blueberry sweetness that lingers on the palate',
      'Delicate citrus acidity that\'s lively but not sharp',
      'Clean, tea-like finish that invites another sip',
    ],
    pairings: [
      {
        name: 'Lemon Blueberry Scone',
        description: 'The citrus and berry notes in both complement each other beautifully',
      },
      {
        name: 'Plain Croissant',
        description: 'Buttery, flaky pastry that lets the coffee\'s floral notes shine',
      },
      {
        name: 'Fresh Berries',
        description: 'Echo the coffee\'s natural fruitiness with fresh strawberries or blueberries',
      },
    ],
    brewingTips: [
      'Grind slightly coarser than usual to prevent over-extraction of the delicate acids',
      'Use water at 195-200°F — cooler than typical to preserve floral notes',
      'Pour slowly and steadily for even extraction',
      'Let it cool slightly before drinking — more flavors emerge as it cools',
      'Try it at different temperatures to experience how the flavors evolve',
    ],
    story: 'Ethiopian Yirgacheffe is where coffee began. Legend has it that a goat herder named Kaldi noticed his goats dancing with unusual energy after eating red berries from a certain tree. That tree was a coffee plant, and this region has been producing some of the world\'s most prized beans ever since. The high altitude, rich soil, and traditional processing methods create flavors found nowhere else on Earth.',
  },
  {
    id: 'week-2',
    weekOf: '2024-12-09',
    coffee: {
      id: 'brazilian-santos',
      name: 'Brazilian Santos',
      origin: 'Brazil',
      roast: 'medium',
      flavorProfile: ['Nutty', 'Chocolate', 'Caramel', 'Low Acidity', 'Smooth'],
      acidity: 'low',
      body: 'medium',
      description: 'The quintessential everyday coffee. Brazilian Santos offers comforting, familiar flavors that make it perfect for any time of day. Named after the port city from which these beans are shipped.',
      bestFor: ['French press', 'Daily drinking', 'Coffee with milk', 'Beginners'],
    },
    recipe: getRecipe('french-press') || {
      id: 'french-press',
      title: 'French Press',
      description: 'A full-bodied brew that highlights Brazilian Santos\' rich, smooth character',
      category: 'hot',
      difficulty: 'easy',
      time: '5 minutes',
      servings: 2,
      coffeeAmount: '30g',
      waterAmount: '500ml',
      waterTemp: '200°F',
      brewTime: '4 minutes',
      ingredients: [
        { name: 'Brazilian Santos', amount: '30', unit: 'g' },
        { name: 'Water', amount: '500', unit: 'ml' },
      ],
      tools: ['French press', 'Kettle', 'Scale', 'Timer'],
      grindSize: 'coarse',
      steps: [
        { step: 1, instruction: 'Coarsely grind 30g of coffee' },
        { step: 2, instruction: 'Add grounds and pour 500ml water at 200°F' },
        { step: 3, instruction: 'Steep for 4 minutes' },
        { step: 4, instruction: 'Break crust, remove foam, press slowly' },
        { step: 5, instruction: 'Pour and enjoy immediately' },
      ],
      tips: ['Coarse grind prevents over-extraction', 'Don\'t squeeze the plunger'],
    },
    tastingNotes: [
      'Roasted hazelnut aroma that fills the room',
      'Milk chocolate sweetness throughout',
      'Caramel undertones in the finish',
      'Velvety smooth body with zero harshness',
    ],
    pairings: [
      {
        name: 'Chocolate Chip Cookie',
        description: 'A classic pairing — the chocolate notes in both create harmony',
      },
      {
        name: 'Buttered Toast',
        description: 'Simple, comforting, and lets the coffee\'s nutty notes shine',
      },
      {
        name: 'Banana Bread',
        description: 'The caramel notes pair wonderfully with ripe banana sweetness',
      },
    ],
    brewingTips: [
      'Use a coarse grind to prevent bitterness and sludge',
      'Don\'t press the plunger down too hard — let gravity do the work',
      'Pour immediately after pressing to prevent over-extraction',
      'Pre-heat your French press for better temperature stability',
      'Try adding a splash of cream to enhance the chocolate notes',
    ],
    story: 'Brazil produces about 40% of the world\'s coffee, and Santos is one of its most famous ports. Brazilian coffee has been a global staple since the 1800s, when it helped fuel the Industrial Revolution. Today, Brazilian Santos represents everything we love about a reliable, comforting cup — smooth, sweet, and consistently delicious.',
  },
  {
    id: 'week-3',
    weekOf: '2024-12-16',
    coffee: {
      id: 'colombian-supremo',
      name: 'Colombian Supremo',
      origin: 'Colombia',
      roast: 'medium',
      flavorProfile: ['Balanced', 'Caramel', 'Red Apple', 'Nutty', 'Clean'],
      acidity: 'medium',
      body: 'medium',
      description: 'The gold standard of balanced coffee. Colombian Supremo offers the perfect middle ground — enough complexity to be interesting, enough familiarity to be comforting.',
      bestFor: ['Any brewing method', 'All-day drinking', 'Introducing friends to specialty coffee'],
    },
    recipe: getRecipe('aeropress') || {
      id: 'aeropress',
      title: 'AeroPress',
      description: 'Quick, clean, and highlights Colombian coffee\'s natural balance',
      category: 'hot',
      difficulty: 'easy',
      time: '2 minutes',
      servings: 1,
      coffeeAmount: '15g',
      waterAmount: '200ml',
      waterTemp: '200°F',
      brewTime: '1:30',
      ingredients: [
        { name: 'Colombian Supremo', amount: '15', unit: 'g' },
        { name: 'Water', amount: '200', unit: 'ml' },
      ],
      tools: ['AeroPress', 'Kettle', 'Scale', 'Timer'],
      grindSize: 'medium-fine',
      steps: [
        { step: 1, instruction: 'Add 15g medium-fine ground coffee' },
        { step: 2, instruction: 'Add 200ml water, stir gently' },
        { step: 3, instruction: 'Steep for 1 minute' },
        { step: 4, instruction: 'Press slowly for 30 seconds' },
        { step: 5, instruction: 'Enjoy as is or add hot water for Americano' },
      ],
      tips: ['Don\'t press too hard', 'Experiment with inverted method'],
    },
    tastingNotes: [
      'Sweet caramel and toffee on the nose',
      'Crisp red apple acidity that\'s bright but gentle',
      'Nutty undertones reminiscent of toasted almonds',
      'Clean, refreshing finish that leaves you wanting more',
    ],
    pairings: [
      {
        name: 'Apple Cinnamon Muffin',
        description: 'Echoes the apple notes in the coffee perfectly',
      },
      {
        name: 'Almond Biscotti',
        description: 'Nutty harmony between coffee and cookie',
      },
      {
        name: 'Cheese Danish',
        description: 'Creamy, slightly tangy — balances the coffee beautifully',
      },
    ],
    brewingTips: [
      'This coffee shines with almost any method — experiment!',
      'Medium grind works great across brewing styles',
      'Don\'t be afraid to drink it black — it\'s naturally smooth',
      'Great as a base for lattes too — holds up well to milk',
      'Try it hot, then try it iced — both are excellent',
    ],
    story: 'Colombian coffee has earned its reputation through generations of small farmers who hand-pick only ripe cherries at high altitudes. The country\'s unique geography — with its three mountain ranges — creates diverse microclimates that produce coffee with remarkable balance. "Supremo" refers to the largest, highest-quality beans sorted from each harvest.',
  },
  {
    id: 'week-4',
    weekOf: '2024-12-23',
    coffee: {
      id: 'holiday-blend',
      name: 'Holiday Spice Blend',
      origin: 'Central America & Indonesia',
      roast: 'medium-dark',
      flavorProfile: ['Cinnamon', 'Clove', 'Dark Chocolate', 'Warm Spices', 'Full Body'],
      acidity: 'low',
      body: 'full',
      description: 'A special seasonal blend crafted for the holidays. Combining Central American brightness with Indonesian earthiness, then roasted to bring out warming spice notes naturally present in the beans.',
      bestFor: ['Holiday gatherings', 'With dessert', 'Cold winter mornings'],
    },
    recipe: getRecipe('french-press') || {
      id: 'french-press',
      title: 'French Press',
      description: 'Rich and full-bodied to match the holiday season',
      category: 'hot',
      difficulty: 'easy',
      time: '5 minutes',
      servings: 4,
      coffeeAmount: '60g',
      waterAmount: '1000ml',
      waterTemp: '200°F',
      brewTime: '4 minutes',
      ingredients: [
        { name: 'Holiday Blend', amount: '60', unit: 'g' },
        { name: 'Water', amount: '1000', unit: 'ml' },
      ],
      tools: ['Large French press', 'Kettle', 'Scale'],
      grindSize: 'coarse',
      steps: [
        { step: 1, instruction: 'Coarsely grind 60g of Holiday Blend' },
        { step: 2, instruction: 'Add to large French press' },
        { step: 3, instruction: 'Pour 1000ml water at 200°F' },
        { step: 4, instruction: 'Steep 4 minutes, break crust, press' },
        { step: 5, instruction: 'Share with loved ones!' },
      ],
      tips: ['Perfect for serving a crowd', 'Try with a splash of eggnog'],
    },
    tastingNotes: [
      'Warming cinnamon and clove aromatics',
      'Rich dark chocolate depth',
      'Subtle holiday spice notes emerge as it cools',
      'Full, syrupy body perfect for cold weather',
    ],
    pairings: [
      {
        name: 'Gingerbread Cookies',
        description: 'The ultimate holiday pairing — spices in harmony',
      },
      {
        name: 'Pumpkin Pie',
        description: 'Warm spices and creamy sweetness complement perfectly',
      },
      {
        name: 'Dark Chocolate Truffles',
        description: 'Chocolate on chocolate — decadent and delightful',
      },
    ],
    brewingTips: [
      'Make a big batch for holiday gatherings',
      'This blend holds up well to cream and sugar',
      'Try adding a cinnamon stick while brewing for extra warmth',
      'Great as the base for a coffee-based cocktail',
      'Pairs wonderfully with a splash of eggnog or Irish cream',
    ],
    story: 'The holidays are about warmth, comfort, and sharing. This special blend was crafted to embody those values — combining beans from Guatemala\'s volcanic highlands with the earthy depth of Sumatran coffee. The medium-dark roast brings out natural spice notes without added flavoring, creating something that tastes like the holiday season in a cup.',
  },
];

// Get the current week's featured brew
export const getCurrentFeaturedBrew = (): FeaturedBrew => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7
  );
  
  // Rotate through available brews based on week number
  const index = (weekNumber - 1) % featuredBrews.length;
  return featuredBrews[index];
};

// Get all featured brews
export const getAllFeaturedBrews = (): FeaturedBrew[] => {
  return featuredBrews;
};

// Get featured brew by ID
export const getFeaturedBrew = (id: string): FeaturedBrew | undefined => {
  return featuredBrews.find(brew => brew.id === id);
};

// Get previous featured brews
export const getPreviousFeaturedBrews = (limit: number = 3): FeaturedBrew[] => {
  const current = getCurrentFeaturedBrew();
  return featuredBrews.filter(brew => brew.id !== current.id).slice(0, limit);
};

