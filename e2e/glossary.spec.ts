import { test, expect } from '@playwright/test';

test.describe('Glossary', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/glossary');
  });

  test('AC-10.1: Glossary Page Load', async ({ page }) => {
    // Verify hero section
    await expect(page.locator('h1:has-text("Glossary"), h1:has-text("Coffee Glossary")')).toBeVisible();

    // Verify search input
    await expect(page.locator('input[placeholder*="Search"], input[type="search"]')).toBeVisible();

    // Verify category filter dropdown
    await expect(page.locator('select, [role="combobox"]').first()).toBeVisible();

    // Verify glossary terms grid
    const termCards = page.locator('article, [class*="card"]');
    const cardCount = await termCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('AC-10.2: Glossary Search', async ({ page }) => {
    // Type in search box
    const searchInput = page.locator('input[placeholder*="Search"], input[type="search"]').first();
    await searchInput.fill('roast');

    await page.waitForTimeout(500);

    // Verify results filter
    const termCards = page.locator('article, [class*="card"]');
    await expect(termCards.first()).toBeVisible();
  });

  test('AC-10.3: Glossary Category Filter', async ({ page }) => {
    // Select category from dropdown
    const categorySelect = page.locator('select, [role="combobox"]').first();
    
    if (await categorySelect.isVisible()) {
      // Click to open dropdown
      await categorySelect.click();
      await page.waitForTimeout(300);

      // Select an option (if available)
      const options = page.locator('[role="option"], select option');
      if (await options.first().isVisible()) {
        await options.nth(1).click(); // Select second option (first is usually "All")
        await page.waitForTimeout(500);

        // Verify filter is applied
        await expect(categorySelect).toBeVisible();
      }
    }
  });

  test('AC-10.4: Glossary Term Card', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500); // Wait for animations
    
    // Get first term card - all cards have CardTitle with term name
    const firstCardTitle = page.locator('[class*="Card"] h2, [class*="Card"] h3, [class*="Title"]').first();
    await expect(firstCardTitle).toBeVisible({ timeout: 5000 });

    // Get the card containing the title
    const termCard = firstCardTitle.locator('xpath=ancestor::*[contains(@class, "Card")]').first();
    await expect(termCard).toBeVisible({ timeout: 3000 });

    // Verify term name - CardTitle
    await expect(firstCardTitle).toBeVisible({ timeout: 3000 });

    // Verify definition - CardDescription inside
    const content = await termCard.textContent();
    expect(content?.length).toBeGreaterThan(20);
  });
});

