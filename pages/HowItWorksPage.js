import { BasePage } from './BasePage.js';

export class HowItWorksPage extends BasePage {
  constructor(page) {
    super(page);

    // ================= LOCATORS =================
    this.pageTitle = page.getByRole('heading', { name: /How Ojiiz Works/i });
    this.getNowButton = page.getByRole('link', { name: /get now/i });
    this.exploreNowButton = page.getByRole('link', { name: 'explore more' });
    this.footer = page.locator('footer');
  }

  // ================= METHODS =================

  async verifyPageLoaded() {
    await this.page.waitForLoadState('domcontentloaded'); // Wait for page to load
    await this.expectVisible(this.pageTitle);
  }

  async verifyTitle(expectedTitle) {
    await this.expectText(this.pageTitle, expectedTitle);
  }

  // API validation for a button
  async verifyButtonAPIResponse(request, buttonLocator) {
    const href = await buttonLocator.getAttribute('href');
    if (!href) throw new Error('No href found for button');

    const url = href.startsWith('http') ? href : new URL(href, this.page.url()).href;
    const response = await request.get(url, { timeout: 15000 });

    if (response.status() >= 400) {
      throw new Error(`❌ Broken button link | URL: ${url} | Status: ${response.status()}`);
    }
    console.log(`✅ Button API OK | URL: ${url} | Status: ${response.status()}`);
  }

  // Scroll to Explore Now button (above footer)
  async scrollToExploreNow() {
    await this.exploreNowButton.scrollIntoViewIfNeeded();
    await this.expectVisible(this.exploreNowButton);
  }

  // Shortcut method to check both buttons
  async verifyAllCTAButtonsAPI(request) {
    await this.verifyButtonAPIResponse(request, this.getNowButton);
    await this.scrollToExploreNow();
    await this.verifyButtonAPIResponse(request, this.exploreNowButton);
  }
}