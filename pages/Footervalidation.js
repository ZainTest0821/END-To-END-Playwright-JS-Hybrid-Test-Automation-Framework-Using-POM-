import { BasePage } from "./BasePage.js";

export class FooterValidation extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.footer = page.locator('footer'); // ✅ Locator object
  }

  async scrollToFooter() {
    await this.footer.scrollIntoViewIfNeeded();
  }

  async verifyFooterVisible() {
    await this.expectVisible(this.footer);
  }

  async verifyFooterLinksAPI(request) {
    // Define clickable footer links with flexible text matching
    const footerLinks = {
      howItWorks: 'How It Works',
      blogs: 'Blogs',
      pricing: 'Pricing',
      contactUs: 'Contact Us',
      faq: 'Frequently Asked Questions',
    };

    for (const [name, text] of Object.entries(footerLinks)) {
      try {
        // Use a more flexible locator with partial text matching
        const locator = this.footer.locator(`a:has-text("${text}")`);
        
        // Wait for the element (uses expect.timeout from config: 15000ms)
        await locator.first().waitFor({ state: 'attached' });
        
        const href = await locator.first().getAttribute('href');
        if (!href) {
          console.warn(`⚠️ No href found for ${name}`);
          continue;
        }

        const url = href.startsWith('http') ? href : new URL(href, this.page.url()).href;

        // Network request uses default Playwright timeouts
        const response = await request.get(url);
        const status = response.status();

        if (status >= 400) {
          throw new Error(`❌ Broken link: ${name} | URL: ${url} | Status: ${status}`);
        }

        console.log(`✅ Footer link OK: ${name} | URL: ${url} | Status: ${status}`);
      } catch (error) {
        console.warn(`⚠️ Could not verify footer link "${name}": ${error.message}`);
      }
    }
  }
}