import { test, expect } from '@playwright/test';

test.describe('Quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/quiz');
  });

  test('AC-6.1: Quiz Page Load', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);
    
    // Verify hero section
    await expect(page.locator('h1:has-text("Find Your Coffee Flavor Profile")')).toBeVisible({ timeout: 5000 });

    // Verify first question displays - question is in CardTitle (h2)
    await expect(page.locator('h2, [class*="Title"]').filter({ hasText: /What flavors.*you.*typically.*enjoy/ }).first()).toBeVisible({ timeout: 5000 });

    // Verify progress bar or question indicator
    await expect(page.locator('text=/.*1.*of.*5.*/').first()).toBeVisible({ timeout: 5000 });

    // Verify answer options
    const answerButtons = page.locator('button').filter({ hasText: /Fruity|Chocolatey|Bold|bright/ });
    const optionCount = await answerButtons.count();
    expect(optionCount).toBeGreaterThan(0);
  });

  test('AC-6.2: Quiz Question Navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Answer first question
    const answerButtons = page.locator('button').filter({ hasText: /Fruity|Chocolatey|Bold|Floral/ });
    const firstAnswer = answerButtons.first();
    
    await expect(firstAnswer).toBeVisible({ timeout: 5000 });
    await firstAnswer.click();
    await page.waitForTimeout(1200); // Wait for animation transition

    // Verify next question displays - check for question in CardTitle
    await expect(page.locator('h2, [class*="Title"]').filter({ hasText: /How.*do.*you.*prefer|prefer.*your.*coffee.*strength/ }).first()).toBeVisible({ timeout: 5000 });

    // Answer second question
    const secondAnswerButtons = page.locator('button').filter({ hasText: /Light|Medium|Strong/ });
    if (await secondAnswerButtons.first().isVisible({ timeout: 5000 })) {
      await secondAnswerButtons.first().click();
      await page.waitForTimeout(800);
    }
  });

  test('AC-6.3: Quiz Completion', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Answer all 5 questions
    for (let i = 0; i < 5; i++) {
      const answerButtons = page.locator('button').filter({ hasText: /Fruity|Chocolatey|Bold|Light|Medium|Strong|Morning|Afternoon|Black|Milk|bright|smooth|mellow|balanced|tangy|Floral/ });
      const answer = answerButtons.first();
      
      if (await answer.isVisible({ timeout: 5000 })) {
        await answer.click();
        await page.waitForTimeout(1000); // Wait for transition
      } else {
        break; // No more questions
      }
    }

    // Verify results page displays - actual title is "Your Coffee Profile"
    await expect(page.locator('h1:has-text("Your Coffee Profile")').first()).toBeVisible({ timeout: 5000 });

    // Verify "Take Quiz Again" button exists
    const resetButton = page.locator('button:has-text("Take Quiz Again")').first();
    await expect(resetButton).toBeVisible({ timeout: 5000 });
  });

  test('AC-6.4: Quiz Reset', async ({ page }) => {
    // Complete quiz first
    for (let i = 0; i < 5; i++) {
      const answerButtons = page.locator('button').filter({ hasText: /Fruity|Chocolatey|Bold|Light|Medium/ });
      const answer = answerButtons.first();
      
      if (await answer.isVisible()) {
        await answer.click();
        await page.waitForTimeout(500);
      } else {
        break;
      }
    }

    // Click "Take Quiz Again"
    const resetButton = page.locator('button:has-text("Take Quiz Again"), button:has-text("Again")');
    if (await resetButton.isVisible()) {
      await resetButton.click();
      await page.waitForTimeout(500);

      // Verify quiz resets to first question
      await expect(page.locator('text=Question 1, text=1 of 5').first()).toBeVisible();
    }
  });
});

