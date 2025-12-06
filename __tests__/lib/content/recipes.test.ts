import { getRecipe, getRecipesByCategory, getAllRecipes, recipes } from '@/lib/content/recipes';

describe('Recipes Content', () => {
  it('returns all recipes', () => {
    expect(recipes.length).toBeGreaterThan(0);
  });

  it('returns recipe by id', () => {
    const recipe = getRecipe('v60-pour-over');
    expect(recipe).toBeDefined();
    expect(recipe?.id).toBe('v60-pour-over');
  });

  it('returns undefined for invalid recipe id', () => {
    const recipe = getRecipe('invalid-id');
    expect(recipe).toBeUndefined();
  });

  it('filters recipes by category', () => {
    const coldRecipes = getRecipesByCategory('cold');
    expect(coldRecipes.length).toBeGreaterThan(0);
    coldRecipes.forEach((recipe) => {
      expect(recipe.category).toBe('cold');
    });
  });

  it('returns all recipes', () => {
    const allRecipes = getAllRecipes();
    expect(allRecipes.length).toBe(recipes.length);
  });

  it('all recipes have required properties', () => {
    recipes.forEach((recipe) => {
      expect(recipe.id).toBeDefined();
      expect(recipe.title).toBeDefined();
      expect(recipe.description).toBeDefined();
      expect(recipe.category).toBeDefined();
      expect(recipe.difficulty).toBeDefined();
      expect(recipe.ingredients).toBeDefined();
      expect(recipe.tools).toBeDefined();
      expect(recipe.steps).toBeDefined();
      expect(recipe.tips).toBeDefined();
    });
  });
});

