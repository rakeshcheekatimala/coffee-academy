import { UserBrew, UserRecipe, UserProfile } from '@/lib/types';

// Mock user profiles
export const mockUsers: UserProfile[] = [
  {
    id: 'user-1',
    username: 'coffeelover42',
    displayName: 'Sarah Chen',
    avatar: undefined,
    bio: 'Pour-over enthusiast from Seattle. Always chasing that perfect cup.',
    createdAt: '2024-01-10',
  },
  {
    id: 'user-2',
    username: 'beanboss',
    displayName: 'Marcus Rodriguez',
    avatar: undefined,
    bio: 'Home barista and espresso fanatic. Learning something new every day.',
    createdAt: '2024-02-15',
  },
  {
    id: 'user-3',
    username: 'morningbrew',
    displayName: 'Emily Watson',
    avatar: undefined,
    bio: 'Coffee is my love language. Specialty coffee convert since 2023.',
    createdAt: '2024-03-01',
  },
];

// Mock user brews
export const mockUserBrews: UserBrew[] = [
  {
    id: 'brew-1',
    userId: 'user-1',
    userName: 'Sarah Chen',
    title: 'Morning V60 with Ethiopian Yirgacheffe',
    description: 'Perfect weekend morning brew. The floral notes really came through with the 1:16 ratio. Used James Hoffmann technique with a 4:30 total brew time.',
    photos: [],
    beforePhoto: undefined,
    afterPhoto: undefined,
    recipeId: 'v60-pour-over',
    equipmentUsed: ['V60', 'Gooseneck Kettle', 'Baratza Encore'],
    tasteNotes: ['Jasmine', 'Blueberry', 'Lemon zest', 'Tea-like body'],
    rating: 5,
    createdAt: '2024-03-15T08:30:00Z',
    likes: 24,
  },
  {
    id: 'brew-2',
    userId: 'user-2',
    userName: 'Marcus Rodriguez',
    title: 'Dialing in my espresso - Day 15',
    description: 'Finally getting consistent shots! 18g in, 36g out, 28 seconds. The Brazilian beans are really forgiving for learning.',
    photos: [],
    equipmentUsed: ['Gaggia Classic Pro', 'Eureka Mignon Notte'],
    tasteNotes: ['Chocolate', 'Hazelnut', 'Caramel sweetness'],
    rating: 4,
    createdAt: '2024-03-14T07:15:00Z',
    likes: 18,
  },
  {
    id: 'brew-3',
    userId: 'user-3',
    userName: 'Emily Watson',
    title: 'Cold Brew Concentrate - 18 hour steep',
    description: 'Made a big batch for the week. Using Guatemalan beans this time. The chocolate notes are incredible over ice with a splash of oat milk.',
    photos: [],
    recipeId: 'cold-brew',
    equipmentUsed: ['Toddy Cold Brew System', 'Kitchen Scale'],
    tasteNotes: ['Dark chocolate', 'Smooth', 'Low acidity', 'Sweet finish'],
    rating: 5,
    createdAt: '2024-03-13T16:00:00Z',
    likes: 31,
  },
  {
    id: 'brew-4',
    userId: 'user-1',
    userName: 'Sarah Chen',
    title: 'AeroPress Championship Recipe Attempt',
    description: 'Tried the 2023 World AeroPress Championship winning recipe. Inverted method, 14g coffee, 200g water, 2:00 steep. Different but delicious!',
    photos: [],
    recipeId: 'aeropress',
    equipmentUsed: ['AeroPress', 'Fellow Prismo', 'Timemore C2 Grinder'],
    tasteNotes: ['Clean', 'Bright', 'Stone fruit', 'Silky body'],
    rating: 4,
    createdAt: '2024-03-12T09:45:00Z',
    likes: 42,
  },
  {
    id: 'brew-5',
    userId: 'user-2',
    userName: 'Marcus Rodriguez',
    title: 'French Press Sunday',
    description: 'Lazy Sunday calls for French press. Coarse grind, 4 minute steep, breaking the crust at 4 minutes. Simple and satisfying.',
    photos: [],
    recipeId: 'french-press',
    equipmentUsed: ['Bodum French Press', 'Baratza Virtuoso'],
    tasteNotes: ['Full body', 'Nutty', 'Creamy', 'Rich'],
    rating: 4,
    createdAt: '2024-03-10T10:30:00Z',
    likes: 15,
  },
];

// Mock user recipes
export const mockUserRecipes: UserRecipe[] = [
  {
    id: 'user-recipe-1',
    userId: 'user-1',
    userName: 'Sarah Chen',
    userAvatar: undefined,
    title: 'Honey Cinnamon Latte',
    description: 'My signature drink - espresso with steamed oat milk, honey, and a pinch of cinnamon. Perfect for fall mornings.',
    category: 'hot',
    difficulty: 'medium',
    time: '5 minutes',
    servings: 1,
    coffeeAmount: '18g',
    waterAmount: '200ml milk',
    waterTemp: '150-160°F',
    brewTime: '25-30 seconds espresso',
    ingredients: [
      { name: 'Espresso', amount: '18', unit: 'g' },
      { name: 'Oat milk', amount: '200', unit: 'ml' },
      { name: 'Honey', amount: '1', unit: 'tbsp' },
      { name: 'Cinnamon', amount: '1/4', unit: 'tsp' },
    ],
    tools: ['Espresso machine', 'Milk pitcher', 'Latte cup'],
    grindSize: 'fine',
    steps: [
      { step: 1, instruction: 'Add honey to the bottom of your latte cup.' },
      { step: 2, instruction: 'Pull a double shot of espresso (18g in, 36g out, 25-30 seconds) directly into the cup.' },
      { step: 3, instruction: 'Stir the honey into the espresso until dissolved.' },
      { step: 4, instruction: 'Steam oat milk to 150-160°F, creating silky microfoam.', temperature: '150-160°F' },
      { step: 5, instruction: 'Pour steamed milk into the espresso, creating latte art if desired.' },
      { step: 6, instruction: 'Dust with cinnamon and serve immediately.' },
    ],
    tips: [
      'Oat milk steams really well for latte art',
      'Local honey adds complex sweetness',
      'Warm the cup first for better temperature retention',
    ],
    photos: [],
    rating: 4.8,
    ratingCount: 15,
    createdAt: '2024-02-20T14:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
    tasteNotes: 'Sweet, warm spices, creamy, comforting',
  },
  {
    id: 'user-recipe-2',
    userId: 'user-3',
    userName: 'Emily Watson',
    userAvatar: undefined,
    title: 'Vietnamese Iced Coffee (Cà Phê Sữa Đá)',
    description: 'The recipe that converted me to specialty coffee! Strong, sweet, and incredibly refreshing.',
    category: 'cold',
    difficulty: 'easy',
    time: '10 minutes',
    servings: 1,
    coffeeAmount: '25g',
    waterAmount: '100ml',
    waterTemp: 'Boiling',
    brewTime: '5-7 minutes',
    ingredients: [
      { name: 'Dark roast Vietnamese coffee', amount: '25', unit: 'g' },
      { name: 'Boiling water', amount: '100', unit: 'ml' },
      { name: 'Sweetened condensed milk', amount: '2-3', unit: 'tbsp' },
      { name: 'Ice', amount: '1', unit: 'cup' },
    ],
    tools: ['Vietnamese phin filter', 'Glass', 'Spoon'],
    grindSize: 'medium-coarse',
    steps: [
      { step: 1, instruction: 'Add 2-3 tablespoons of sweetened condensed milk to a glass.' },
      { step: 2, instruction: 'Add ground coffee to the phin filter and gently press with the filter screen.' },
      { step: 3, instruction: 'Place the phin on top of your glass.' },
      { step: 4, instruction: 'Add a small amount of hot water to bloom for 30 seconds.', duration: '30 seconds' },
      { step: 5, instruction: 'Fill the phin with remaining water. Let it drip through completely (5-7 minutes).', duration: '5-7 minutes' },
      { step: 6, instruction: 'Remove the phin, stir to mix coffee and condensed milk thoroughly.' },
      { step: 7, instruction: 'Fill another glass with ice and pour the coffee mixture over. Enjoy!' },
    ],
    tips: [
      'Café du Monde or Trung Nguyen are traditional choices',
      'Adjust condensed milk to your sweetness preference',
      'The slower the drip, the stronger the coffee',
    ],
    photos: [],
    rating: 4.9,
    ratingCount: 28,
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-02-10T09:00:00Z',
    tasteNotes: 'Bold, very sweet, creamy, refreshing',
  },
];

// Local storage helpers
const USER_BREWS_KEY = 'coffeeAcademy_userBrews';
const USER_RECIPES_KEY = 'coffeeAcademy_userRecipes';
const CURRENT_USER_KEY = 'coffeeAcademy_currentUser';

// Get all brews (mock + localStorage)
export const getAllUserBrews = (): UserBrew[] => {
  if (typeof window === 'undefined') return mockUserBrews;
  
  const storedBrews = localStorage.getItem(USER_BREWS_KEY);
  const userBrews = storedBrews ? JSON.parse(storedBrews) : [];
  
  return [...mockUserBrews, ...userBrews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Get all user recipes (mock + localStorage)
export const getAllUserRecipes = (): UserRecipe[] => {
  if (typeof window === 'undefined') return mockUserRecipes;
  
  const storedRecipes = localStorage.getItem(USER_RECIPES_KEY);
  const userRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];
  
  return [...mockUserRecipes, ...userRecipes].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Add a new brew
export const addUserBrew = (brew: Omit<UserBrew, 'id' | 'createdAt' | 'likes'>): UserBrew => {
  const newBrew: UserBrew = {
    ...brew,
    id: `brew-${Date.now()}`,
    createdAt: new Date().toISOString(),
    likes: 0,
  };
  
  if (typeof window !== 'undefined') {
    const storedBrews = localStorage.getItem(USER_BREWS_KEY);
    const userBrews = storedBrews ? JSON.parse(storedBrews) : [];
    localStorage.setItem(USER_BREWS_KEY, JSON.stringify([...userBrews, newBrew]));
  }
  
  return newBrew;
};

// Add a new recipe
export const addUserRecipe = (recipe: Omit<UserRecipe, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'ratingCount'>): UserRecipe => {
  const newRecipe: UserRecipe = {
    ...recipe,
    id: `user-recipe-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rating: 0,
    ratingCount: 0,
  };
  
  if (typeof window !== 'undefined') {
    const storedRecipes = localStorage.getItem(USER_RECIPES_KEY);
    const userRecipes = storedRecipes ? JSON.parse(storedRecipes) : [];
    localStorage.setItem(USER_RECIPES_KEY, JSON.stringify([...userRecipes, newRecipe]));
  }
  
  return newRecipe;
};

// Get or create current user
export const getCurrentUser = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;
  
  const storedUser = localStorage.getItem(CURRENT_USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

// Create/update current user
export const setCurrentUser = (user: Omit<UserProfile, 'id' | 'createdAt'>): UserProfile => {
  const newUser: UserProfile = {
    ...user,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  }
  
  return newUser;
};

// Like a brew
export const likeBrew = (brewId: string): void => {
  if (typeof window === 'undefined') return;
  
  const storedBrews = localStorage.getItem(USER_BREWS_KEY);
  const userBrews: UserBrew[] = storedBrews ? JSON.parse(storedBrews) : [];
  
  const updatedBrews = userBrews.map((brew) =>
    brew.id === brewId ? { ...brew, likes: brew.likes + 1 } : brew
  );
  
  localStorage.setItem(USER_BREWS_KEY, JSON.stringify(updatedBrews));
};

// Get user's brews
export const getUserBrews = (userId: string): UserBrew[] => {
  return getAllUserBrews().filter((brew) => brew.userId === userId);
};

// Get user's recipes
export const getUserRecipes = (userId: string): UserRecipe[] => {
  return getAllUserRecipes().filter((recipe) => recipe.userId === userId);
};

