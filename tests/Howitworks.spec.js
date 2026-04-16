import { test, expect } from '../fixtures/baseFixture.js';

test.describe('How It Works Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/how-it-works/');
  });

  test('should load page, verify title, and validate CTA buttons API', async ({ page, howItWorksPage, request }) => {

    // ✅ Verify Page Loaded
    await howItWorksPage.verifyPageLoaded();

    // ✅ Verify Page Title
    await howItWorksPage.verifyTitle('How Ojiiz Works'); // replace with actual page title if needed

    // ✅ Validate both CTA buttons API
    await howItWorksPage.verifyAllCTAButtonsAPI(request);
  });

});