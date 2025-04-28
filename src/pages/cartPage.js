global.constants = require('#utils/constants');

class CartPage {
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
    await expect(this.myCartText).toHaveAttribute('text', text);
  }

  async checkItemCounterHasText(text) {
    await expect(this.itemCounter).toHaveAttribute('text', text);
  }

  async checkCartTotalPriceHasValue(text) {
    await expect(this.cartTotalPrice).toHaveAttribute('text', text);
  }

  async checkNoItemsTextDisplayed() {
    await expect(this.noItemsText).toHaveAttribute('text', constants.CART.EMPTY_CART_TEXT);
  }

  async clickGoShopping() {
    await this.goShoppingButton.click();
  }

  async checkGoShoppingButtonIsDisplayed() {
    await expect(this.goShoppingButton).toBeDisplayed();
  }

  async clickRemoveItemsButton() {
    await this.removeItemsButton.click();
  }
}

module.exports = new CartPage();
