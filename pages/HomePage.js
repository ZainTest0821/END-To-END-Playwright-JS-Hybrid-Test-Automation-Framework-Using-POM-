import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchBox = this.page.getByPlaceholder('Search your relevant tech');
    this.howItWorksLink = 'a:has-text("How It Works")';
    this.pricingLink = 'a:has-text("Pricing")';
    this.faqLink = 'a:has-text("FAQ")';
    this.footer = 'footer';
  }

  async verifyPageLoaded() {
    await this.expectVisible(this.searchBox);
  }

  async clickSearchBox() {
    await this.click(this.searchBox);
  }

  async navigateToHowItWorks() {
    await this.click(this.howItWorksLink);
  }

  async navigateToPricing() {
    await this.click(this.pricingLink);
  }

  async navigateToFaq() {
    await this.click(this.faqLink);
  }

  // async scrollToBottomSlowly() {
  //   await this.page.evaluate(async () => {
  //     await new Promise((resolve) => {
  //       let totalHeight = 0;
  //       const distance = 100;
  //       const timer = setInterval(() => {
  //         window.scrollBy(0, distance);
  //         totalHeight += distance;
  //         if (totalHeight >= document.body.scrollHeight) {
  //           clearInterval(timer);
  //           resolve();
  //         }
  //       }, 100);
  //     });
  //   });
  // }


  async scrollToBottom() {
  await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}


  async verifyFooterVisible() {
    await this.expectVisible(this.footer);
  }
}
