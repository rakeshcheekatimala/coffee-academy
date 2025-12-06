import { CoffeeRecommendation } from '@/lib/types';

export const recommendations: CoffeeRecommendation[] = [
  {
    id: 'brazilian-medium',
    name: 'Brazilian Medium Roast',
    origin: 'Brazil',
    roast: 'medium',
    flavorProfile: ['Nutty', 'Chocolatey', 'Caramel', 'Smooth'],
    acidity: 'low',
    body: 'medium',
    description: 'A classic, balanced coffee that\'s perfect for beginners. Smooth and easy-drinking with comforting nutty and chocolatey flavors. Low acidity makes it gentle on the stomach.',
    bestFor: [
      'First-time coffee drinkers',
      'Those who prefer smooth, balanced flavors',
      'Morning coffee',
      'All brewing methods'
    ]
  },
  {
    id: 'colombian-medium',
    name: 'Colombian Medium Roast',
    origin: 'Colombia',
    roast: 'medium',
    flavorProfile: ['Balanced', 'Nutty', 'Caramel', 'Mild fruit'],
    acidity: 'medium',
    body: 'medium',
    description: 'Well-balanced coffee with mild acidity and smooth body. Known for its consistent quality and approachable flavor profile. Great introduction to specialty coffee.',
    bestFor: [
      'Beginners exploring coffee',
      'Daily drinking',
      'Drip coffee makers',
      'French press'
    ]
  },
  {
    id: 'guatemalan-medium',
    name: 'Guatemalan Medium Roast',
    origin: 'Guatemala',
    roast: 'medium',
    flavorProfile: ['Chocolatey', 'Nutty', 'Caramel', 'Citrus'],
    acidity: 'medium',
    body: 'medium',
    description: 'Smooth and sweet with chocolate and caramel notes, balanced by gentle citrus acidity. Approachable yet interesting flavor profile.',
    bestFor: [
      'Those who like chocolatey flavors',
      'Pour-over brewing',
      'Afternoon coffee',
      'Beginners ready for more complexity'
    ]
  },
  {
    id: 'sumatran-dark',
    name: 'Sumatran Dark Roast',
    origin: 'Sumatra, Indonesia',
    roast: 'dark',
    flavorProfile: ['Earthy', 'Bold', 'Spicy', 'Full-bodied'],
    acidity: 'low',
    body: 'full',
    description: 'Bold and full-bodied with low acidity. Earthy and spicy flavors make it perfect for those who prefer strong, robust coffee. Great for French press.',
    bestFor: [
      'Those who like strong coffee',
      'French press brewing',
      'Morning coffee',
      'Adding milk or cream'
    ]
  },
  {
    id: 'ethiopian-light',
    name: 'Ethiopian Light Roast',
    origin: 'Ethiopia',
    roast: 'light',
    flavorProfile: ['Fruity', 'Floral', 'Bright', 'Tea-like'],
    acidity: 'high',
    body: 'light',
    description: 'Bright and fruity with floral notes. High acidity and light body make it refreshing and tea-like. Perfect for those who enjoy fruity, complex flavors.',
    bestFor: [
      'Those who like fruity flavors',
      'Pour-over brewing',
      'Afternoon coffee',
      'Experienced coffee drinkers'
    ]
  },
  {
    id: 'peruvian-medium',
    name: 'Peruvian Medium Roast',
    origin: 'Peru',
    roast: 'medium',
    flavorProfile: ['Smooth', 'Nutty', 'Mild fruit', 'Balanced'],
    acidity: 'low',
    body: 'medium',
    description: 'Exceptionally smooth and balanced with low acidity. Nutty with hints of mild fruit. Very approachable and easy-drinking, perfect for beginners.',
    bestFor: [
      'Sensitive stomachs',
      'First-time specialty coffee',
      'All day drinking',
      'All brewing methods'
    ]
  },
  {
    id: 'costa-rican-medium',
    name: 'Costa Rican Medium Roast',
    origin: 'Costa Rica',
    roast: 'medium',
    flavorProfile: ['Bright', 'Citrus', 'Caramel', 'Clean'],
    acidity: 'medium',
    body: 'medium',
    description: 'Clean and bright with citrus notes balanced by caramel sweetness. Medium acidity and body make it versatile and enjoyable.',
    bestFor: [
      'Those who like bright, clean flavors',
      'Pour-over brewing',
      'Morning coffee',
      'Beginners exploring acidity'
    ]
  },
  {
    id: 'mexican-light',
    name: 'Mexican Light Roast',
    origin: 'Mexico',
    roast: 'light',
    flavorProfile: ['Mild', 'Nutty', 'Chocolatey', 'Smooth'],
    acidity: 'low',
    body: 'light',
    description: 'Mild and smooth with low acidity. Nutty and chocolatey flavors make it very approachable. Great introduction to light roasts.',
    bestFor: [
      'Beginners trying light roasts',
      'Sensitive stomachs',
      'Afternoon coffee',
      'Pour-over brewing'
    ]
  },
  {
    id: 'honduran-medium',
    name: 'Honduran Medium Roast',
    origin: 'Honduras',
    roast: 'medium',
    flavorProfile: ['Sweet', 'Caramel', 'Chocolatey', 'Balanced'],
    acidity: 'low',
    body: 'medium',
    description: 'Sweet and balanced with caramel and chocolate notes. Low acidity and smooth body make it very easy-drinking and beginner-friendly.',
    bestFor: [
      'Those who prefer sweet coffee',
      'Daily drinking',
      'All brewing methods',
      'Beginners'
    ]
  },
  {
    id: 'kenyan-light',
    name: 'Kenyan Light Roast',
    origin: 'Kenya',
    roast: 'light',
    flavorProfile: ['Fruity', 'Wine-like', 'Bright', 'Complex'],
    acidity: 'high',
    body: 'medium',
    description: 'Complex and fruity with wine-like acidity. Bright and vibrant flavors. Best for those ready to explore more complex coffee profiles.',
    bestFor: [
      'Experienced coffee drinkers',
      'Those who like fruity, complex flavors',
      'Pour-over brewing',
      'Afternoon coffee'
    ]
  }
];

export const getRecommendation = (id: string): CoffeeRecommendation | undefined => {
  return recommendations.find(rec => rec.id === id);
};

export const getRecommendationsByRoast = (roast: 'light' | 'medium' | 'medium-dark' | 'dark'): CoffeeRecommendation[] => {
  return recommendations.filter(rec => rec.roast === roast);
};

export const getRecommendationsByAcidity = (acidity: 'low' | 'medium' | 'high'): CoffeeRecommendation[] => {
  return recommendations.filter(rec => rec.acidity === acidity);
};

export const getBeginnerRecommendations = (): CoffeeRecommendation[] => {
  return recommendations.filter(rec => 
    rec.roast === 'medium' && 
    (rec.acidity === 'low' || rec.acidity === 'medium')
  );
};

export const getAllRecommendations = (): CoffeeRecommendation[] => {
  return recommendations;
};

