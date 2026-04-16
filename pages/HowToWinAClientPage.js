import { BasePage } from './BasePage.js';

export class HowToWinAClientPage extends BasePage {
  constructor(page) {
    super(page);

    // Flexible title locator (handles Elementor / normal pages)
    this.pageTitle = page.locator('h1, .elementor-heading-title, .page-title').first();
  }

  async verifyPageLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.expectVisible(this.pageTitle);
  }

  async verifyTitle(expectedTitle) {
    const actualTitle = await this.pageTitle.textContent();

    if (!actualTitle || !actualTitle.toLowerCase().includes(expectedTitle.toLowerCase())) {
      throw new Error(`❌ Title mismatch | Expected: "${expectedTitle}" | Actual: "${actualTitle}"`);
    }

    console.log(`✅ Page title verified: ${actualTitle}`);
  }
}