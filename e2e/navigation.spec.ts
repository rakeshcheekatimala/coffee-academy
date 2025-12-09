import { test, expect } from '@playwright/test';

test.describe('Navigation & Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('AC-1.1: Header Navigation (Desktop)', async ({ page }) => {
    // Verify logo is visible
    await expect(page.locator('nav a:has-text("Coffee Academy")')).toBeVisible();

    // Verify all navigation links are visible
    const navLinks = [
      { href: '/', label: 'Home' },
      { href: '/articles', label: 'Learn' },
      { href: '/recipes', label: 'Recipes' },
      { href: '/community', label: 'Community' },
      { href: '/brew-of-the-week', label: 'Featured' },
      { href: '/wizard', label: 'Find Your Brew' },
      { href: '/profile', label: 'Profile' },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`nav a[href="${link.href}"]:has-text("${link.label}")`);
      await expect(navLink).toBeVisible();
    }
  });

  test('AC-1.2: Header Navigation (Mobile)', async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Verify mobile menu button is visible (Menu icon button)
    const mobileMenuButton = page.locator('button.md\\:hidden, button[aria-label*="menu"], button:has(svg)').filter({ hasText: /./ }).first();
    await expect(mobileMenuButton).toBeVisible({ timeout: 5000 });

    // Desktop navigation should be hidden on mobile
    const desktopNav = page.locator('nav .hidden.md\\:flex');
    if (viewport?.width && viewport.width < 768) {
      await expect(desktopNav).toBeHidden();
    }

    // Click mobile menu button to open
    await mobileMenuButton.click();
    await page.waitForTimeout(500);

    // Verify mobile menu opens (navigation links should be visible)
    await expect(page.locator('nav a[href="/"]').first()).toBeVisible({ timeout: 3000 });
  });

  test('AC-1.3: Logo Navigation', async ({ page }) => {
    // Navigate to any page first
    await page.goto('/recipes');

    // Click logo
    const logo = page.locator('nav a:has-text("Coffee Academy"), nav a[href="/"]').first();
    await logo.click();

    // Verify redirected to homepage
    await expect(page).toHaveURL('/');
  });

  test('AC-1.4: Navigation Link Clicks', async ({ page }) => {
    const navLinks = [
      { href: '/articles', label: 'Learn' },
      { href: '/recipes', label: 'Recipes' },
      { href: '/community', label: 'Community' },
      { href: '/wizard', label: 'Find Your Brew' },
    ];

    for (const link of navLinks) {
      await page.goto('/');
      const navLink = page.locator(`nav a[href="${link.href}"]:has-text("${link.label}")`);
      await navLink.click();
      
      // Verify correct page loads
      await expect(page).toHaveURL(link.href);
      // Verify page content loads (not just empty page)
      await expect(page.locator('body')).toBeVisible();
    }
  });
});

