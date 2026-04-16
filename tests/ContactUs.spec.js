import { test } from '../fixtures/baseFixture.js';

test.describe('Contact Us Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact-us/'); // adjust if URL differs
  });

  test('should load page and verify title', async ({ contactUsPage }) => {

    // ✅ Verify page load
    await contactUsPage.verifyPageLoaded();

    // ✅ Verify title
    await contactUsPage.verifyTitle('Contact Us');

  });

});