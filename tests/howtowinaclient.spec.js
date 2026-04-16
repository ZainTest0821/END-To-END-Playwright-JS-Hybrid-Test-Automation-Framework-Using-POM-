import { test } from '../fixtures/baseFixture.js';

test.describe('How To Win A Client Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/how-to-win-a-client/'); // adjust if your actual URL is different
  });

  test('should load page and verify title', async ({ howToWinClientPage }) => {

    // ✅ Page load
    await howToWinClientPage.verifyPageLoaded();

    // ✅ Title verification
    await howToWinClientPage.verifyTitle('How to Win a Client');

  });

});