import { test, expect } from '../fixtures/baseFixture.js';
import { FooterValidation } from '../pages/Footervalidation.js';
import { BasePage } from '../pages/BasePage.js';

test.describe('Footer Buttons API Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should validate specific footer buttons via API', async ({ page, request }) => {

    // Instantiate FooterValidation page object
    const footerPage = new FooterValidation(page);

    // Scroll to footer
    await footerPage.scrollToFooter();

    // Verify footer visible
    await footerPage.verifyFooterVisible();

    // Validate all footer links (skip email)
    await footerPage.verifyFooterLinksAPI(request);

  });

});