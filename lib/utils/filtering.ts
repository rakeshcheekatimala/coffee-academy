import { Recipe, CoffeeRecommendation, Equipment } from '@/lib/types';

// Filter types
export interface RecipeFilters {
  category?: ('hot' | 'cold')[];
  difficulty?: ('easy' | 'medium' | 'hard')[];
  grindSize?: string[];
  maxTime?: number; // in minutes
  search?: string;
}

export interface CoffeeFilters {
  roast?: ('light' | 'medium' | 'medium-dark' | 'dark')[];
  acidity?: ('low' | 'medium' | 'high')[];
  body?: ('light' | 'medium' | 'full')[];
  origin?: string[];
  flavorNotes?: string[];
  search?: string;
}

export interface EquipmentFilters {
  category?: Equipment['category'][];
  priceRange?: Equipment['priceRange'][];
  difficulty?: Equipment['difficulty'][];
  search?: string;
}

// Recipe filtering
export function filterRecipes(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  return recipes.filter((recipe) => {
    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(recipe.category as 'hot' | 'cold')) {
        return false;
      }
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(recipe.difficulty)) {
        return false;
      }
    }

    // Grind size filter
    if (filters.grindSize && filters.grindSize.length > 0) {
      if (!filters.grindSize.includes(recipe.grindSize)) {
        return false;
      }
    }

    // Max time filter
    if (filters.maxTime) {
      const timeMatch = recipe.time.match(/\d+/);
      if (timeMatch) {
        const timeMinutes = parseInt(timeMatch[0]);
        if (recipe.time.toLowerCase().includes('hour')) {
          if (timeMinutes * 60 > filters.maxTime) return false;
        } else if (timeMinutes > filters.maxTime) {
          return false;
        }
      }
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower) ||
        recipe.tips.some((tip) => tip.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    return true;
  });
}

// Coffee filtering
export function filterCoffees(
  coffees: CoffeeRecommendation[],
  filters: CoffeeFilters
): CoffeeRecommendation[] {
  return coffees.filter((coffee) => {
    // Roast filter
    if (filters.roast && filters.roast.length > 0) {
      if (!filters.roast.includes(coffee.roast)) {
        return false;
      }
    }

    // Acidity filter
    if (filters.acidity && filters.acidity.length > 0) {
      if (!filters.acidity.includes(coffee.acidity)) {
        return false;
      }
    }

    // Body filter
    if (filters.body && filters.body.length > 0) {
      if (!filters.body.includes(coffee.body)) {
        return false;
      }
    }

    // Origin filter
    if (filters.origin && filters.origin.length > 0) {
      const coffeeOriginLower = coffee.origin.toLowerCase();
      const matchesOrigin = filters.origin.some((origin) =>
        coffeeOriginLower.includes(origin.toLowerCase())
      );
      if (!matchesOrigin) return false;
    }

    // Flavor notes filter
    if (filters.flavorNotes && filters.flavorNotes.length > 0) {
      const coffeeFlavorLower = coffee.flavorProfile.map((f) => f.toLowerCase());
      const matchesFlavor = filters.flavorNotes.some((note) =>
        coffeeFlavorLower.some((flavor) => flavor.includes(note.toLowerCase()))
      );
      if (!matchesFlavor) return false;
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        coffee.name.toLowerCase().includes(searchLower) ||
        coffee.origin.toLowerCase().includes(searchLower) ||
        coffee.description.toLowerCase().includes(searchLower) ||
        coffee.flavorProfile.some((f) => f.toLowerCase().includes(searchLower));
      if (!matchesSearch) return false;
    }

    return true;
  });
}

// Equipment filtering
export function filterEquipment(
  equipment: Equipment[],
  filters: EquipmentFilters
): Equipment[] {
  return equipment.filter((item) => {
    // Category filter
    if (filters.category && filters.category.length > 0) {
      if (!filters.category.includes(item.category)) {
        return false;
      }
    }

    // Price range filter
    if (filters.priceRange && filters.priceRange.length > 0) {
      if (!filters.priceRange.includes(item.priceRange)) {
        return false;
      }
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      if (!filters.difficulty.includes(item.difficulty)) {
        return false;
      }
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    return true;
  });
}

// Sorting utilities
export type SortOption = 'name' | 'rating' | 'time' | 'difficulty' | 'recent';

export function sortRecipes(recipes: Recipe[], sortBy: SortOption): Recipe[] {
  const sorted = [...recipes];

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'difficulty':
      const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
      return sorted.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    case 'time':
      return sorted.sort((a, b) => {
        const getMinutes = (time: string) => {
          const match = time.match(/\d+/);
          if (!match) return 0;
          const num = parseInt(match[0]);
          return time.toLowerCase().includes('hour') ? num * 60 : num;
        };
        return getMinutes(a.time) - getMinutes(b.time);
      });
    default:
      return sorted;
  }
}

export function sortCoffees(
  coffees: CoffeeRecommendation[],
  sortBy: 'name' | 'roast' | 'acidity' | 'body'
): CoffeeRecommendation[] {
  const sorted = [...coffees];

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'roast':
      const roastOrder: Record<string, number> = { light: 1, medium: 2, 'medium-dark': 3, dark: 4 };
      return sorted.sort((a, b) => (roastOrder[a.roast] || 0) - (roastOrder[b.roast] || 0));
    case 'acidity':
      const acidityOrder = { low: 1, medium: 2, high: 3 };
      return sorted.sort((a, b) => acidityOrder[a.acidity] - acidityOrder[b.acidity]);
    case 'body':
      const bodyOrder = { light: 1, medium: 2, full: 3 };
      return sorted.sort((a, b) => bodyOrder[a.body] - bodyOrder[b.body]);
    default:
      return sorted;
  }
}

// Extract unique values for filter options
export function getUniqueOrigins(coffees: CoffeeRecommendation[]): string[] {
  const origins = new Set<string>();
  coffees.forEach((coffee) => {
    // Extract main origin (e.g., "Sumatra, Indonesia" -> "Indonesia")
    const parts = coffee.origin.split(',');
    parts.forEach((part) => origins.add(part.trim()));
  });
  return Array.from(origins).sort();
}

export function getUniqueFlavorNotes(coffees: CoffeeRecommendation[]): string[] {
  const flavors = new Set<string>();
  coffees.forEach((coffee) => {
    coffee.flavorProfile.forEach((flavor) => flavors.add(flavor));
  });
  return Array.from(flavors).sort();
}

export function getUniqueGrindSizes(recipes: Recipe[]): string[] {
  const sizes = new Set<string>();
  recipes.forEach((recipe) => sizes.add(recipe.grindSize));
  return Array.from(sizes);
}

