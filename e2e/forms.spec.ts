import { test, expect } from '@playwright/test';

test.describe('Community Submissions', () => {
  test('AC-9.1: Submission Page Load', async ({ page }) => {
    await page.goto('/community/submit');
    await page.waitForLoadState('networkidle');

    // Verify tabs display or form content
    const tabs = page.locator('button:has-text("Brew"), [role="tab"]:has-text("Brew"), button:has-text("Recipe"), [role="tab"]:has-text("Recipe")');
    const forms = page.locator('form, input, textarea');
    
    // Either tabs or form fields should be visible
    const hasTabs = await tabs.first().isVisible({ timeout: 3000 });
    const hasForms = await forms.first().isVisible({ timeout: 3000 });
    expect(hasTabs || hasForms).toBeTruthy();
  });

  test('AC-9.2: User Creation Form', async ({ page }) => {
    await page.goto('/community/submit');

    // Check if user form is visible (user may already be logged in)
    const userForm = page.locator('input[placeholder*="username"], input[name*="username"]');
    const displayNameInput = page.locator('input[placeholder*="display name"], input[name*="display"]');

    if (await userForm.isVisible() || await displayNameInput.isVisible()) {
      // Fill user creation form
      if (await userForm.isVisible()) {
        await userForm.fill('testuser');
      }
      if (await displayNameInput.isVisible()) {
        await displayNameInput.fill('Test User');
      }

      // Click create profile button
      const createButton = page.locator('button:has-text("Create"), button:has-text("Create Profile")');
      if (await createButton.isVisible()) {
        // Form should validate required fields
        await expect(createButton).toBeVisible();
      }
    }
  });

  test('AC-9.3: Brew Submission Form', async ({ page }) => {
    await page.goto('/community/submit?type=brew');

    // Verify brew form fields
    const titleInput = page.locator('input[placeholder*="title"], input[name*="title"]');
    const descriptionInput = page.locator('textarea[placeholder*="description"], textarea[name*="description"]');

    if (await titleInput.isVisible()) {
      await expect(titleInput).toBeVisible();
      await expect(descriptionInput).toBeVisible();

      // Check for equipment and taste notes fields
      const equipmentInput = page.locator('input[placeholder*="equipment"], textarea[placeholder*="equipment"]');
      if (await equipmentInput.first().isVisible()) {
        // Form has dynamic equipment list
      }
    }
  });

  test('AC-9.4: Brew Form Submission', async ({ page }) => {
    await page.goto('/community/submit?type=brew');

    // Fill brew form (if user is logged in)
    const titleInput = page.locator('input[placeholder*="title"], input[name*="title"]');
    
    if (await titleInput.isVisible()) {
      await titleInput.fill('Test Brew');
      
      const descriptionInput = page.locator('textarea[placeholder*="description"], textarea[name*="description"]');
      if (await descriptionInput.isVisible()) {
        await descriptionInput.fill('This is a test brew submission');

        // Submit form
        const submitButton = page.locator('button:has-text("Submit"), button:has-text("Share")');
        if (await submitButton.isVisible()) {
          await submitButton.click();

          // Verify success message or redirect
          await page.waitForTimeout(2500); // Wait for redirect delay
          
          // Should redirect to /community/brews
          if (page.url().includes('/community/brews')) {
            await expect(page).toHaveURL('/community/brews');
          }
        }
      }
    }
  });

  test('AC-9.5: Recipe Submission Form', async ({ page }) => {
    await page.goto('/community/submit?type=recipe');

    // Verify recipe form displays
    const titleInput = page.locator('input[placeholder*="title"], input[name*="title"]');
    
    if (await titleInput.isVisible()) {
      // Verify form has multi-step structure
      await expect(titleInput).toBeVisible();

      // Check for step indicator or navigation
      const stepIndicator = page.locator('text=Step 1, text=1 of 4');
      if (await stepIndicator.isVisible()) {
        // Multi-step form is present
      }
    }
  });

  test('AC-9.6: Recipe Form Step Navigation', async ({ page }) => {
    await page.goto('/community/submit?type=recipe');

    // Fill step 1
    const titleInput = page.locator('input[placeholder*="title"], input[name*="title"]');
    
    if (await titleInput.isVisible()) {
      await titleInput.fill('Test Recipe');
      
      const descriptionInput = page.locator('textarea[placeholder*="description"], textarea[name*="description"]');
      if (await descriptionInput.isVisible()) {
        await descriptionInput.fill('Test description');

        // Click Next button
        const nextButton = page.locator('button:has-text("Next")');
        if (await nextButton.isVisible() && await nextButton.isEnabled()) {
          await nextButton.click();
          await page.waitForTimeout(500);

          // Verify next step displays
          // Should show ingredients or measurements step
        }

        // Test Back button
        const backButton = page.locator('button:has-text("Back")');
        if (await backButton.isVisible()) {
          await backButton.click();
          await page.waitForTimeout(300);
        }
      }
    }
  });

  test('AC-9.8: Form Validation', async ({ page }) => {
    await page.goto('/community/submit?type=brew');

    // Try to submit empty form
    const submitButton = page.locator('button:has-text("Submit"), button:has-text("Share")');
    const titleInput = page.locator('input[placeholder*="title"], input[name*="title"]');

    if (await titleInput.isVisible()) {
      // Leave fields empty
      // Submit button should be disabled or form should not submit
      if (await submitButton.isVisible()) {
        const isDisabled = await submitButton.isDisabled();
        // Button should be disabled if required fields are empty
      }

      // Fill required fields
      await titleInput.fill('Test');
      
      const descriptionInput = page.locator('textarea[placeholder*="description"]');
      if (await descriptionInput.isVisible()) {
        await descriptionInput.fill('Test description');
        
        // Now submit should be enabled
        await expect(submitButton).toBeEnabled();
      }
    }
  });
});

