global.constants = require('#utils/constants');
global.BasePage = require('#pages/basePage');

class CartPage extends BasePage {
  get cartTotalPrice() {
    return driver.$('id=totalPriceTV');
  }
  get myCartText() {
    return driver.$('id=productTV');
  }
  get itemCounter() {
    return driver.$('id=noTV');
  }
  get noItemsText() {
    return driver.$('id=noItemTitleTV');
  }
  get goShoppingButton() {
    return driver.$('id=shoppingBt');
  }
  get removeItemsButton() {
    return driver.$('id=removeBt');
  }

  async checkCartHasText(text) {
    await step(`Check cart has value ${text}`, async () => {
      await this.expectElementAttributeToEqual(this.myCartText, 'text', text);
    });
  }

  async checkItemCounterHasText(text) {
    await step(`Check item counter has value ${text}`, async () => {
      await this.expectElementAttributeToEqual(this.itemCounter, 'text', text);
    });
  }

  async checkCartTotalPriceHasValue(text) {
    await step(`Check cart total price has value ${text}`, async () => {
      await this.expectElementAttributeToEqual(this.cartTotalPrice, 'text', text);
    });
  }

  async checkNoItemsTextDisplayed() {
    await step('Check shopping cart is empty', async () => {
      await this.expectElementAttributeToEqual(
        this.noItemsText,
        'text',
        constants.CART.EMPTY_CART_TEXT
      );
    });
  }

  async clickGoShopping() {
    await step('Go to shopping catalog', async () => {
      await this.clickElement(this.goShoppingButton);
    });
  }

  async clickRemoveItemsButton() {
    await step('Remove item from cart', async () => {
      await this.clickElement(this.removeItemsButton);
    });
  }
}

module.exports = new CartPage();
