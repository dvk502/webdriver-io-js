const { getElementCenterColorFromScreen } = require('#utils/helper');
global.constants = require('#utils/constants');
global.BasePage = require('#pages/basePage');

class ProductPage extends BasePage {
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

  get webViewButton() {
    return driver.$('//*[@text="WebView"]');
  }

  // Добавлено отсутствующее свойство
  get logInButton() {
    return driver.$('//*[@text="Log In"]');
  }

  getItem(itemNumber) {
    return driver.$(
      `//*[@content-desc="Displays all products of catalog"]/android.view.ViewGroup[${itemNumber}]`
    );
  }

  async clickItemByIndex(itemNumber = 1) {
    await step('Click first item', async () => {
      await this.clickElement(this.getItem(itemNumber));
    });
  }

  async clickItemFilter() {
    await step('Click item filter', async () => {
      await this.clickElement(this.itemFilterButton);
    });
  }

  async clickDecreaseItemQtyButton() {
    await step('Decrease item qty', async () => {
      await this.clickElement(this.decreaseItemQtyButton);
    });
  }

  async clickWebView() {
    await step('Go to web view button', async () => {
      await this.clickElement(this.webViewButton);
    });
  }

  async clickNameDescendingFilterOption() {
    await step('click filtering option -> Descending', async () => {
      await this.clickElement(this.nameDescendingFilterOption);
    });
  }

  // Исправлен метод, чтобы корректно возвращал значение
  async getItemTitleByIndex(itemNumber = 1) {
    let title;
    await step('Get item title', async () => {
      const itemLocator = this.getItem(itemNumber);
      title = await this.getElementText(itemLocator.$('~Product Title'));
    });
    return title;
  }

  async clickAddToCart() {
    await step('Add the item to cart', async () => {
      await this.clickElement(this.addToCartButton);
    });
  }

  async checkLogInButtonVisible() {
    await step('Check "Log In button is displayed"', async () => {
      await this.isElementDisplayed(this.logInButton);
    });
  }

  async clickLogInButton() {
    await step('Click Log in button', async () => {
      await this.clickElement(this.logInButton);
    });
  }

  async checkItemTitleNotToBe(expectedValue) {
    await step(`Check that item not to be with value ${expectedValue}`, async () => {
      expect(await this.getItemTitleByIndex()).not.toBe(expectedValue);
    });
  }

  async clickAccordionMenu() {
    await step('Open accordion menu', async () => {
      await this.isElementEnabled(this.accordionMenu);
      await this.clickElement(this.accordionMenu);
    });
  }

  async clickAddItem() {
    await step('Increase the amount of the item', async () => {
      await this.clickElement(this.addItem);
    });
  }

  async clickCart() {
    await step('Click cart button', async () => {
      await this.clickElement(this.cartButton);
    });
  }

  async clickModalRatingContinueButton() {
    await this.clickElement(this.modalRatingContinueButton);
  }

  async rateItem(itemNumber = 1, rate) {
    await step(`Rate item with ${rate} stars`, async () => {
      const rateLocator = driver.$(
        `(//*[contains(@resource-id, "start${rate}IV")])[${itemNumber}]`
      );
      await this.clickElement(rateLocator);
    });
  }

  async checkCartItemHasText(text) {
    await step(`Check the cart item amount has value ${text}`, async () => {
      await this.expectElementAttributeToEqual(this.cartItemCounter, 'text', text);
    });
  }

  async checkItemHasText(text) {
    await step(`Check item has value ${text}`, async () => {
      await this.expectElementAttributeToEqual(this.itemCounter, 'text', text);
    });
  }

  async checkProductCatalogIsDisplayed() {
    await step('Check product catalog is displayed', async () => {
      await this.expectElementAttributeToEqual(
        this.productCatalogText,
        'text',
        constants.PRODUCT.PRODUCT_TITLE
      );
    });
  }

  async checkModalRatingHasText(text) {
    await step(`Check modal rating window has text ${text}`, async () => {
      await this.expectElementAttributeToEqual(this.modalRatingText, 'text', text);
    });
  }

  async closeModalWindow() {
    await step('Close modal window', async () => {
      await this.clickModalRatingContinueButton();
      await expect(this.modalRatingContinueButton).not.toBeDisplayed();
    });
  }

  async getItemPriceByIndex(itemNumber = 1) {
    let price;
    await step('Get item price', async () => {
      const elementText = await driver
        .$(`(//*[@content-desc="Product Price"])[${itemNumber}]`)
        .getText();
      price = Number(elementText.replace('$ ', ''));
    });
    return price;
  }

  async waitForItemByIndex(itemNumber = 1) {
    await step('Wait for item', async () => {
      await this.isElementEnabled(this.getItem(itemNumber));
    });
  }

  async checkColorIsNotEqual(color) {
    await step('Check "Add to cart" button color changed', async () => {
      await this.expectElementNotToBe(
        await getElementCenterColorFromScreen(this.addToCartButton),
        color
      );
    });
  }

  async checkUserWasRedirectedToProductsCatalog() {
    await step('Check user was redirected to catalog', async () => {
      await this.waitForItemByIndex();
      await this.checkProductCatalogIsDisplayed();
    });
  }
}

module.exports = new ProductPage();
