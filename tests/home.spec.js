import { test, expect } from '../fixtures/baseFixture.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});



test('should load homepage, verify search, scroll and check footer', async ({ page, homePage }) => {

  // ✅ Verify Home Page Loaded
  await homePage.verifyPageLoaded();
  await expect(page).toHaveURL(/ojiiz\.com/);

  // ✅ Verify Search Box is Visible
  await homePage.expectVisible(homePage.searchBox);

  // ✅ Scroll to Bottom (use POM method)
  await homePage.scrollToBottom();

  // ✅ Verify Footer Visible
  await homePage.verifyFooterVisible();

});