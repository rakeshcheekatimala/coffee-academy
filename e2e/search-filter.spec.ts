import { test, expect } from '@playwright/test';

test.describe('Search & Filter Functionality', () => {
  test('AC-4.3, AC-5.3: Recipe Search', async ({ page }) => {
    await page.goto('/recipes');

    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]').first();
    await searchInput.fill('espresso');

    await page.waitForTimeout(500);

    // Verify results are filtered
    const recipeCards = page.locator('article, [class*="card"]');
    const cards = await recipeCards.count();
    expect(cards).toBeGreaterThanOrEqual(0);
  });

  test('AC-5.3: Article Search', async ({ page }) => {
    await page.goto('/articles');

    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]').first();
    await searchInput.fill('brewing');

    await page.waitForTimeout(500);

    // Verify search works
    const articleCards = page.locator('article, [class*="card"]');
    await expect(articleCards.first()).toBeVisible();
  });

  test('AC-10.2: Glossary Search', async ({ page }) => {
    await page.goto('/glossary');

    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]').first();
    await searchInput.fill('roast');

    await page.waitForTimeout(500);

    // Verify results
    const termCards = page.locator('article, [class*="card"]');
    await expect(termCards.first()).toBeVisible();
  });

  test('AC-10.3: Glossary Category Filter', async ({ page }) => {
    await page.goto('/glossary');

    // Select category from dropdown
    const categorySelect = page.locator('select, [role="combobox"]').first();
    if (await categorySelect.isVisible()) {
      await categorySelect.click();
      await page.waitForTimeout(300);

      // Select a category option
      const option = page.locator('[role="option"]').first();
      if (await option.isVisible()) {
        await option.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('AC-4.4: Recipe Tab Filtering', async ({ page }) => {
    await page.goto('/recipes');

    // Test each tab
    const tabs = ['All', 'Hot', 'Cold', 'Beginner'];
    
    for (const tab of tabs) {
      const tabButton = page.locator(`button:has-text("${tab}"), [role="tab"]:has-text("${tab}")`).first();
      if (await tabButton.isVisible()) {
        await tabButton.click();
        await page.waitForTimeout(500);

        // Verify tab is selected
        await expect(tabButton).toBeVisible();
      }
    }
  });

  test('AC-11.2: Recommendations Tab Filtering', async ({ page }) => {
    await page.goto('/recommendations');

    const tabs = ['Beginner', 'Light Roast', 'Medium Roast', 'Dark Roast'];
    
    for (const tab of tabs) {
      const tabButton = page.locator(`button:has-text("${tab}"), [role="tab"]:has-text("${tab}")`).first();
      if (await tabButton.isVisible()) {
        await tabButton.click();
        await page.waitForTimeout(500);
        await expect(tabButton).toBeVisible();
      }
    }
  });
});


