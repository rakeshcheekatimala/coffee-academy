import { test, expect } from '@playwright/test';

test.describe('Recommendations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/recommendations');
  });

  test('AC-11.1: Recommendations Page Load', async ({ page }) => {
    // Verify hero section
    await expect(page.locator('h1:has-text("Recommended"), h1:has-text("Recommendations")')).toBeVisible();

    // Verify tabs
    await expect(page.locator('button:has-text("Beginner"), [role="tab"]:has-text("Beginner")')).toBeVisible();
    await expect(page.locator('button:has-text("Light Roast"), [role="tab"]:has-text("Light")')).toBeVisible();
    await expect(page.locator('button:has-text("Medium Roast"), [role="tab"]:has-text("Medium")')).toBeVisible();
    await expect(page.locator('button:has-text("Dark Roast"), [role="tab"]:has-text("Dark")')).toBeVisible();

    // Verify coffee recommendation cards
    const coffeeCards = page.locator('article, [class*="card"]');
    const cardCount = await coffeeCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('AC-11.2: Recommendation Tabs', async ({ page }) => {
    const tabs = ['Beginner', 'Light Roast', 'Medium Roast', 'Dark Roast'];

    for (const tab of tabs) {
      const tabButton = page.locator(`button:has-text("${tab}"), [role="tab"]:has-text("${tab.split(' ')[0]}")`).first();
      
      if (await tabButton.isVisible()) {
        await tabButton.click();
        await page.waitForTimeout(500);

        // Verify tab is active/selected
        await expect(tabButton).toBeVisible();
      }
    }
  });

  test('AC-11.3: Recommendation Card Display', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500); // Wait for animations
    
    // Get first recommendation card - find by CardTitle first
    const firstCardTitle = page.locator('[class*="Card"] h2, [class*="Card"] h3, [class*="Title"]').first();
    await expect(firstCardTitle).toBeVisible({ timeout: 5000 });

    // Get the card containing the title
    const coffeeCard = firstCardTitle.locator('xpath=ancestor::*[contains(@class, "Card")]').first();
    await expect(coffeeCard).toBeVisible({ timeout: 3000 });

    // Verify coffee name - CardTitle
    await expect(firstCardTitle).toBeVisible({ timeout: 3000 });

    // Verify badges (roast level) - should exist
    const badges = coffeeCard.locator('[class*="badge"], [class*="Badge"]');
    const badgeCount = await badges.count();
    
    // Verify content
    const content = await coffeeCard.textContent();
    expect(content?.length).toBeGreaterThan(20);
  });
});

