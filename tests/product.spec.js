global.productPage = require('#pages/productPage');
global.cartPage = require('#pages/cartPage');
global.webViewPage = require('#pages/webViewPage');
global.logInPage = require('#pages/LogInPage');
global.step = require('#commands/step');
global.constants = require('#utils/constants');

describe('Product tests', () => {
  it('Add item to shopping cart', async () => {
    let itemPrice;

    await productPage.waitForItemByIndex();
    itemPrice = await productPage.getItemPriceByIndex();
    await productPage.clickItemByIndex();
    await productPage.clickAddToCart();
    await productPage.checkCartItemHasText('1');
    await productPage.clickAddItem();
    await productPage.checkItemHasText('2');
    await productPage.clickAddToCart();
    await productPage.checkCartItemHasText('3');
    await productPage.clickCart();
    await cartPage.checkCartHasText(constants.CART.TITLE);
    await cartPage.checkItemCounterHasText('3');
    await cartPage.checkCartTotalPriceHasValue(`$ ${itemPrice * 3}`);
  });

  it('Filtering functionality', async () => {
    let itemTitle;

    await productPage.waitForItemByIndex();
    itemTitle = await productPage.getItemTitleByIndex();
    await productPage.clickItemFilter();
    await productPage.clickNameDescendingFilterOption();
    await productPage.checkItemTitleNotToBe(itemTitle);
  });

  it('Rate item functionality', async () => {
    await productPage.waitForItemByIndex();
    await productPage.rateItem(1, 3);
    await productPage.checkModalRatingHasText(constants.PRODUCT.SUCCESS_MESSAGE);
    await productPage.closeModalWindow();
  });
});
