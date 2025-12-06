import { Level } from '@/lib/types';

export const levels: Level[] = [
  {
    id: 1,
    title: 'Coffee Basics',
    description: 'Learn the fundamentals of coffee - what it is, where it comes from, and the different types of beans and roasts.',
    unlocked: true,
    content: {
      sections: [
        {
          type: 'text',
          title: 'What is Coffee?',
          content: 'Coffee is a brewed drink made from roasted coffee beans, which are the seeds of berries from the Coffea plant. The plant is native to tropical regions of Africa, and coffee is now grown in over 70 countries worldwide. The two most commonly grown species are Coffea arabica (Arabica) and Coffea canephora (Robusta).'
        },
        {
          type: 'text',
          title: 'A Brief History',
          content: 'Coffee originated in Ethiopia, where legend says a goat herder named Kaldi discovered it around 850 AD. The energizing effects of coffee beans were noticed when his goats became unusually energetic after eating them. Coffee spread to the Arabian Peninsula, then to Europe, and eventually around the world. Today, coffee is one of the most popular beverages globally, with over 2.25 billion cups consumed daily.'
        },
        {
          type: 'comparison',
          title: 'Arabica vs Robusta',
          content: {
            items: [
              {
                name: 'Arabica',
                description: 'The most popular coffee species, making up about 60-70% of global production.',
                characteristics: [
                  'Smooth, sweet flavor with hints of sugar, fruit, and berries',
                  'Lower caffeine content (about 1.5%)',
                  'More delicate and complex taste',
                  'Grows at higher altitudes (600-2000m)',
                  'More expensive due to cultivation requirements',
                  'Preferred for specialty coffee'
                ]
              },
              {
                name: 'Robusta',
                description: 'Hardier and more disease-resistant, making it easier and cheaper to grow.',
                characteristics: [
                  'Strong, bold flavor with earthy, woody notes',
                  'Higher caffeine content (about 2.7%)',
                  'More bitter and less acidic',
                  'Grows at lower altitudes',
                  'More affordable',
                  'Commonly used in espresso blends and instant coffee'
                ]
              }
            ]
          }
        },
        {
          type: 'comparison',
          title: 'Roast Levels Explained',
          content: {
            items: [
              {
                name: 'Light Roast',
                description: 'Light brown color, no oil on surface, toasted grain taste.',
                characteristics: [
                  'Light brown, tan color',
                  'Highest acidity',
                  'Most caffeine',
                  'Fruity, floral, tea-like flavors',
                  'Original bean flavors are most prominent',
                  'Best for: Pour-over, drip coffee'
                ]
              },
              {
                name: 'Medium Roast',
                description: 'Medium brown color, balanced flavor, aroma, and acidity.',
                characteristics: [
                  'Medium brown color',
                  'Balanced acidity and body',
                  'Slightly less caffeine than light roast',
                  'Caramel, nutty, chocolate notes',
                  'Most popular roast level',
                  'Best for: All brewing methods'
                ]
              },
              {
                name: 'Dark Roast',
                description: 'Dark brown to black, shiny with oil, bold and smoky flavor.',
                characteristics: [
                  'Dark brown to almost black',
                  'Lowest acidity',
                  'Least caffeine (slightly)',
                  'Bold, smoky, bitter flavors',
                  'Roast flavors dominate over bean origin',
                  'Best for: Espresso, French press'
                ]
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: 2,
    title: 'Coffee Gear & Tools',
    description: 'Discover the essential equipment you need to brew great coffee at home.',
    unlocked: true,
    content: {
      sections: [
        {
          type: 'text',
          title: 'Essential Equipment',
          content: 'Having the right tools makes all the difference in brewing great coffee. While you don\'t need everything at once, understanding your options helps you make informed choices.'
        },
        {
          type: 'text',
          title: 'Grinders',
          content: 'The grinder is arguably the most important piece of equipment. Freshly ground coffee makes a world of difference compared to pre-ground.'
        },
        {
          type: 'comparison',
          title: 'Grinder Types',
          content: {
            items: [
              {
                name: 'Burr Grinder',
                description: 'The gold standard for coffee grinding. Uses two burrs to crush beans consistently.',
                characteristics: [
                  'Consistent grind size',
                  'Adjustable settings',
                  'Better flavor extraction',
                  'More expensive',
                  'Recommended for serious coffee lovers'
                ]
              },
              {
                name: 'Blade Grinder',
                description: 'Uses spinning blades to chop beans. Less consistent but more affordable.',
                characteristics: [
                  'Inexpensive',
                  'Inconsistent grind size',
                  'Can create heat (affects flavor)',
                  'Good for beginners on a budget',
                  'Better than pre-ground coffee'
                ]
              }
            ]
          }
        },
        {
          type: 'text',
          title: 'Brewing Equipment',
          content: 'Different brewing methods require different equipment. Here are the most popular options:'
        },
        {
          type: 'comparison',
          title: 'Popular Brewers',
          content: {
            items: [
              {
                name: 'V60 Pour-Over',
                description: 'A cone-shaped dripper that allows precise control over brewing.',
                characteristics: [
                  'Clean, bright coffee',
                  'Full control over brewing',
                  'Requires technique',
                  'Affordable equipment',
                  'Best for: Light to medium roasts'
                ]
              },
              {
                name: 'French Press',
                description: 'Immersion brewing method that produces full-bodied coffee.',
                characteristics: [
                  'Rich, full-bodied coffee',
                  'Simple to use',
                  'No paper filters needed',
                  'Affordable',
                  'Best for: Medium to dark roasts'
                ]
              },
              {
                name: 'AeroPress',
                description: 'Versatile, portable brewer that can make espresso-like coffee or regular coffee.',
                characteristics: [
                  'Quick brewing (1-2 minutes)',
                  'Portable and durable',
                  'Very affordable',
                  'Easy to clean',
                  'Best for: All roast levels'
                ]
              },
              {
                name: 'Espresso Machine',
                description: 'Professional-grade equipment that makes concentrated coffee under pressure.',
                characteristics: [
                  'Rich, concentrated coffee',
                  'Can make lattes, cappuccinos',
                  'Expensive',
                  'Requires skill',
                  'Best for: Coffee enthusiasts'
                ]
              },
              {
                name: 'Cold Brew Maker',
                description: 'Specialized equipment for making cold brew coffee.',
                characteristics: [
                  'Smooth, less acidic coffee',
                  'Easy to use',
                  'Makes large batches',
                  'Takes 12-24 hours',
                  'Best for: Iced coffee lovers'
                ]
              },
              {
                name: 'Moka Pot',
                description: 'Stovetop brewer that makes strong, espresso-like coffee.',
                characteristics: [
                  'Strong, concentrated coffee',
                  'Affordable',
                  'No electricity needed',
                  'Italian tradition',
                  'Best for: Strong coffee lovers'
                ]
              }
            ]
          }
        },
        {
          type: 'text',
          title: 'Accessories',
          content: 'These tools enhance your brewing experience:'
        },
        {
          type: 'comparison',
          title: 'Helpful Accessories',
          content: {
            items: [
              {
                name: 'Scale',
                description: 'Essential for consistent brewing. Coffee is measured by weight, not volume.',
                characteristics: [
                  'Precise measurements',
                  'Consistent results',
                  'Digital scales are best',
                  'Should measure to 0.1g',
                  'Highly recommended'
                ]
              },
              {
                name: 'Gooseneck Kettle',
                description: 'Kettle with a thin, curved spout for precise water pouring.',
                characteristics: [
                  'Precise pour control',
                  'Essential for pour-over',
                  'Temperature control available',
                  'Better than regular kettle',
                  'Recommended for pour-over'
                ]
              },
              {
                name: 'Filters',
                description: 'Paper or metal filters that remove coffee grounds from your brew.',
                characteristics: [
                  'Paper: Cleaner cup, disposable',
                  'Metal: Reusable, more body',
                  'Cloth: Reusable, balanced',
                  'Size matters - match your brewer',
                  'Quality affects taste'
                ]
              },
              {
                name: 'Timer',
                description: 'Helps you track brewing time for consistency.',
                characteristics: [
                  'Consistent brewing',
                  'Built into many scales',
                  'Phone timer works too',
                  'Important for pour-over',
                  'Free with most phones'
                ]
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: 3,
    title: 'What is Brewing?',
    description: 'Understand the science and fundamentals of coffee brewing.',
    unlocked: true,
    content: {
      sections: [
        {
          type: 'text',
          title: 'Understanding Extraction',
          content: 'Brewing coffee is essentially the process of extracting flavors, oils, and compounds from ground coffee beans using water. The goal is to extract the good flavors (sweet, fruity, chocolatey) while avoiding the bad ones (bitter, astringent).'
        },
        {
          type: 'diagram',
          title: 'The Brewing Process',
          content: {
            type: 'flow',
            steps: [
              {
                label: 'Grind Coffee',
                description: 'Grind beans to appropriate size for your brewing method'
              },
              {
                label: 'Add Water',
                description: 'Pour hot water over grounds (temperature matters!)'
              },
              {
                label: 'Extraction Begins',
                description: 'Water dissolves coffee compounds and extracts flavors'
              },
              {
                label: 'Time & Agitation',
                description: 'Control time and water flow to optimize extraction'
              },
              {
                label: 'Filter & Serve',
                description: 'Separate liquid from grounds and enjoy your coffee'
              }
            ]
          }
        },
        {
          type: 'text',
          title: 'The Five Key Variables',
          content: 'Master these five variables to brew consistently great coffee:'
        },
        {
          type: 'comparison',
          title: 'Brewing Variables',
          content: {
            items: [
              {
                name: 'Grind Size',
                description: 'The size of your coffee particles affects extraction speed.',
                characteristics: [
                  'Fine grind = faster extraction, more surface area',
                  'Coarse grind = slower extraction, less surface area',
                  'Match grind to brewing method',
                  'Too fine = over-extraction (bitter)',
                  'Too coarse = under-extraction (sour)'
                ]
              },
              {
                name: 'Water Temperature',
                description: 'Hot water extracts coffee compounds. Temperature affects which compounds are extracted.',
                characteristics: [
                  'Ideal range: 195-205°F (90-96°C)',
                  'Too hot = bitter, burnt flavors',
                  'Too cold = weak, under-extracted',
                  'Just off boil is usually perfect',
                  'Use thermometer or temperature-controlled kettle'
                ]
              },
              {
                name: 'Brew Time',
                description: 'How long water is in contact with coffee grounds.',
                characteristics: [
                  'Longer time = more extraction',
                  'Espresso: 25-30 seconds',
                  'Pour-over: 3-4 minutes',
                  'French press: 4-5 minutes',
                  'Cold brew: 12-24 hours'
                ]
              },
              {
                name: 'Coffee-to-Water Ratio',
                description: 'The amount of coffee relative to water determines strength.',
                characteristics: [
                  'Standard: 1:15 to 1:17 (coffee:water)',
                  'Stronger: 1:12 to 1:14',
                  'Lighter: 1:17 to 1:20',
                  'Measure by weight, not volume',
                  'Example: 20g coffee to 300g water'
                ]
              },
              {
                name: 'Agitation',
                description: 'Stirring or water flow that affects extraction.',
                characteristics: [
                  'More agitation = faster extraction',
                  'Pour-over: controlled pour creates agitation',
                  'French press: gentle stir',
                  'Too much = over-extraction',
                  'Too little = channeling (uneven extraction)'
                ]
              }
            ]
          }
        },
        {
          type: 'text',
          title: 'Extraction Balance',
          content: 'The goal is balanced extraction:\n\n• Under-extracted: Sour, salty, weak, lacks sweetness\n• Balanced: Sweet, complex, pleasant acidity, full flavor\n• Over-extracted: Bitter, astringent, dry, harsh\n\nAdjust your variables to find the sweet spot!'
        }
      ]
    }
  },
  {
    id: 4,
    title: 'Brewing Methods',
    description: 'Explore different brewing methods and find your favorite.',
    unlocked: true,
    content: {
      sections: [
        {
          type: 'text',
          title: 'Choose Your Method',
          content: 'Each brewing method produces a different style of coffee. Try different methods to discover what you enjoy most!'
        },
        {
          type: 'comparison',
          title: 'Brewing Methods Guide',
          content: {
            items: [
              {
                name: 'V60 Pour-Over',
                description: 'A cone-shaped dripper for clean, bright coffee with full control.',
                characteristics: [
                  'Taste: Clean, bright, complex',
                  'Difficulty: Medium (requires technique)',
                  'Time: 3-4 minutes',
                  'Grind: Medium-fine',
                  'Best for: Light to medium roasts',
                  'Equipment: V60, filters, gooseneck kettle, scale'
                ]
              },
              {
                name: 'French Press',
                description: 'Immersion method that produces rich, full-bodied coffee.',
                characteristics: [
                  'Taste: Rich, full-bodied, bold',
                  'Difficulty: Easy',
                  'Time: 4-5 minutes',
                  'Grind: Coarse',
                  'Best for: Medium to dark roasts',
                  'Equipment: French press, scale, kettle'
                ]
              },
              {
                name: 'AeroPress',
                description: 'Versatile, portable brewer for quick, clean coffee.',
                characteristics: [
                  'Taste: Clean, smooth, versatile',
                  'Difficulty: Easy to medium',
                  'Time: 1-2 minutes',
                  'Grind: Fine to medium-fine',
                  'Best for: All roast levels',
                  'Equipment: AeroPress, filters, scale, kettle'
                ]
              },
              {
                name: 'Espresso',
                description: 'Concentrated coffee made under pressure.',
                characteristics: [
                  'Taste: Rich, concentrated, intense',
                  'Difficulty: Advanced',
                  'Time: 25-30 seconds',
                  'Grind: Extra-fine',
                  'Best for: Milk drinks, strong coffee',
                  'Equipment: Espresso machine, grinder, tamper'
                ]
              },
              {
                name: 'Cold Brew',
                description: 'Smooth, less acidic coffee brewed with cold water over time.',
                characteristics: [
                  'Taste: Smooth, sweet, low acidity',
                  'Difficulty: Easy',
                  'Time: 12-24 hours',
                  'Grind: Coarse',
                  'Best for: Iced coffee, hot weather',
                  'Equipment: Cold brew maker or jar, filter'
                ]
              },
              {
                name: 'Moka Pot',
                description: 'Stovetop brewer that makes strong, espresso-like coffee.',
                characteristics: [
                  'Taste: Strong, concentrated, bold',
                  'Difficulty: Medium',
                  'Time: 5-10 minutes',
                  'Grind: Medium-fine',
                  'Best for: Strong coffee lovers',
                  'Equipment: Moka pot, stove, scale'
                ]
              }
            ]
          }
        }
      ]
    }
  },
  {
    id: 5,
    title: 'Coffee Tasting',
    description: 'Learn how to taste and appreciate coffee like a professional.',
    unlocked: true,
    content: {
      sections: [
        {
          type: 'text',
          title: 'The Art of Tasting',
          content: 'Tasting coffee (also called "cupping") is about paying attention to what you\'re experiencing. You don\'t need to be an expert - just be curious and notice what you taste!'
        },
        {
          type: 'text',
          title: 'How to Smell Coffee',
          content: 'Before tasting, smell your coffee. Your sense of smell is closely linked to taste. Take a moment to inhale the aroma - what do you notice? Is it fruity? Nutty? Chocolatey? Floral?'
        },
        {
          type: 'text',
          title: 'Flavor Categories',
          content: 'Coffee flavors can be grouped into categories. Here are the main ones:'
        },
        {
          type: 'comparison',
          title: 'Flavor Profiles',
          content: {
            items: [
              {
                name: 'Fruity',
                description: 'Bright, sweet, berry-like flavors.',
                characteristics: [
                  'Blueberry, strawberry, citrus',
                  'Common in: Ethiopian, Kenyan coffees',
                  'Light to medium roasts',
                  'High acidity',
                  'Bright and refreshing'
                ]
              },
              {
                name: 'Nutty',
                description: 'Toasted, warm, comforting flavors.',
                characteristics: [
                  'Almond, hazelnut, peanut',
                  'Common in: Brazilian, Colombian coffees',
                  'Medium roasts',
                  'Balanced acidity',
                  'Smooth and comforting'
                ]
              },
              {
                name: 'Chocolatey',
                description: 'Rich, sweet, cocoa-like flavors.',
                characteristics: [
                  'Dark chocolate, cocoa, caramel',
                  'Common in: Central American coffees',
                  'Medium to dark roasts',
                  'Low to medium acidity',
                  'Rich and satisfying'
                ]
              },
              {
                name: 'Floral',
                description: 'Delicate, perfumed, tea-like flavors.',
                characteristics: [
                  'Jasmine, lavender, tea',
                  'Common in: Ethiopian, some Central American',
                  'Light roasts',
                  'High acidity',
                  'Delicate and aromatic'
                ]
              },
              {
                name: 'Spicy',
                description: 'Warm, complex, aromatic flavors.',
                characteristics: [
                  'Cinnamon, clove, cardamom',
                  'Common in: Indonesian, some African',
                  'Medium to dark roasts',
                  'Medium acidity',
                  'Complex and warming'
                ]
              },
              {
                name: 'Earthy',
                description: 'Deep, rich, soil-like flavors.',
                characteristics: [
                  'Woody, mushroom, tobacco',
                  'Common in: Sumatran, some Indonesian',
                  'Dark roasts',
                  'Low acidity',
                  'Bold and robust'
                ]
              }
            ]
          }
        },
        {
          type: 'text',
          title: 'Understanding Coffee Terms',
          content: 'Here\'s what common tasting terms actually mean:'
        },
        {
          type: 'comparison',
          title: 'Tasting Terminology',
          content: {
            items: [
              {
                name: 'Acidity',
                description: 'The bright, tangy quality in coffee (not sourness!).',
                characteristics: [
                  'Makes coffee taste "alive"',
                  'Can be bright, crisp, or wine-like',
                  'Different from sour (which is unpleasant)',
                  'High acidity = fruity, bright',
                  'Low acidity = smooth, mellow'
                ]
              },
              {
                name: 'Body',
                description: 'The weight and texture of coffee in your mouth.',
                characteristics: [
                  'Light body = tea-like, thin',
                  'Medium body = balanced, smooth',
                  'Full body = rich, creamy, thick',
                  'French press = full body',
                  'Pour-over = light to medium body'
                ]
              },
              {
                name: 'Bitterness',
                description: 'A taste sensation that can be pleasant or unpleasant.',
                characteristics: [
                  'Some bitterness is normal (like dark chocolate)',
                  'Too much = over-extraction or dark roast',
                  'Balanced bitterness = complexity',
                  'Can be reduced with proper brewing',
                  'Personal preference varies'
                ]
              },
              {
                name: 'Sweetness',
                description: 'Natural sugars in coffee create sweetness.',
                characteristics: [
                  'Not added sugar - natural coffee sweetness',
                  'Caramel, honey, brown sugar notes',
                  'Well-extracted coffee should be sweet',
                  'Light to medium roasts often sweeter',
                  'Sign of good quality coffee'
                ]
              }
            ]
          }
        },
        {
          type: 'text',
          title: 'How to Describe Coffee',
          content: 'You don\'t need fancy words! Just describe what you taste:\n\n• "This tastes fruity, like blueberries"\n• "It\'s smooth and nutty"\n• "Very chocolatey and rich"\n• "Bright and citrusy"\n• "Earthy and bold"\n\nThere\'s no right or wrong answer - it\'s about what YOU taste!'
        }
      ]
    }
  },
  {
    id: 6,
    title: 'Grind Size Guide',
    description: 'Master grind sizes for perfect brewing.',
    unlocked: true,
    content: {
      sections: [
        {
          type: 'text',
          title: 'Why Grind Size Matters',
          content: 'Grind size is one of the most important factors in brewing great coffee. The right grind size ensures proper extraction for your brewing method.'
        },
        {
          type: 'text',
          title: 'Grind Size Spectrum',
          content: 'From finest to coarsest, here\'s what each grind size looks like and when to use it:'
        },
        {
          type: 'comparison',
          title: 'Grind Sizes Explained',
          content: {
            items: [
              {
                name: 'Extra Fine',
                description: 'Powder-like, feels like flour between fingers.',
                characteristics: [
                  'Looks like: Powder, flour',
                  'Use for: Turkish coffee',
                  'Brew time: Very short',
                  'Surface area: Maximum',
                  'Extraction: Very fast'
                ]
              },
              {
                name: 'Fine',
                description: 'Fine sand texture, feels smooth.',
                characteristics: [
                  'Looks like: Fine sand, table salt',
                  'Use for: Espresso',
                  'Brew time: 25-30 seconds',
                  'Surface area: Very high',
                  'Extraction: Fast'
                ]
              },
              {
                name: 'Medium-Fine',
                description: 'Slightly coarser than fine, still feels smooth.',
                characteristics: [
                  'Looks like: Regular sand',
                  'Use for: AeroPress, Moka pot',
                  'Brew time: 1-3 minutes',
                  'Surface area: High',
                  'Extraction: Medium-fast'
                ]
              },
              {
                name: 'Medium',
                description: 'Coarse sand texture, visible particles.',
                characteristics: [
                  'Looks like: Coarse sand',
                  'Use for: Drip coffee makers',
                  'Brew time: 4-6 minutes',
                  'Surface area: Medium',
                  'Extraction: Balanced'
                ]
              },
              {
                name: 'Medium-Coarse',
                description: 'Small chunks, feels gritty.',
                characteristics: [
                  'Looks like: Rough sand, small pebbles',
                  'Use for: Pour-over (V60, Kalita)',
                  'Brew time: 3-4 minutes',
                  'Surface area: Medium-low',
                  'Extraction: Medium'
                ]
              },
              {
                name: 'Coarse',
                description: 'Large chunks, feels chunky.',
                characteristics: [
                  'Looks like: Sea salt, small rocks',
                  'Use for: French press, cold brew',
                  'Brew time: 4+ minutes',
                  'Surface area: Low',
                  'Extraction: Slow'
                ]
              },
              {
                name: 'Extra Coarse',
                description: 'Very large chunks, pebble-like.',
                characteristics: [
                  'Looks like: Large sea salt, pebbles',
                  'Use for: Cold brew (extended)',
                  'Brew time: 12-24 hours',
                  'Surface area: Very low',
                  'Extraction: Very slow'
                ]
              }
            ]
          }
        },
        {
          type: 'text',
          title: 'Quick Reference Guide',
          content: 'When buying pre-ground coffee or asking a barista to grind for you:\n\n• V60 / Pour-over: Medium-coarse\n• French Press: Coarse\n• AeroPress: Medium-fine\n• Espresso: Fine\n• Cold Brew: Coarse to extra-coarse\n• Moka Pot: Medium-fine\n• Drip Coffee Maker: Medium'
        },
        {
          type: 'text',
          title: 'Pro Tips',
          content: '• If your coffee tastes bitter: Grind coarser\n• If your coffee tastes sour: Grind finer\n• Always grind fresh - pre-ground loses flavor quickly\n• Invest in a good burr grinder for consistency\n• Adjust grind based on your taste preferences'
        }
      ]
    }
  }
];

export const getLevel = (id: number): Level | undefined => {
  return levels.find(level => level.id === id);
};

export const getTotalLevels = (): number => {
  return levels.length;
};

