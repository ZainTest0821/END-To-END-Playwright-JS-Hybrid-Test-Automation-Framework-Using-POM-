import { BasePage } from './BasePage.js';

export class FaqPage extends BasePage {
  constructor(page) {
    super(page);
    this.pageTitle = 'h1:has-text("FAQ")';
  }

  async verifyPageLoaded() {
    await this.expectVisible(this.pageTitle);
  }

  async expandFaqItem(questionText) {
    const button = this.page.getByRole('button', { name: new RegExp(questionText, 'i') });
    const isExpanded = await button.evaluate(el => el.getAttribute('aria-expanded'));
    
    if (isExpanded === 'false') {
      await button.click();
    }
  }

  async getFaqAnswer(questionText) {
    const button = this.page.getByRole('button', { name: new RegExp(questionText, 'i') });
    const controlId = await button.evaluate(el => el.getAttribute('aria-controls'));
    return await this.page.locator(`#${controlId}`).textContent();
  }
}
