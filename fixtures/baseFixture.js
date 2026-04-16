import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { HowItWorksPage } from '../pages/HowItWorksPage.js';
import { PricingPage } from '../pages/PricingPage.js';
import { FaqPage } from '../pages/FaqPage.js';
import { HowToWinAClientPage } from '../pages/HowToWinAClientPage.js';
import { ContactUsPage } from '../pages/ContactUsPage.js';

export const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  howItWorksPage: async ({ page }, use) => {
    await use(new HowItWorksPage(page));
  },
  pricingPage: async ({ page }, use) => {
    await use(new PricingPage(page));
  },
  faqPage: async ({ page }, use) => {
    await use(new FaqPage(page));
  },
  howToWinClientPage: async ({ page }, use) => { 
    await use(new HowToWinAClientPage(page));
  },
  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  }
});

export { expect } from '@playwright/test';
