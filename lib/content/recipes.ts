import { Recipe } from '@/lib/types';

export const recipes: Recipe[] = [
  {
    id: 'v60-pour-over',
    title: 'V60 Pour-Over',
    description: 'Clean, bright coffee with full control over the brewing process.',
    category: 'hot',
    difficulty: 'medium',
    time: '4 minutes',
    servings: 1,
    ingredients: [
      { name: 'Coffee beans', amount: '20', unit: 'g' },
      { name: 'Water', amount: '300', unit: 'ml' }
    ],
    tools: ['V60 dripper', 'V60 filter', 'Gooseneck kettle', 'Scale', 'Timer'],
    grindSize: 'medium-coarse',
    steps: [
      {
        step: 1,
        instruction: 'Boil water to 200-205°F (93-96°C) and rinse the filter with hot water. Discard the rinse water.',
        temperature: '200-205°F'
      },
      {
        step: 2,
        instruction: 'Place V60 on your cup or carafe. Add 20g of medium-coarse ground coffee.',
      },
      {
        step: 3,
        instruction: 'Start timer. Pour 40g of water in a circular motion, saturating all grounds. Let bloom for 30 seconds.',
        duration: '30 seconds'
      },
      {
        step: 4,
        instruction: 'Pour in a spiral pattern from center to edge, reaching 200g total by 1:15.',
        duration: '45 seconds'
      },
      {
        step: 5,
        instruction: 'Continue pouring to reach 300g total by 2:00. Let drain completely.',
        duration: '2 minutes'
      },
      {
        step: 6,
        instruction: 'Total brew time should be 3-4 minutes. Remove dripper and enjoy!',
        duration: '3-4 minutes total'
      }
    ],
    tips: [
      'Use a gooseneck kettle for precise pour control',
      'Keep water level consistent during pour',
      'Adjust grind size if brew time is too fast or slow',
      'Use fresh, high-quality beans for best results',
      'Pre-wet the filter to remove paper taste'
    ]
  },
  {
    id: 'french-press',
    title: 'French Press',
    description: 'Rich, full-bodied coffee with a simple immersion method.',
    category: 'hot',
    difficulty: 'easy',
    time: '5 minutes',
    servings: 2,
    ingredients: [
      { name: 'Coffee beans', amount: '30', unit: 'g' },
      { name: 'Water', amount: '500', unit: 'ml' }
    ],
    tools: ['French press', 'Scale', 'Kettle', 'Timer', 'Spoon'],
    grindSize: 'coarse',
    steps: [
      {
        step: 1,
        instruction: 'Boil water to 200°F (93°C). Coarsely grind 30g of coffee.',
        temperature: '200°F'
      },
      {
        step: 2,
        instruction: 'Add coffee grounds to the French press.',
      },
      {
        step: 3,
        instruction: 'Start timer. Pour all 500ml of water over the grounds, ensuring all are saturated.',
      },
      {
        step: 4,
        instruction: 'Place lid on top but don\'t press yet. Let steep for 4 minutes.',
        duration: '4 minutes'
      },
      {
        step: 5,
        instruction: 'After 4 minutes, gently break the crust with a spoon and remove foam.',
        duration: '4 minutes'
      },
      {
        step: 6,
        instruction: 'Press the plunger down slowly and steadily. Pour immediately.',
      }
    ],
    tips: [
      'Use coarse grind to avoid sediment in your cup',
      'Don\'t let coffee sit in the press after pressing',
      'Break the crust gently to avoid stirring up grounds',
      'Press slowly and evenly',
      'Pre-warm the French press with hot water'
    ]
  },
  {
    id: 'aeropress',
    title: 'AeroPress',
    description: 'Quick, clean coffee that\'s perfect for travel or home.',
    category: 'hot',
    difficulty: 'easy',
    time: '2 minutes',
    servings: 1,
    ingredients: [
      { name: 'Coffee beans', amount: '15', unit: 'g' },
      { name: 'Water', amount: '250', unit: 'ml' }
    ],
    tools: ['AeroPress', 'AeroPress filter', 'Scale', 'Kettle', 'Timer'],
    grindSize: 'medium-fine',
    steps: [
      {
        step: 1,
        instruction: 'Boil water to 200°F (93°C). Place filter in cap and rinse with hot water.',
        temperature: '200°F'
      },
      {
        step: 2,
        instruction: 'Place AeroPress on your cup (standard method). Add 15g of medium-fine ground coffee.',
      },
      {
        step: 3,
        instruction: 'Start timer. Pour 50g of water and stir gently. Let bloom for 10 seconds.',
        duration: '10 seconds'
      },
      {
        step: 4,
        instruction: 'Pour remaining water to 250g total. Stir again.',
        duration: '30 seconds'
      },
      {
        step: 5,
        instruction: 'Place plunger on top at a slight angle, then pull up slightly to create a seal.',
        duration: '1 minute'
      },
      {
        step: 6,
        instruction: 'At 1:30, press down slowly and steadily for 30 seconds. Stop when you hear hissing.',
        duration: '30 seconds'
      }
    ],
    tips: [
      'Press slowly - don\'t rush!',
      'Stop pressing when you hear air hissing',
      'Experiment with inverted method for longer steep time',
      'Use fresh filters for best results',
      'Can make espresso-like concentrate or regular coffee'
    ]
  },
  {
    id: 'cold-brew',
    title: 'Cold Brew Concentrate',
    description: 'Smooth, sweet coffee perfect for iced drinks.',
    category: 'cold',
    difficulty: 'easy',
    time: '12-24 hours',
    servings: 4,
    ingredients: [
      { name: 'Coffee beans', amount: '100', unit: 'g' },
      { name: 'Cold water', amount: '600', unit: 'ml' }
    ],
    tools: ['Large jar or cold brew maker', 'Scale', 'Filter (cheesecloth or paper)', 'Fine mesh strainer'],
    grindSize: 'coarse',
    steps: [
      {
        step: 1,
        instruction: 'Coarsely grind 100g of coffee beans.',
      },
      {
        step: 2,
        instruction: 'Add ground coffee to your jar or cold brew maker.',
      },
      {
        step: 3,
        instruction: 'Pour 600ml of cold, filtered water over the grounds. Stir gently to ensure all grounds are saturated.',
      },
      {
        step: 4,
        instruction: 'Cover and let steep at room temperature or in refrigerator for 12-24 hours.',
        duration: '12-24 hours'
      },
      {
        step: 5,
        instruction: 'After steeping, filter the coffee through a fine mesh strainer lined with cheesecloth or a paper filter.',
      },
      {
        step: 6,
        instruction: 'Store concentrate in refrigerator. Dilute 1:1 with water or milk when serving over ice.',
      }
    ],
    tips: [
      'Use coarse grind to avoid over-extraction',
      'Steep longer for stronger concentrate (up to 24 hours)',
      'Store concentrate in refrigerator for up to 2 weeks',
      'Dilute to taste - start with 1:1 ratio',
      'Great base for iced lattes and coffee cocktails'
    ]
  },
  {
    id: 'iced-latte',
    title: 'Iced Latte',
    description: 'Refreshing iced coffee with creamy milk.',
    category: 'cold',
    difficulty: 'easy',
    time: '5 minutes',
    servings: 1,
    ingredients: [
      { name: 'Espresso or strong coffee', amount: '2', unit: 'shots (60ml)' },
      { name: 'Milk', amount: '120', unit: 'ml' },
      { name: 'Ice', amount: '1', unit: 'cup' },
      { name: 'Simple syrup (optional)', amount: '1', unit: 'tsp' }
    ],
    tools: ['Espresso machine or strong coffee', 'Glass', 'Spoon'],
    grindSize: 'fine',
    steps: [
      {
        step: 1,
        instruction: 'Fill a glass with ice cubes.',
      },
      {
        step: 2,
        instruction: 'Brew 2 shots of espresso (or 60ml of very strong coffee) directly over the ice.',
      },
      {
        step: 3,
        instruction: 'Add simple syrup if desired and stir.',
      },
      {
        step: 4,
        instruction: 'Pour cold milk over the coffee and ice.',
      },
      {
        step: 5,
        instruction: 'Stir gently and enjoy immediately.',
      }
    ],
    tips: [
      'Use cold milk straight from the refrigerator',
      'Brew espresso directly over ice to cool it quickly',
      'Adjust milk amount to your preference',
      'Try different milk alternatives (oat, almond, soy)',
      'Add flavored syrups for variety'
    ]
  },
  {
    id: 'cappuccino',
    title: 'Cappuccino',
    description: 'Classic Italian coffee with equal parts espresso, steamed milk, and foam.',
    category: 'hot',
    difficulty: 'medium',
    time: '5 minutes',
    servings: 1,
    ingredients: [
      { name: 'Espresso', amount: '1', unit: 'shot (30ml)' },
      { name: 'Milk', amount: '60', unit: 'ml' }
    ],
    tools: ['Espresso machine with steam wand', 'Milk pitcher', 'Espresso cup'],
    grindSize: 'fine',
    steps: [
      {
        step: 1,
        instruction: 'Brew 1 shot of espresso into your cup.',
      },
      {
        step: 2,
        instruction: 'Pour cold milk into a pitcher (fill to 1/3).',
      },
      {
        step: 3,
        instruction: 'Steam milk: Insert steam wand just below surface, create whirlpool, heat to 150-160°F.',
        temperature: '150-160°F'
      },
      {
        step: 4,
        instruction: 'Tap pitcher on counter and swirl to break large bubbles.',
      },
      {
        step: 5,
        instruction: 'Pour steamed milk into espresso, holding back foam with spoon. Top with foam.',
      },
      {
        step: 6,
        instruction: 'Serve immediately. Ratio should be 1/3 espresso, 1/3 milk, 1/3 foam.',
      }
    ],
    tips: [
      'Use whole milk for best foam texture',
      'Steam wand should make a "chirping" sound when creating foam',
      'Don\'t overheat milk - it will taste burnt',
      'Practice your pour for latte art',
      'Ratio is key: equal parts espresso, milk, and foam'
    ]
  },
  {
    id: 'basic-latte',
    title: 'Basic Latte',
    description: 'Smooth espresso with steamed milk - a coffee shop favorite.',
    category: 'hot',
    difficulty: 'medium',
    time: '5 minutes',
    servings: 1,
    ingredients: [
      { name: 'Espresso', amount: '1-2', unit: 'shots (30-60ml)' },
      { name: 'Milk', amount: '180-240', unit: 'ml' }
    ],
    tools: ['Espresso machine with steam wand', 'Milk pitcher', 'Latte cup'],
    grindSize: 'fine',
    steps: [
      {
        step: 1,
        instruction: 'Brew 1-2 shots of espresso into your cup.',
      },
      {
        step: 2,
        instruction: 'Pour cold milk into pitcher (fill to 1/2 for 1 shot, 2/3 for 2 shots).',
      },
      {
        step: 3,
        instruction: 'Steam milk: Insert wand below surface, create whirlpool, heat to 150-160°F.',
        temperature: '150-160°F'
      },
      {
        step: 4,
        instruction: 'Tap and swirl pitcher to create smooth, silky milk.',
      },
      {
        step: 5,
        instruction: 'Pour milk into espresso from height, then lower for design. Fill cup almost to top.',
      },
      {
        step: 6,
        instruction: 'Serve immediately. Latte has more milk and less foam than cappuccino.',
      }
    ],
    tips: [
      'Latte has more milk than cappuccino (less foam)',
      'Pour from height initially to mix, then lower for art',
      'Use a wide, shallow cup for best presentation',
      'Whole milk creates creamiest texture',
      'Practice makes perfect for latte art!'
    ]
  },
  {
    id: 'mocha',
    title: 'Mocha',
    description: 'Chocolatey coffee drink that\'s perfect for dessert lovers.',
    category: 'hot',
    difficulty: 'easy',
    time: '5 minutes',
    servings: 1,
    ingredients: [
      { name: 'Espresso', amount: '1-2', unit: 'shots (30-60ml)' },
      { name: 'Chocolate syrup or cocoa powder', amount: '1-2', unit: 'tbsp' },
      { name: 'Milk', amount: '180-240', unit: 'ml' },
      { name: 'Whipped cream (optional)', amount: '1', unit: 'dollop' }
    ],
    tools: ['Espresso machine', 'Milk pitcher', 'Mug', 'Spoon'],
    grindSize: 'fine',
    steps: [
      {
        step: 1,
        instruction: 'Add chocolate syrup or cocoa powder to your mug.',
      },
      {
        step: 2,
        instruction: 'Brew 1-2 shots of espresso directly into the mug. Stir to dissolve chocolate.',
      },
      {
        step: 3,
        instruction: 'Steam milk to 150-160°F, creating a small amount of foam.',
        temperature: '150-160°F'
      },
      {
        step: 4,
        instruction: 'Pour steamed milk into the mug, holding back foam.',
      },
      {
        step: 5,
        instruction: 'Top with remaining foam and optional whipped cream.',
      },
      {
        step: 6,
        instruction: 'Drizzle with additional chocolate syrup if desired. Enjoy!',
      }
    ],
    tips: [
      'Use high-quality chocolate for best flavor',
      'Dark chocolate pairs well with espresso',
      'Can be made iced by using cold milk and ice',
      'Adjust chocolate amount to your preference',
      'Whipped cream makes it extra indulgent'
    ]
  },
  {
    id: 'beginner-drip',
    title: 'Simple Drip Coffee',
    description: 'Easy, consistent coffee using an automatic drip maker.',
    category: 'hot',
    difficulty: 'easy',
    time: '5 minutes',
    servings: 4,
    ingredients: [
      { name: 'Coffee beans', amount: '60', unit: 'g' },
      { name: 'Water', amount: '1000', unit: 'ml' }
    ],
    tools: ['Drip coffee maker', 'Scale', 'Filter'],
    grindSize: 'medium',
    steps: [
      {
        step: 1,
        instruction: 'Measure 60g of coffee beans and grind to medium consistency.',
      },
      {
        step: 2,
        instruction: 'Place filter in basket and add ground coffee.',
      },
      {
        step: 3,
        instruction: 'Add 1000ml of cold, filtered water to the reservoir.',
      },
      {
        step: 4,
        instruction: 'Start the brewing cycle.',
      },
      {
        step: 5,
        instruction: 'Once brewing is complete, remove carafe immediately to avoid over-extraction.',
      },
      {
        step: 6,
        instruction: 'Serve and enjoy! Store any leftover coffee in a thermal carafe.',
      }
    ],
    tips: [
      'Use fresh, quality beans for best results',
      'Clean your machine regularly',
      'Use the right amount of coffee (1:16-17 ratio)',
      'Don\'t let coffee sit on the hot plate too long',
      'Pre-wet the filter to remove paper taste'
    ]
  },
  {
    id: 'cold-foam',
    title: 'Sweet Cold Foam',
    description: 'Creamy, sweet foam perfect for topping iced coffee drinks.',
    category: 'cold',
    difficulty: 'easy',
    time: '3 minutes',
    servings: 1,
    ingredients: [
      { name: 'Heavy cream or milk', amount: '60', unit: 'ml' },
      { name: 'Simple syrup', amount: '1', unit: 'tsp' },
      { name: 'Vanilla extract (optional)', amount: '2', unit: 'drops' }
    ],
    tools: ['Milk frother or French press', 'Small container'],
    grindSize: 'medium',
    steps: [
      {
        step: 1,
        instruction: 'Combine cold heavy cream (or milk), simple syrup, and vanilla in a container.',
      },
      {
        step: 2,
        instruction: 'Using a milk frother, froth for 30-60 seconds until thick and foamy.',
        duration: '30-60 seconds'
      },
      {
        step: 3,
        instruction: 'Alternative: Pour into French press and pump plunger rapidly 30-40 times.',
      },
      {
        step: 4,
        instruction: 'Foam should be thick and hold its shape.',
      },
      {
        step: 5,
        instruction: 'Spoon cold foam on top of your iced coffee drink.',
      },
      {
        step: 6,
        instruction: 'Enjoy immediately for best texture!',
      }
    ],
    tips: [
      'Heavy cream creates thicker, richer foam',
      'Use cold ingredients for best results',
      'Don\'t over-froth or it will become butter',
      'Can be flavored with different syrups',
      'Perfect for iced lattes and cold brew'
    ]
  }
];

export const getRecipe = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getRecipesByCategory = (category: 'cold' | 'hot' | 'beginner'): Recipe[] => {
  return recipes.filter(recipe => recipe.category === category);
};

export const getAllRecipes = (): Recipe[] => {
  return recipes;
};

