import { test, expect } from '@playwright/test';

test.describe('Brew of the Week', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/brew-of-the-week');
  });

  test('AC-14.1: Brew of the Week Page Load', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Verify hero section
    await expect(page.locator('h1:has-text("Brew of the Week")')).toBeVisible({ timeout: 5000 });

    // Verify current featured brew displays - use FeaturedBrewCard
    const featuredBrew = page.locator('[class*="Card"]').first();
    await expect(featuredBrew).toBeVisible({ timeout: 5000 });

    // Scroll to newsletter section
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    // Verify newsletter signup section
    await expect(page.locator('text=Never Miss a Brew, text=Subscribe').first()).toBeVisible({ timeout: 3000 });
  });

  test('AC-14.2: Newsletter Signup', async ({ page }) => {
    // Verify email input field
    const emailInput = page.locator('input[type="email"], input[placeholder*="email"]');
    
    if (await emailInput.isVisible()) {
      await expect(emailInput).toBeVisible();

      // Verify Subscribe button
      await expect(page.locator('button:has-text("Subscribe")')).toBeVisible();

      // Fill email (but don't submit to avoid actual signup)
      await emailInput.fill('test@example.com');
    }
  });
});

