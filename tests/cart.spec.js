global.productPage = require('#pages/productPage');
global.cartPage = require('#pages/cartPage');
global.webViewPage = require('#pages/webViewPage');
global.logInPage = require('#pages/LogInPage');
global.step = require('#commands/step');
global.constants = require('#utils/constants');
const { getElementCenterColorFromScreen } = require('#utils/helper');

describe('Cart tests', () => {
  it('Check shopping cart without adding items', async () => {
    await productPage.waitForItemByIndex(1);

    await step('Go to cart', async () => {
      await productPage.clickCart();
    });

    await step('Check shopping cart is empty', async () => {
      await cartPage.checkNoItemsTextDisplayed();
    });

    await step('Go to shopping catalog', async () => {
      await cartPage.clickGoShopping();
    });

    await step('Check user was redirected to catalog', async () => {
      await productPage.waitForItemByIndex(1);
      await productPage.checkProductCatalogIsVisible();
    });
  });

  it('Remove items from cart', async () => {
    await productPage.waitForItemByIndex(1);

    await step('Select first item', async () => {
      await productPage.clickItemByIndex(1);
    });

    await step('Add the item to cart', async () => {
      await productPage.clickAddToCart();
    });

    await step('Check the cart amount is displayed correctly', async () => {
      await productPage.checkCartItemHasText('1');
    });

    await step('Go to cart', async () => {
      await productPage.clickCart();
      await cartPage.checkCartHasText(constants.CART.TITLE);
    });

    await step('Remove item from cart', async () => {
      await cartPage.clickRemoveItemsButton();
    });

    await step('Check item is deleted', async () => {
      await cartPage.checkGoShoppingButtonIsDisplayed();
    });
  });

  it('Add to cart with 0 items(Color comparison)', async () => {
    let activeColorButton;
    await productPage.waitForItemByIndex(1);

    await step('Select first item', async () => {
      await productPage.clickItemByIndex(1);
    });

    await step('Get color of Add to Cart button', async () => {
      activeColorButton = await getElementCenterColorFromScreen(productPage.addToCartButton);
    });

    await step('Decrease item qty', async () => {
      await productPage.clickDecreaseItemQtyButton();
    });

    await step('Check "Add to cart" button color changed after selecting 0 items', async () => {
      await productPage.checkColorIsNotEqual(activeColorButton);
    });
  });
});
