import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile');
  });

  test('AC-13.1: Profile Page Load (Logged In)', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Verify user info section
    await expect(page.locator('h1:has-text("Your Profile")')).toBeVisible({ timeout: 5000 });

    // Verify stats cards
    await expect(page.locator('text=Favorites').first()).toBeVisible({ timeout: 3000 });
    await expect(page.locator('text=Recipes Viewed').first()).toBeVisible({ timeout: 3000 });
    await expect(page.locator('text=Articles Read').first()).toBeVisible({ timeout: 3000 });

    // Verify tabs
    await expect(page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first()).toBeVisible({ timeout: 3000 });
    await expect(page.locator('button:has-text("Favorites"), [role="tab"]:has-text("Favorites")').first()).toBeVisible({ timeout: 3000 });
    await expect(page.locator('button:has-text("History"), [role="tab"]:has-text("History")').first()).toBeVisible({ timeout: 3000 });
  });

  test('AC-13.2: Profile Page Load (Guest)', async ({ page }) => {
    // For guest user, profile should still load
    await expect(page.locator('body')).toBeVisible();

    // Check for "Create Profile" button or guest indicator
    const createButton = page.locator('button:has-text("Create Profile"), a:has-text("Create")');
    const guestText = page.locator('text=Guest, text=Create a profile');

    // One of these should be visible
    const hasCreateButton = await createButton.isVisible();
    const hasGuestText = await guestText.isVisible();
    
    expect(hasCreateButton || hasGuestText).toBeTruthy();
  });

  test('AC-13.3: Profile Preferences Tab', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Click Preferences tab - it's a TabsTrigger
    const prefsTab = page.locator('button:has-text("Preferences"), [role="tab"]:has-text("Preferences")').first();
    await expect(prefsTab).toBeVisible({ timeout: 5000 });
    await prefsTab.click();
    await page.waitForTimeout(1000); // Wait for tab content to load

    // Check for preferences display or empty state - wait for TabsContent to show
    const prefsContent = page.locator('text=Experience, text=Intensity, text=Roast Level, text=No preferences, text=Your Coffee Profile, text=Take the Coffee Quiz').first();
    await expect(prefsContent).toBeVisible({ timeout: 5000 });
  });

  test('AC-13.4: Profile Favorites Tab', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Click Favorites tab
    const favoritesTab = page.locator('button:has-text("Favorites"), [role="tab"]:has-text("Favorites")').first();
    await expect(favoritesTab).toBeVisible({ timeout: 5000 });
    await favoritesTab.click();
    await page.waitForTimeout(1000); // Wait for tab content to load

    // Check for favorites content or empty state
    const favoritesContent = page.locator('text=Favorite Recipes, text=Favorite Coffees, text=No favorite, text=Browse recipes').first();
    await expect(favoritesContent).toBeVisible({ timeout: 5000 });
  });

  test('AC-13.5: Profile History Tab', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Click History tab
    const historyTab = page.locator('button:has-text("History"), [role="tab"]:has-text("History")').first();
    await expect(historyTab).toBeVisible({ timeout: 5000 });
    await historyTab.click();
    await page.waitForTimeout(1000); // Wait for tab content to load

    // Check for history content or empty state
    const historyContent = page.locator('text=Recently Viewed, text=No history, text=Start exploring').first();
    await expect(historyContent).toBeVisible({ timeout: 5000 });
  });
});

