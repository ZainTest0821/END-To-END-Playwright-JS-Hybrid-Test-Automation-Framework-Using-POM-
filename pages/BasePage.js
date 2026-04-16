export class BasePage {
  constructor(page) {
    this.page = page;
  }

  _getLocator(locator) {
    return typeof locator === 'string' ? this.page.locator(locator) : locator;
  }

  async click(locator) {
    await this._getLocator(locator).click();
  }

  async fill(locator, text) {
    await this._getLocator(locator).fill(text);
  }

  async getText(locator) {
    return await this._getLocator(locator).textContent();
  }

  async expectVisible(locator) {
    await this._getLocator(locator).waitFor({ state: 'visible' });
  }

  async expectText(locator, text) {
    await this._getLocator(locator).waitFor({ state: 'visible' });
    await this._getLocator(locator).getByText(text).waitFor({ state: 'visible' });
  }

  async clickAndWaitForURL(locator, urlPart) {
    await this._getLocator(locator).click();
    await this.page.waitForURL(`**/${urlPart}**`);
  }
}
