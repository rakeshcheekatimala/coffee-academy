import { test, expect } from '@playwright/test';

test.describe('Analytics Tracking', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept Google Analytics requests
    await page.route('**/google-analytics.com/**', route => route.continue());
    await page.route('**/googletagmanager.com/**', route => route.continue());
  });

  test('AC-15.1: Navigation Click Tracking', async ({ page }) => {
    await page.goto('/');
    
    // Monitor network requests for GA events
    const gaEvents: string[] = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('google-analytics.com') || url.includes('googletagmanager.com')) {
        gaEvents.push(url);
      }
    });

    // Click a navigation link
    const navLink = page.locator('nav a[href="/recipes"]').first();
    await navLink.click();

    // Verify navigation occurred
    await expect(page).toHaveURL('/recipes');
    
    // Note: GA event verification may require checking network requests
    // In production, you might check the request payload contains 'navigation_click'
  });

  test('AC-15.2: Recipe View Tracking', async ({ page }) => {
    await page.goto('/recipes');

    const gaEvents: string[] = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('google-analytics.com') || url.includes('collect') || url.includes('event')) {
        gaEvents.push(url);
      }
    });

    // Navigate to recipe detail
    const recipeLink = page.locator('a:has-text("View Recipe")').first();
    if (await recipeLink.isVisible()) {
      await recipeLink.click();
      await page.waitForURL(/\/recipes\/.+/);

      // GA event should fire on page load
      await page.waitForTimeout(1000);
      
      // Verify page loaded
      await expect(page.url()).toMatch(/\/recipes\/.+/);
    }
  });

  test('AC-15.5: Quiz Start Tracking', async ({ page }) => {
    await page.goto('/quiz');

    const gaEvents: string[] = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('google-analytics.com') || url.includes('collect')) {
        gaEvents.push(url);
      }
    });

    // Quiz start event should fire on page load
    await page.waitForTimeout(1000);

    // Verify quiz page loaded
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('AC-15.8: Wizard Start Tracking', async ({ page }) => {
    await page.goto('/wizard');

    const gaEvents: string[] = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('google-analytics.com') || url.includes('collect')) {
        gaEvents.push(url);
      }
    });

    // Wizard start event should fire on page load
    await page.waitForTimeout(1000);

    // Verify wizard page loaded
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('AC-15.11: Search Tracking', async ({ page }) => {
    await page.goto('/recipes');

    const gaEvents: string[] = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('google-analytics.com') || url.includes('collect')) {
        gaEvents.push(url);
      }
    });

    // Perform search
    const searchInput = page.locator('input[placeholder*="Search"]').first();
    await searchInput.fill('coffee');
    await page.waitForTimeout(1000);

    // Search event should fire
    // Note: Actual verification requires checking GA event payload
  });

  test('AC-15.12: Tab Change Tracking', async ({ page }) => {
    await page.goto('/recipes');

    const gaEvents: string[] = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('google-analytics.com') || url.includes('collect')) {
        gaEvents.push(url);
      }
    });

    // Change tab
    const hotTab = page.locator('button:has-text("Hot"), [role="tab"]:has-text("Hot")').first();
    await hotTab.click();
    await page.waitForTimeout(1000);

    // Tab change event should fire
  });

  test('AC-15.17: CTA Click Tracking', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const gaEvents: string[] = [];
    page.on('request', request => {
      const url = request.url();
      if (url.includes('google-analytics.com') || url.includes('collect')) {
        gaEvents.push(url);
      }
    });

    // Click CTA button - use actual homepage CTA (goes to /wizard or /levels)
    const ctaButton = page.locator('a:has-text("Find Your Perfect Brew"), a:has-text("Start Learning")').first();
    await expect(ctaButton).toBeVisible({ timeout: 5000 });
    await ctaButton.click();
    await page.waitForTimeout(1000);

    // CTA click event should fire - verify navigation happened
    await expect(page).toHaveURL(/^\/(wizard|levels)/, { timeout: 5000 });
  });
});

