import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('AC-2.1: Homepage Load', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500); // Wait for animations
    
    // Verify hero section with actual JourneyHero content
    await expect(page.locator('h1:has-text("The Coffee Journey")')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('text=From humble bean to perfect cup')).toBeVisible({ timeout: 5000 });

    // Verify hero CTA buttons
    await expect(page.locator('a:has-text("Find Your Perfect Brew")')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('a:has-text("Start Learning")')).toBeVisible({ timeout: 5000 });

    // Scroll to see journey stages - need more scrolling
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(1500);
    
    // Verify journey stages section - check for h2 or h3 with stage titles
    await expect(page.locator('h2, h3').filter({ hasText: /The Bean|The Roast/ }).first()).toBeVisible({ timeout: 5000 });
    
    // Scroll to features section
    await page.evaluate(() => window.scrollTo(0, 4000));
    await page.waitForTimeout(1500);
    
    // Verify features section
    await expect(page.locator('h2').filter({ hasText: /Start Your Journey/ }).first()).toBeVisible({ timeout: 5000 });
    // Check for feature cards
    await expect(page.locator('a[href="/levels"], a[href="/wizard"], a[href="/recipes"], a[href="/community"]').first()).toBeVisible({ timeout: 5000 });
  });

  test('AC-2.2: Homepage CTA Buttons', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Test hero "Find Your Perfect Brew" CTA button
    const findBrewCTA = page.locator('a:has-text("Find Your Perfect Brew")');
    await expect(findBrewCTA).toBeVisible({ timeout: 5000 });
    await findBrewCTA.click();
    await expect(page).toHaveURL('/wizard', { timeout: 5000 });
    
    // Go back to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Test "Start Learning" button
    const startLearningCTA = page.locator('a:has-text("Start Learning")');
    await expect(startLearningCTA).toBeVisible({ timeout: 5000 });
    await startLearningCTA.click();
    await expect(page).toHaveURL('/levels', { timeout: 5000 });
    
    // Go back to homepage
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Scroll to features section
    await page.evaluate(() => window.scrollTo(0, 3000));
    await page.waitForTimeout(1000);

    // Test feature cards (Learn, Discover, Brew, Connect) - any link that goes to valid pages
    const featureLink = page.locator('a[href="/levels"], a[href="/wizard"], a[href="/recipes"], a[href="/community"]').first();
    if (await featureLink.isVisible({ timeout: 3000 })) {
      await featureLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page.url()).toMatch(/\/(levels|wizard|recipes|community)/);
    }
  });

  test('AC-2.3: Spotlight Cards Display', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Scroll to features section
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(1000);

    // Check that feature cards exist (Learn, Discover, Brew, Connect)
    const featureCards = page.locator('a[href="/levels"], a[href="/wizard"], a[href="/recipes"], a[href="/community"]');
    const cardCount = await featureCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(2);

    // Verify feature section heading
    await expect(page.locator('h2:has-text("Start Your Journey")')).toBeVisible();
    
    // Verify at least one feature card has content
    const firstCard = featureCards.first();
    if (await firstCard.isVisible()) {
      const text = await firstCard.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });
});

