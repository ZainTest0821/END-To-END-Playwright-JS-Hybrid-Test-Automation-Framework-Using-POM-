import { BasePage } from './BasePage.js';

export class PricingPage extends BasePage {
  constructor(page) {
    super(page);

    // ================= LOCATORS =================
    this.pageTitle = page.locator('h1, .elementor-heading-title, .page-title').first();
    this.footer = page.locator('footer');

    // Pricing card buttons
    this.pricingCardButtons = {
      getStarted:  page.getByRole('link', { name: 'Get started' }),
      chooseGrowth: page.getByRole('link', { name: 'Choose Growth' }),
      getProNow: page.getByRole('link', { name: 'Get Pro Now' }),
      contactSales: page.getByRole('link', { name: 'Contact Sales' }),
    };

    this.findOutMoreBtn = page.getByRole('link', { name: 'Find Out More' });
  }

  // ================= METHODS =================

  async verifyPageLoaded() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.expectVisible(this.pageTitle, { timeout: 30000 });
  }

  async verifyTitle(expectedTitle) {
    const actualTitle = await this.pageTitle.textContent();
    if (!actualTitle || !actualTitle.includes(expectedTitle)) {
      throw new Error(`Page title mismatch! Expected: "${expectedTitle}", Actual: "${actualTitle}"`);
    }
    console.log(`✅ Page title verified: ${actualTitle}`);
  }

  //scroll to cards first then to find out more button
  async scrolltocard(){

    await this.pricingCardButtons.getStarted.scrollIntoViewIfNeeded();
    await this.expectVisible(this.pricingCardButtons.getStarted);
  }

  async verifyPricingCardButtonsAPI(request) {
    for (const [name, locator] of Object.entries(this.pricingCardButtons)) {
      const href = await locator.getAttribute('href');
      if (!href) {
        console.warn(`⚠️ No href found for button: ${name}`);
        continue;
      }

      const url = href.startsWith('http') ? href : new URL(href, this.page.url()).href;
      const response = await request.get(url, { timeout: 15000 });
      if (response.status() >= 400) {
        throw new Error(`❌ Broken link: ${name} | URL: ${url} | Status: ${response.status()}`);
      }

      console.log(`✅ Pricing card button OK: ${name} | URL: ${url} | Status: ${response.status()}`);
    }
  }


  // Scroll to Find Out More button (if exists) and verify API


  async verifyFindOutMoreButtonAPI(request) {
    const href = await this.findOutMoreBtn.getAttribute('href');
    if (!href) throw new Error('Find Out More button has no href!');
    const url = href.startsWith('http') ? href : new URL(href, this.page.url()).href;
    const response = await request.get(url, { timeout: 15000 });
    if (response.status() >= 400) throw new Error(`❌ Find Out More button broken | URL: ${url}`);
    console.log(`✅ Find Out More button OK | URL: ${url} | Status: ${response.status()}`);
  }
}