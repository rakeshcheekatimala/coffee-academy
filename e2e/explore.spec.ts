import { test, expect } from '@playwright/test';

test.describe('Explore Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/explore');
  });

  test('AC-12.1: Explore Page Load', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Verify hero section
    await expect(page.locator('h1:has-text("Where to Explore Coffee")')).toBeVisible({ timeout: 5000 });

    // Scroll to content sections
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);

    // Verify sections
    await expect(page.locator('text=How to Find Good Cafés').first()).toBeVisible({ timeout: 3000 });
    await expect(page.locator('text=Common Menu Items Explained').first()).toBeVisible({ timeout: 3000 });
    await expect(page.locator('text=Understanding Coffee Terms').first()).toBeVisible({ timeout: 3000 });
  });

  test('AC-12.2: Explore Section Content', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Scroll through page to load all sections
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // Verify each section displays properly - use more flexible selectors
    await expect(page.locator('h2, h3').filter({ hasText: /How to Find Good Cafés/ }).first()).toBeVisible({ timeout: 5000 });
    
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(800);
    await expect(page.locator('h2, h3').filter({ hasText: /Common Menu Items/ }).first()).toBeVisible({ timeout: 5000 });
    
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(800);
    await expect(page.locator('h2, h3').filter({ hasText: /Understanding Coffee Terms/ }).first()).toBeVisible({ timeout: 5000 });
    
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(800);
    await expect(page.locator('h2, h3').filter({ hasText: /Tips for Ordering/ }).first()).toBeVisible({ timeout: 5000 });

    // Verify content cards exist
    const contentCards = page.locator('[class*="Card"]');
    const cardCount = await contentCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});

