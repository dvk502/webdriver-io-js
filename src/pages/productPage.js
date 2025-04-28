const { getElementCenterColorFromScreen } = require('../utils/helper');
global.constants = require('#utils/constants');

class ProductPage {
  get addToCartButton() {
    return driver.$('id=cartBt');
  }
  get decreaseItemQtyButton() {
    return driver.$('id=minusIV');
  }
  get addItem() {
    return driver.$('id=plusIV');
  }
  get itemCounter() {
    return driver.$('id=noTV');
  }
  get cartItemCounter() {
    return driver.$('id=cartTV');
  }
  get cartButton() {
    return driver.$('id=cartIV');
  }
  get productCatalogText() {
    return driver.$('id=productTV');
  }
  get itemFilterButton() {
    return driver.$('id=sortIV');
  }
  get modalRatingText() {
    return driver.$('id=sortTV');
  }
  get modalRatingContinueButton() {
    return driver.$('id=closeBt');
  }
  get nameDescendingFilterOption() {
    return driver.$('id=nameDesCL');
  }
  get accordionMenu() {
    return driver.$('id=menuIV');
  }
  get logOutModal() {
    return driver.$('id=parentPanel');
  }
  get logOutModalButton() {
    return driver.$('id:android:id/button1');
  }
  get webViewButton() {
    return driver.$('//*[@text="WebView"]');
  }
  get logInButton() {
    return driver.$('//*[@text="Log In"]');
  }
  get logOutButton() {
    return driver.$('//*[@text="Log Out"]');
  }

  getItem(itemNumber) {
    return driver.$(
      `//*[@content-desc="Displays all products of catalog"]/android.view.ViewGroup[${itemNumber}]`
    );
  }

  async clickItemByIndex(itemNumber) {
    await driver
      .$(
        `//*[@content-desc='Displays all products of catalog']/android.view.ViewGroup[${itemNumber}]`
      )
      .click();
  }

  async clickItemFilter() {
    await this.itemFilterButton.click();
  }

  async clickDecreaseItemQtyButton() {
    await this.decreaseItemQtyButton.click();
  }

  async clickWebView() {
    await this.webViewButton.click();
  }

  async clickNameDescendingFilterOption() {
    await this.nameDescendingFilterOption.click();
  }

  async getItemTitle(itemNumber) {
    const itemLocator = this.getItem(itemNumber);
    return await itemLocator.$('~Product Title').getText();
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async checkLogInButtonVisible() {
    await expect(this.logInButton).toBeDisplayed();
  }

  async clickLogInButton() {
    await this.logInButton.click();
  }

  async clickAccordionMenu() {
    await expect(this.accordionMenu).toBeEnabled();
    await this.accordionMenu.click();
  }

  async confirmLogOutModal() {
    expect(this.logOutModal).toBeDisplayed();
    await this.logOutModalButton.click();
  }

  async clickLogOutButton() {
    await this.logOutButton.click();
  }

  async clickAddItem() {
    await this.addItem.click();
  }

  async clickCart() {
    await this.cartButton.click();
  }

  async clickModalRatingContinueButton() {
    await this.modalRatingContinueButton.click();
  }

  async rateItem(itemNumber, rate) {
    const rateLocator = driver.$(`(//*[contains(@resource-id, "start${rate}IV")])[${itemNumber}]`);
    await rateLocator.click();
  }

  async checkCartItemHasText(text) {
    await expect(this.cartItemCounter).toHaveAttribute('text', text);
  }

  async checkItemHasText(text) {
    await expect(this.itemCounter).toHaveAttribute('text', text);
  }

  async checkProductCatalogIsVisible() {
    await expect(this.productCatalogText).toHaveAttribute('text', constants.PRODUCT.PRODUCT_TITLE);
  }

  async checkModalRatingHasText(text) {
    await expect(this.modalRatingText).toHaveAttribute('text', text);
  }

  async getItemPriceByIndex(itemNumber) {
    return Number(
      (await driver.$(`(//*[@content-desc="Product Price"])[${itemNumber}]`).getText()).replace(
        '$ ',
        ''
      )
    );
  }

  async waitForItemByIndex(itemNumber) {
    await this.getItem(itemNumber).waitForEnabled({ timeout: 20000 });
  }

  async checkColorIsNotEqual(color) {
    expect(await getElementCenterColorFromScreen(this.addToCartButton)).not.toBe(color);
  }
}

module.exports = new ProductPage();
