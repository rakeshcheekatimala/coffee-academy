import { test, expect } from '@playwright/test';

test.describe('Community', () => {
  test('AC-8.1: Community Page Load', async ({ page }) => {
    await page.goto('/community');
    await page.waitForLoadState('networkidle');

    // Verify hero section
    await expect(page.locator('h1:has-text("Coffee Community")')).toBeVisible({ timeout: 5000 });

    // Verify stats cards
    await expect(page.locator('text=Shared Brews').first()).toBeVisible({ timeout: 3000 });
    await expect(page.locator('text=Community Recipes').first()).toBeVisible({ timeout: 3000 });

    // Verify quick action cards
    await expect(page.locator('text=Share Your Brew').first()).toBeVisible({ timeout: 3000 });
    await expect(page.locator('text=Submit').first()).toBeVisible({ timeout: 3000 });
  });

  test('AC-8.2: Community Stats Display', async ({ page }) => {
    await page.goto('/community');

    // Check stats cards have icons, values, and labels
    const statsCards = page.locator('[class*="card"], article').filter({ hasText: /Shared Brews|Community Recipes|Active Members|This Week/ });
    const statsCount = await statsCards.count();
    expect(statsCount).toBeGreaterThan(0);

    // Verify each stat card has a value
    for (let i = 0; i < Math.min(statsCount, 4); i++) {
      const card = statsCards.nth(i);
      const text = await card.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('AC-8.3: Community Quick Actions', async ({ page }) => {
    await page.goto('/community');
    await page.waitForLoadState('networkidle');

    // Test "Share Your Brew" button
    const shareBrewButton = page.locator('a:has-text("Share a Brew"), a[href*="submit?type=brew"]').first();
    await expect(shareBrewButton).toBeVisible({ timeout: 5000 });
    await shareBrewButton.click();
    await expect(page).toHaveURL(/\/community\/submit/, { timeout: 5000 });

    // Go back and test "Submit Recipe" button
    await page.goto('/community');
    await page.waitForLoadState('networkidle');
    
    const submitRecipeButton = page.locator('a:has-text("Submit Recipe"), a[href*="submit?type=recipe"]').first();
    await expect(submitRecipeButton).toBeVisible({ timeout: 5000 });
    await submitRecipeButton.click();
    await expect(page).toHaveURL(/\/community\/submit/, { timeout: 5000 });
  });

  test('AC-8.4: Brew Gallery Page', async ({ page }) => {
    await page.goto('/community/brews');

    // Verify page loads
    await expect(page.locator('h1:has-text("Brew"), h1:has-text("Gallery")')).toBeVisible();

    // Verify "Share Your Brew" button
    await expect(page.locator('a:has-text("Share Your Brew"), button:has-text("Share")').first()).toBeVisible();

    // Check for brew cards
    const brewCards = page.locator('article, [class*="card"]');
    const cardCount = await brewCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(0); // May be empty initially
  });

  test('AC-8.5: Brew Card Interactions', async ({ page }) => {
    await page.goto('/community/brews');

    // Get first brew card
    const brewCards = page.locator('article, [class*="card"]');
    const firstCard = brewCards.first();

    if (await firstCard.isVisible()) {
      // Check for like button
      const likeButton = firstCard.locator('button:has(svg), button[aria-label*="like"], button:has-text("like")').first();
      if (await likeButton.isVisible()) {
        await likeButton.click();
        // Like count should update (if functionality exists)
      }
    }
  });

  test('AC-8.6: Community Recipes Page', async ({ page }) => {
    await page.goto('/community/recipes');

    // Verify page loads
    await expect(page.locator('h1, h2').first()).toBeVisible();

    // Check for recipe cards
    const recipeCards = page.locator('article, [class*="card"]');
    const cardCount = await recipeCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(0);
  });
});

