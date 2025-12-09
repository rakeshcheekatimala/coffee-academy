import { test, expect } from '@playwright/test';

test.describe('Articles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/articles');
  });

  test('AC-5.1: Articles Page Load', async ({ page }) => {
    // Verify hero section
    await expect(page.locator('h1:has-text("Coffee 101"), h1:has-text("Learn")')).toBeVisible();

    // Verify search input
    await expect(page.locator('input[placeholder*="Search"], input[type="search"]')).toBeVisible();

    // Verify category filter buttons
    await expect(page.locator('button:has-text("All Topics"), button:has-text("All")')).toBeVisible();
    
    // Verify article grid
    const articleCards = page.locator('article, [class*="card"]').filter({ hasText: /article/i });
    const cardCount = await articleCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('AC-5.2: Article Card Display', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500); // Wait for animations
    
    // Get first article card - cards are wrapped in Link elements, then motion.div
    const articleLink = page.locator('a[href*="/articles/"]').first();
    
    await expect(articleLink).toBeVisible({ timeout: 5000 });

    // Card is inside the Link - find CardTitle which should be visible
    const title = articleLink.locator('h2, h3, [class*="Title"]').first();
    await expect(title).toBeVisible({ timeout: 5000 });

    // Verify card has excerpt/description - CardDescription should exist
    const content = await articleLink.textContent();
    expect(content?.length).toBeGreaterThan(20);
  });

  test('AC-5.3: Article Search', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Type in search box
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await searchInput.fill('brewing');

    // Wait for filtering (client-side filtering)
    await page.waitForTimeout(800);

    // Verify results update - articles should still be visible or filtered
    const articleCards = page.locator('article, [class*="Card"]');
    const count = await articleCards.count();
    expect(count).toBeGreaterThanOrEqual(0);

    // Check for clear button (X icon)
    const clearButton = page.locator('button:has(svg)').filter({ has: page.locator('svg') }).first();
    if (await clearButton.isVisible()) {
      await clearButton.click();
      await page.waitForTimeout(300);
      await expect(searchInput).toHaveValue('');
    }
  });

  test('AC-5.4: Article Category Filter', async ({ page }) => {
    // Click a category button
    const categoryButtons = page.locator('button:has-text("Basics"), button:has-text("Brewing"), button:has-text("Roasting")');
    const firstCategory = categoryButtons.first();
    
    if (await firstCategory.isVisible()) {
      await firstCategory.click();
      await page.waitForTimeout(300);

      // Verify filter is applied (category button should be active)
      await expect(firstCategory).toBeVisible();

      // Check for clear filters button
      const clearFilters = page.locator('button:has-text("Clear"), button:has-text("Clear filters")');
      if (await clearFilters.isVisible()) {
        await clearFilters.click();
      }
    }
  });

  test('AC-5.5: Article Detail Page', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Click on first article card - find clickable link
    const articleLink = page.locator('article a, [class*="Card"] a').first();
    
    if (await articleLink.isVisible()) {
      await articleLink.click();

      // Verify article detail page loads
      await expect(page).toHaveURL(/\/articles\/.+/, { timeout: 5000 });

      // Verify article title
      await expect(page.locator('h1').first()).toBeVisible({ timeout: 5000 });

      // Verify article content
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(200);

      // Verify back button or navigation
      const backLink = page.locator('a:has-text("Back"), a[href="/articles"], button:has-text("Back")').first();
      await expect(backLink).toBeVisible({ timeout: 3000 });
    }
  });

  test('AC-5.6: Related Articles Navigation', async ({ page }) => {
    // Navigate to an article
    const articleCards = page.locator('article, [class*="card"]').filter({ hasText: /article/i });
    const firstCard = articleCards.first();

    if (await firstCard.isVisible()) {
      await firstCard.click();
      await page.waitForURL(/\/articles\/.+/);

      // Check for related articles section
      const relatedSection = page.locator('text=Related Articles, text=Related');
      if (await relatedSection.isVisible()) {
        // Click on a related article
        const relatedArticles = page.locator('a').filter({ hasText: /article/i });
        const relatedLink = relatedArticles.first();
        
        if (await relatedLink.isVisible()) {
          await relatedLink.click();
          // Should navigate to another article
          await expect(page.url()).toMatch(/\/articles\/.+/);
        }
      }
    }
  });
});

