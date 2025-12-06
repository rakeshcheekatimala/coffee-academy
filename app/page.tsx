'use client';

import { JourneyHero } from '@/components/journey/JourneyHero';
import { JourneyStage } from '@/components/journey/JourneyStage';
import { JourneySection, JourneyDivider, JourneyCallToAction } from '@/components/journey/JourneySection';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Flame, Droplets, Coffee, Sparkles, BookOpen, Users, Star } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Journey stages data
const journeyStages = [
  {
    id: 'bean',
    title: 'The Bean',
    subtitle: 'Where it all begins',
    description:
      'Every great cup of coffee starts with a humble seed. Coffee beans are actually seeds from the Coffea plant, primarily grown in the "Bean Belt" — the tropical region between the Tropics of Cancer and Capricorn.',
    details: [
      'Arabica and Robusta are the two main species',
      'Altitude, climate, and soil affect flavor profiles',
      'Single-origin beans showcase unique regional characteristics',
      'Harvesting method impacts final quality',
    ],
    icon: Leaf,
    gradient: 'bg-gradient-to-b from-[#1a0f0a] to-[#2d1810] text-amber-100',
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400',
  },
  {
    id: 'roast',
    title: 'The Roast',
    subtitle: 'Unlocking the flavor',
    description:
      'Roasting transforms green coffee beans into the aromatic, flavorful beans we know and love. This crucial step develops over 800 different compounds that create coffee\'s complex taste profile.',
    details: [
      'Light roasts preserve origin flavors and have higher acidity',
      'Medium roasts balance acidity with body',
      'Dark roasts bring out bold, smoky notes',
      'The "first crack" and "second crack" mark key roasting stages',
    ],
    icon: Flame,
    gradient: 'bg-gradient-to-b from-[#2d1810] to-[#4a2c1a] text-orange-100',
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-400',
  },
  {
    id: 'brew',
    title: 'The Brew',
    subtitle: 'The art of extraction',
    description:
      'Brewing is where science meets art. Water temperature, grind size, and extraction time work together to pull the perfect balance of flavors from your roasted beans.',
    details: [
      'Water temperature: 195-205°F (90-96°C) is ideal',
      'Grind size determines extraction rate',
      'Brew ratio typically ranges from 1:15 to 1:18 coffee to water',
      'Different methods highlight different flavor characteristics',
    ],
    icon: Droplets,
    gradient: 'bg-gradient-to-b from-[#4a2c1a] to-[#5c3d2e] text-blue-100',
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400',
  },
  {
    id: 'cup',
    title: 'The Cup',
    subtitle: 'The perfect moment',
    description:
      'The final destination of your coffee journey — a perfectly crafted cup that tells the story of its origin, roasting, and brewing. Take a moment to appreciate the complexity in every sip.',
    details: [
      'Aroma accounts for much of what we perceive as taste',
      'Temperature affects flavor perception',
      'Tasting notes range from fruity to nutty to chocolatey',
      'The aftertaste (finish) reveals hidden complexities',
    ],
    icon: Coffee,
    gradient: 'bg-gradient-to-b from-[#5c3d2e] to-[#3d251a] text-amber-100',
    textGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300',
  },
];

// Stage illustrations (SVG-based)
function BeanIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        {/* Coffee plant leaves */}
        <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64">
          <defs>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id="beanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          {/* Leaves */}
          <ellipse cx="60" cy="80" rx="30" ry="50" fill="url(#leafGradient)" transform="rotate(-30 60 80)" opacity="0.9" />
          <ellipse cx="140" cy="80" rx="30" ry="50" fill="url(#leafGradient)" transform="rotate(30 140 80)" opacity="0.9" />
          <ellipse cx="100" cy="60" rx="25" ry="45" fill="url(#leafGradient)" opacity="0.8" />
          {/* Coffee cherries/beans */}
          <ellipse cx="85" cy="130" rx="18" ry="22" fill="url(#beanGradient)" />
          <ellipse cx="115" cy="130" rx="18" ry="22" fill="url(#beanGradient)" />
          <ellipse cx="100" cy="155" rx="16" ry="20" fill="url(#beanGradient)" opacity="0.8" />
          {/* Stem */}
          <path d="M100 100 L100 180" stroke="#15803d" strokeWidth="4" fill="none" />
        </svg>
      </motion.div>
    </div>
  );
}

function RoastIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div className="relative">
        {/* Roasting drum */}
        <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64">
          <defs>
            <linearGradient id="drumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#78716c" />
              <stop offset="100%" stopColor="#44403c" />
            </linearGradient>
            <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#dc2626" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>
          {/* Drum body */}
          <ellipse cx="100" cy="90" rx="60" ry="40" fill="url(#drumGradient)" />
          <rect x="40" y="50" width="120" height="80" fill="url(#drumGradient)" rx="10" />
          <ellipse cx="100" cy="50" rx="60" ry="40" fill="#a8a29e" />
          {/* Flames */}
          <motion.g
            animate={{ y: [-2, 2, -2], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <path d="M60 160 Q65 140 60 130 Q70 145 75 160 Z" fill="url(#fireGradient)" />
            <path d="M85 165 Q90 140 85 125 Q100 145 105 165 Z" fill="url(#fireGradient)" />
            <path d="M115 160 Q120 140 115 130 Q125 145 130 160 Z" fill="url(#fireGradient)" />
            <path d="M140 165 Q145 145 140 135 Q150 150 155 165 Z" fill="url(#fireGradient)" />
          </motion.g>
          {/* Coffee beans inside (visible through opening) */}
          <ellipse cx="100" cy="75" rx="35" ry="20" fill="#78350f" opacity="0.6" />
        </svg>
        {/* Heat waves */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-8 -top-8"
            style={{ left: 20 + i * 30 }}
            animate={{ y: [-10, -30], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
          >
            <div className="w-4 h-8 border-2 border-orange-400/40 rounded-full" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function BrewIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div className="relative">
        <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64">
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e5e5e5" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#e5e5e5" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Pour-over dripper */}
          <path d="M60 30 L80 30 L100 80 L120 30 L140 30 L110 100 L90 100 Z" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="2" />
          {/* Filter/coffee bed */}
          <path d="M75 50 L92 90 L108 90 L125 50 Z" fill="#78350f" opacity="0.8" />
          {/* Water drops */}
          <motion.g
            animate={{ y: [0, 60], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <circle cx="100" cy="95" r="4" fill="url(#waterGradient)" />
          </motion.g>
          <motion.g
            animate={{ y: [0, 60], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            <circle cx="95" cy="98" r="3" fill="url(#coffeeGradient)" />
          </motion.g>
          <motion.g
            animate={{ y: [0, 60], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          >
            <circle cx="105" cy="96" r="3.5" fill="url(#coffeeGradient)" />
          </motion.g>
          {/* Carafe */}
          <path d="M70 120 L70 180 Q100 190 130 180 L130 120 Z" fill="url(#glassGradient)" stroke="#a8a29e" strokeWidth="2" />
          {/* Coffee in carafe */}
          <motion.path
            d="M72 150 L72 178 Q100 186 128 178 L128 150 Z"
            fill="url(#coffeeGradient)"
            initial={{ d: "M72 175 L72 178 Q100 186 128 178 L128 175 Z" }}
            animate={{ d: "M72 140 L72 178 Q100 186 128 178 L128 140 Z" }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

function CupIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div className="relative">
        <svg viewBox="0 0 200 200" className="w-48 h-48 md:w-64 md:h-64">
          <defs>
            <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
            <linearGradient id="cupCoffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>
          {/* Saucer */}
          <ellipse cx="100" cy="170" rx="70" ry="15" fill="#f5f5f4" />
          <ellipse cx="100" cy="168" rx="60" ry="12" fill="#e5e5e5" />
          {/* Cup body */}
          <path d="M50 80 L55 155 Q100 170 145 155 L150 80 Z" fill="url(#cupGradient)" />
          <ellipse cx="100" cy="80" rx="50" ry="15" fill="#fef9c3" />
          {/* Coffee surface */}
          <ellipse cx="100" cy="85" rx="42" ry="12" fill="url(#cupCoffeeGradient)" />
          {/* Handle */}
          <path d="M150 95 Q175 95 175 120 Q175 145 150 145" fill="none" stroke="url(#cupGradient)" strokeWidth="12" strokeLinecap="round" />
          {/* Steam */}
          <motion.g>
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M${85 + i * 15} 60 Q${80 + i * 15} 40 ${90 + i * 15} 20`}
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.4"
                animate={{ y: [-5, -15], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

const stageIllustrations = [
  <BeanIllustration key="bean" />,
  <RoastIllustration key="roast" />,
  <BrewIllustration key="brew" />,
  <CupIllustration key="cup" />,
];

// Features section
const features = [
  {
    icon: BookOpen,
    title: 'Learn',
    description: 'Interactive lessons from bean basics to advanced brewing techniques',
    href: '/levels',
    color: 'text-emerald-500',
  },
  {
    icon: Sparkles,
    title: 'Discover',
    description: 'Find your perfect coffee with our personalized recommendation wizard',
    href: '/wizard',
    color: 'text-amber-500',
  },
  {
    icon: Coffee,
    title: 'Brew',
    description: 'Step-by-step recipes for every brewing method',
    href: '/recipes',
    color: 'text-blue-500',
  },
  {
    icon: Users,
    title: 'Connect',
    description: 'Join our community of coffee enthusiasts',
    href: '/community',
    color: 'text-purple-500',
  },
];

export default function CoffeeJourneyPage() {
  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <main className="relative">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 z-50"
        style={{ width: progressBarWidth }}
      />

      {/* Hero section */}
      <JourneyHero />

      {/* Journey stages */}
      {journeyStages.map((stage, index) => (
        <div key={stage.id}>
          {index > 0 && (
            <JourneyDivider
              variant={index === 1 ? 'drip' : index === 2 ? 'steam' : 'wave'}
              fromColor={journeyStages[index - 1].gradient.includes('1a0f0a') ? '#1a0f0a' : 
                        journeyStages[index - 1].gradient.includes('2d1810') ? '#2d1810' :
                        journeyStages[index - 1].gradient.includes('4a2c1a') ? '#4a2c1a' : '#5c3d2e'}
              toColor={stage.gradient.includes('2d1810') ? '#2d1810' :
                      stage.gradient.includes('4a2c1a') ? '#4a2c1a' :
                      stage.gradient.includes('5c3d2e') ? '#5c3d2e' : '#3d251a'}
            />
          )}
          <JourneyStage
            {...stage}
            index={index}
            illustration={stageIllustrations[index]}
          />
        </div>
      ))}

      {/* Transition to features */}
      <JourneyDivider variant="wave" fromColor="#3d251a" toColor="#faf7f5" />

      {/* Features section */}
      <section className="py-24 bg-gradient-to-b from-[#faf7f5] to-white">
        <div className="container mx-auto px-6">
          <JourneySection className="text-center mb-16">
            <h2
              className="text-4xl md:text-5xl font-bold text-coffee-dark mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Start Your Journey
            </h2>
            <p className="text-xl text-coffee-medium/80 max-w-2xl mx-auto">
              Everything you need to become a coffee connoisseur
            </p>
          </JourneySection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <JourneySection key={feature.title} delay={index * 0.1}>
                <Link href={feature.href}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer border-coffee-light/20 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl bg-current/10 flex items-center justify-center mb-4 ${feature.color}`}>
                        <feature.icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl text-coffee-dark group-hover:text-amber-700 transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-coffee-medium/70">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </JourneySection>
            ))}
          </div>
        </div>
      </section>

      {/* Brew of the Week teaser */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-6">
          <JourneySection className="text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-amber-100 text-amber-800">
              <Star className="w-4 h-4 fill-amber-500" />
              <span className="text-sm font-medium">Featured This Week</span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              Brew of the Week
            </h2>
            <p className="text-lg text-coffee-medium/80 mb-8 max-w-xl mx-auto">
              Discover our curated weekly selection of exceptional coffees and brewing methods
            </p>
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-500 text-white rounded-full"
            >
              <Link href="/brew-of-the-week">See This Week&apos;s Pick</Link>
            </Button>
          </JourneySection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-[#2d1810] to-[#1a0f0a] text-amber-100">
        <div className="container mx-auto px-6">
          <JourneyCallToAction
            title="Ready to Begin?"
            description="Whether you're a complete beginner or a seasoned enthusiast, there's always more to discover in the world of coffee."
            primaryAction={{ label: 'Take the Coffee Quiz', href: '/wizard' }}
            secondaryAction={{ label: 'Browse Recipes', href: '/recipes' }}
          />
        </div>
      </section>
      </main>
  );
}
