global.productPage = require('#pages/productPage');
global.cartPage = require('#pages/cartPage');
global.webViewPage = require('#pages/webViewPage');
global.logInPage = require('#pages/logInPage');
global.step = require('#commands/step');
global.constants = require('#utils/constants');
const { getElementCenterColorFromScreen } = require('#utils/helper');

describe('Cart tests', () => {
  it('Check shopping cart without adding items', async () => {
    await productPage.waitForItemByIndex();
    await productPage.clickCart();
    await cartPage.checkNoItemsTextDisplayed();
    await cartPage.clickGoShopping();
    await productPage.checkUserWasRedirectedToProductsCatalog();
  });

  it('Remove items from cart', async () => {
    await productPage.waitForItemByIndex();
    await productPage.clickItemByIndex();
    await productPage.clickAddToCart();
    await productPage.checkCartItemHasText('1');
    await productPage.clickCart();
    await cartPage.checkCartHasText(constants.CART.TITLE);
    await cartPage.clickRemoveItemsButton();
    await cartPage.checkNoItemsTextDisplayed();
  });

  it('Add to cart with 0 items(Color comparison)', async () => {
    let activeColorButton;
    await productPage.waitForItemByIndex();
    await productPage.clickItemByIndex();
    activeColorButton = await getElementCenterColorFromScreen(productPage.addToCartButton);
    await productPage.clickDecreaseItemQtyButton();
    await productPage.checkColorIsNotEqual(activeColorButton);
  });
});
