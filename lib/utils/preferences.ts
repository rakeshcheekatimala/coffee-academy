import { WizardPreferences } from '@/lib/types';

const PREFERENCES_KEY = 'coffeeAcademy_preferences';
const FAVORITES_KEY = 'coffeeAcademy_favorites';
const HISTORY_KEY = 'coffeeAcademy_history';

// Types
export interface UserPreferences extends WizardPreferences {
  savedAt?: string;
}

export interface Favorites {
  recipes: string[];
  coffees: string[];
  articles: string[];
}

export interface ViewHistory {
  recipes: Array<{ id: string; viewedAt: string }>;
  coffees: Array<{ id: string; viewedAt: string }>;
  articles: Array<{ id: string; viewedAt: string }>;
}

// Default preferences
export const defaultPreferences: UserPreferences = {
  experience: 'beginner',
  intensity: 'medium',
  flavorNotes: [],
  brewingTime: 'moderate',
  caffeineLevel: 'regular',
  beanOrigin: [],
  roastLevel: 'any',
  budget: 'budget',
};

// Preferences management
export const getPreferences = (): UserPreferences | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(PREFERENCES_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const savePreferences = (preferences: UserPreferences): void => {
  if (typeof window === 'undefined') return;
  
  const toSave = {
    ...preferences,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(toSave));
};

export const clearPreferences = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PREFERENCES_KEY);
};

export const hasPreferences = (): boolean => {
  return getPreferences() !== null;
};

// Favorites management
export const getFavorites = (): Favorites => {
  if (typeof window === 'undefined') {
    return { recipes: [], coffees: [], articles: [] };
  }
  
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored 
    ? JSON.parse(stored) 
    : { recipes: [], coffees: [], articles: [] };
};

export const addFavorite = (type: keyof Favorites, id: string): void => {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  if (!favorites[type].includes(id)) {
    favorites[type].push(id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (type: keyof Favorites, id: string): void => {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  favorites[type] = favorites[type].filter((fav) => fav !== id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (type: keyof Favorites, id: string): boolean => {
  const favorites = getFavorites();
  return favorites[type].includes(id);
};

export const toggleFavorite = (type: keyof Favorites, id: string): boolean => {
  if (isFavorite(type, id)) {
    removeFavorite(type, id);
    return false;
  } else {
    addFavorite(type, id);
    return true;
  }
};

export const getFavoriteCount = (type: keyof Favorites): number => {
  return getFavorites()[type].length;
};

// View history management
export const getHistory = (): ViewHistory => {
  if (typeof window === 'undefined') {
    return { recipes: [], coffees: [], articles: [] };
  }
  
  const stored = localStorage.getItem(HISTORY_KEY);
  return stored 
    ? JSON.parse(stored) 
    : { recipes: [], coffees: [], articles: [] };
};

export const addToHistory = (type: keyof ViewHistory, id: string): void => {
  if (typeof window === 'undefined') return;
  
  const history = getHistory();
  
  // Remove if already exists (to move to front)
  history[type] = history[type].filter((item) => item.id !== id);
  
  // Add to front
  history[type].unshift({
    id,
    viewedAt: new Date().toISOString(),
  });
  
  // Keep only last 20 items
  history[type] = history[type].slice(0, 20);
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getRecentlyViewed = (
  type: keyof ViewHistory,
  limit: number = 5
): string[] => {
  const history = getHistory();
  return history[type].slice(0, limit).map((item) => item.id);
};

export const clearHistory = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_KEY);
};

// Personalized recommendations based on preferences and history
export const getPersonalizedScore = (
  item: {
    roast?: 'light' | 'medium' | 'dark';
    acidity?: 'low' | 'medium' | 'high';
    difficulty?: 'easy' | 'medium' | 'hard';
    flavorProfile?: string[];
    category?: string;
  },
  preferences: UserPreferences | null
): number => {
  if (!preferences) return 0;
  
  let score = 0;
  
  // Roast level match
  if (item.roast && preferences.roastLevel !== 'any') {
    if (item.roast === preferences.roastLevel) {
      score += 20;
    }
  }
  
  // Difficulty match based on experience
  if (item.difficulty) {
    if (preferences.experience === 'beginner' && item.difficulty === 'easy') {
      score += 15;
    } else if (preferences.experience === 'intermediate' && item.difficulty !== 'hard') {
      score += 10;
    } else if (preferences.experience === 'advanced') {
      score += 5;
    }
  }
  
  // Flavor profile match
  if (item.flavorProfile && preferences.flavorNotes.length > 0) {
    const itemFlavorsLower = item.flavorProfile.map((f) => f.toLowerCase());
    const matchCount = preferences.flavorNotes.filter((note) =>
      itemFlavorsLower.some((flavor) => {
        if (note === 'fruity') return flavor.includes('fruit') || flavor.includes('berry') || flavor.includes('citrus');
        if (note === 'chocolatey') return flavor.includes('chocolate') || flavor.includes('cocoa');
        if (note === 'nutty') return flavor.includes('nut') || flavor.includes('caramel');
        if (note === 'floral') return flavor.includes('floral') || flavor.includes('tea');
        if (note === 'earthy') return flavor.includes('earth') || flavor.includes('spic');
        if (note === 'sweet') return flavor.includes('sweet') || flavor.includes('smooth');
        return flavor.includes(note.toLowerCase());
      })
    ).length;
    score += matchCount * 10;
  }
  
  // Intensity/acidity match
  if (item.acidity) {
    if (preferences.intensity === 'mild' && item.acidity === 'low') {
      score += 10;
    } else if (preferences.intensity === 'strong' && item.acidity !== 'low') {
      score += 10;
    } else if (preferences.intensity === 'medium' && item.acidity === 'medium') {
      score += 10;
    }
  }
  
  return score;
};

// Check if user has completed setup
export const hasCompletedSetup = (): boolean => {
  const prefs = getPreferences();
  return prefs !== null && prefs.savedAt !== undefined;
};

// Get quick stats for profile
export const getUserStats = () => {
  const favorites = getFavorites();
  const history = getHistory();
  
  return {
    totalFavorites: 
      favorites.recipes.length + 
      favorites.coffees.length + 
      favorites.articles.length,
    recipeFavorites: favorites.recipes.length,
    coffeeFavorites: favorites.coffees.length,
    articleFavorites: favorites.articles.length,
    recipesViewed: history.recipes.length,
    coffeesViewed: history.coffees.length,
    articlesViewed: history.articles.length,
  };
};

