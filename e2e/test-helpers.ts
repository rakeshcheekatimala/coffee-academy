/**
 * Test helper utilities for Playwright E2E tests
 */

import { Page, expect } from '@playwright/test';

/**
 * Wait for page to be fully loaded
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Verify navigation link works
 */
export async function verifyNavigation(
  page: Page,
  linkSelector: string,
  expectedUrl: string | RegExp
) {
  await page.locator(linkSelector).first().click();
  await expect(page).toHaveURL(expectedUrl);
}

/**
 * Fill form field safely
 */
export async function fillFormField(
  page: Page,
  selector: string,
  value: string
) {
  const field = page.locator(selector).first();
  if (await field.isVisible()) {
    await field.fill(value);
  }
}

/**
 * Click button if visible
 */
export async function clickIfVisible(page: Page, selector: string) {
  const button = page.locator(selector).first();
  if (await button.isVisible()) {
    await button.click();
    return true;
  }
  return false;
}

/**
 * Verify element contains text
 */
export async function verifyTextExists(
  page: Page,
  text: string | RegExp
) {
  await expect(page.locator(`text=${text}`).first()).toBeVisible();
}

/**
 * Get GA events from network requests
 */
export async function getGAEvents(page: Page): Promise<string[]> {
  const events: string[] = [];
  
  page.on('request', request => {
    const url = request.url();
    if (url.includes('google-analytics.com') || 
        url.includes('googletagmanager.com') ||
        url.includes('/collect')) {
      events.push(url);
    }
  });
  
  return events;
}

/**
 * Clear localStorage
 */
export async function clearLocalStorage(page: Page) {
  await page.evaluate(() => {
    localStorage.clear();
  });
}

/**
 * Set localStorage item
 */
export async function setLocalStorageItem(
  page: Page,
  key: string,
  value: string
) {
  await page.evaluate(
    ({ key, value }) => {
      localStorage.setItem(key, value);
    },
    { key, value }
  );
}


