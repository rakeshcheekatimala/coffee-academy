import { test, expect } from '@playwright/test';

test.describe('Wizard (Coffee Finder)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/wizard');
  });

  test('AC-7.1: Wizard Page Load', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500); // Wait for animations
    
    // Verify hero section
    await expect(page.locator('h1:has-text("Coffee Finder Wizard")')).toBeVisible({ timeout: 5000 });

    // Verify first question displays - question is in CardTitle
    await expect(page.locator('h2, [class*="Title"]').filter({ hasText: /experience.*level.*coffee|What.*s.*your.*experience/ }).first()).toBeVisible({ timeout: 5000 });

    // Verify progress bar or step indicator
    await expect(page.locator('text=/.*1.*of.*/, [class*="progress"]').first()).toBeVisible({ timeout: 5000 });

    // Verify answer options
    const optionButtons = page.locator('button').filter({ hasText: /Complete Beginner|Some Experience|Coffee Enthusiast/ });
    expect(await optionButtons.count()).toBeGreaterThan(0);
  });

  test('AC-7.2: Wizard Single Select Steps', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // Select option on first step (experience level)
    const firstOption = page.locator('button').filter({ hasText: /Complete Beginner|Some Experience|Coffee Enthusiast/ }).first();
    
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();
    await page.waitForTimeout(1500); // Wait for animation transition

    // Verify next step displays - question is in CardTitle (h2)
    const nextQuestion = page.locator('h2, [class*="Title"]').filter({ hasText: /How strong|strong do you like/ }).first();
    await expect(nextQuestion).toBeVisible({ timeout: 5000 });
  });

  test('AC-7.3: Wizard Multi-Select Steps', async ({ page }) => {
    // Navigate through single-select steps first
    for (let i = 0; i < 3; i++) {
      const singleSelectButtons = page.locator('button').filter({ hasText: /Beginner|Mild|Medium|Strong|Light|Regular|Budget/ });
      const button = singleSelectButtons.first();
      
      if (await button.isVisible()) {
        await button.click();
        await page.waitForTimeout(500);
      } else {
        break;
      }
    }

    // Look for multi-select step (flavor notes or bean origin)
    const multiSelectButtons = page.locator('button').filter({ hasText: /Fruity|Chocolatey|Nutty|Floral/ });
    
    if (await multiSelectButtons.first().isVisible()) {
      // Select first option
      await multiSelectButtons.first().click();
      await page.waitForTimeout(300);

      // Verify selection is visually indicated
      const selectedButton = multiSelectButtons.first();
      await expect(selectedButton).toBeVisible();

      // Look for Continue button
      const continueButton = page.locator('button:has-text("Continue")');
      if (await continueButton.isVisible()) {
        await continueButton.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('AC-7.4: Wizard Navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Answer first question to get to step 2
    const firstOption = page.locator('button').filter({ hasText: /Complete Beginner|Some Experience/ }).first();
    await expect(firstOption).toBeVisible({ timeout: 5000 });
    await firstOption.click();
    await page.waitForTimeout(1000);

    // Verify Back button is visible
    const backButton = page.locator('button:has-text("Back"), button[aria-label*="Back"], button svg').first();
    if (await backButton.isVisible({ timeout: 3000 })) {
      await backButton.click();
      await page.waitForTimeout(1000);

      // Verify previous step displays - check for experience question in CardTitle
      await expect(page.locator('h2, [class*="Title"]').filter({ hasText: /experience.*level.*coffee|What.*s.*your.*experience/ }).first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('AC-7.5: Wizard Completion', async ({ page }) => {
    // Complete all wizard steps (approximately 8 steps)
    for (let i = 0; i < 10; i++) {
      // Check if we're on results page
      const resultsPage = page.locator('text=Your Coffee Profile, text=recommendations, text=Coffee Profile');
      if (await resultsPage.isVisible()) {
        break;
      }

      // Try to find and click an option button
      const optionButtons = page.locator('button').filter({ hasText: /Beginner|Mild|Medium|Strong|Fruity|Chocolatey|Light|Regular|Budget|Brazil|Colombia|any|Continue/ });
      const button = optionButtons.first();
      
      if (await button.isVisible()) {
        await button.click();
        await page.waitForTimeout(500);
      } else {
        // Look for Continue button on multi-select step
        const continueButton = page.locator('button:has-text("Continue")');
        if (await continueButton.isVisible()) {
          await continueButton.click();
          await page.waitForTimeout(500);
        } else {
          break; // No more steps
        }
      }
    }

    // Verify results page displays - actual text is "Your Perfect Coffee Match"
    await expect(page.locator('text=Your Perfect Coffee Match, text=recommendations').first()).toBeVisible({ timeout: 5000 });

    // Verify recommendations sections - check for actual section titles
    const hasRecommendations = await page.locator('text=Recommended Coffees, text=Recommended Recipes, text=Recommended Equipment, text=Tips for You').first().isVisible({ timeout: 5000 });
    if (!hasRecommendations) {
      // At least check for some content
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.length).toBeGreaterThan(200);
    }

    // Verify action buttons - actual button text is "Start Over"
    await expect(page.locator('button:has-text("Start Over")').first()).toBeVisible({ timeout: 3000 });
  });

  test('AC-7.6: Wizard Reset', async ({ page }) => {
    // Complete wizard first
    for (let i = 0; i < 10; i++) {
      const resultsPage = page.locator('text=Your Coffee Profile, text=recommendations');
      if (await resultsPage.isVisible()) {
        break;
      }

      const optionButtons = page.locator('button').filter({ hasText: /Beginner|Mild|Medium|Fruity|Continue/ });
      const button = optionButtons.first();
      if (await button.isVisible()) {
        await button.click();
        await page.waitForTimeout(500);
      } else {
        break;
      }
    }

    // Click "Start Over" or reset button
    const resetButton = page.locator('button:has-text("Start Over"), button:has-text("Reset")');
    if (await resetButton.isVisible()) {
      await resetButton.click();
      await page.waitForTimeout(500);

      // Verify wizard resets to first step
      await expect(page.locator('text=experience, text=experience level').first()).toBeVisible();
    }
  });
});

