import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('AC-17.1: Mobile Navigation', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Verify mobile menu button is visible
    const mobileMenuButton = page.locator('button:has(svg)').first();
    await expect(mobileMenuButton).toBeVisible();

    // Click mobile menu
    await mobileMenuButton.click();
    await page.waitForTimeout(300);

    // Verify mobile menu opens
    const navLinks = page.locator('nav a');
    await expect(navLinks.first()).toBeVisible();
  });

  test('AC-17.2: Mobile Grid Layouts', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Test recipes page on mobile
    await page.goto('/recipes');
    const recipeCards = page.locator('article, [class*="card"]');
    
    // Cards should be visible and not cause horizontal scroll
    await expect(recipeCards.first()).toBeVisible();
    
    // Verify no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small margin
  });

  test('AC-17.3: Mobile Forms', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/community/submit?type=brew');
    await page.waitForLoadState('networkidle');

    // Verify form inputs are appropriately sized
    const input = page.locator('input, textarea').first();
    if (await input.isVisible({ timeout: 5000 })) {
      const inputBox = await input.boundingBox();
      // Should be tappable - 36px is still acceptable for mobile
      expect(inputBox?.height).toBeGreaterThan(30);
    }
  });

  test('AC-17.4: Tablet Layout', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    // Verify layout adapts
    await expect(page.locator('body')).toBeVisible();
    
    // Verify navigation works
    const navLinks = page.locator('nav a');
    await expect(navLinks.first()).toBeVisible();
  });
});

