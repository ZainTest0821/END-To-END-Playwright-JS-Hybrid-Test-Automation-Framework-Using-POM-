import { test } from '../fixtures/baseFixture.js';

test.describe('Pricing And Plans Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing-plans/'); // adjust if your actual URL is different
  });

  test('should load page, verify title, pricing card buttons, and Find Out More button', async ({page, pricingPage, request }) => {
    
    // ✅ Page Load & Title
    await pricingPage.verifyPageLoaded();
    await pricingPage.verifyTitle('Pricing & Plans');


    // Scroll to pricing cards
    await pricingPage.scrolltocard();

    // ✅ Verify Pricing Card Buttons
    await pricingPage.verifyPricingCardButtonsAPI(request);
    
    // ✅ Verify Find Out More button
    await pricingPage.verifyFindOutMoreButtonAPI(request);
  });
});