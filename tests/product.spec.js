global.productPage = require('#pages/productPage');
global.cartPage = require('#pages/cartPage');
global.webViewPage = require('#pages/webViewPage');
global.logInPage = require('#pages/LogInPage');
global.step = require('#commands/step');
global.constants = require('#utils/constants');

describe('Product tests', () => {
  it('Add item to shopping cart', async () => {
    let itemPrice;

    await productPage.waitForItemByIndex(1, { timeout: 20000 });

    await step('Get item price', async () => {
      itemPrice = await productPage.getItemPriceByIndex(1);
    });

    await step('Select first item', async () => {
      await productPage.clickItemByIndex(1);
    });

    await step('Add the item to cart', async () => {
      await productPage.clickAddToCart();
    });

    await step('Check the cart amount is displayed correctly', async () => {
      await productPage.checkCartItemHasText('1');
    });

    await step('Increase the amount of the item', async () => {
      await productPage.clickAddItem();
      await productPage.checkItemHasText('2');
    });

    await step('Add the item to cart', async () => {
      await productPage.clickAddToCart();
    });

    await step('Check the cart amount is displayed correctly', async () => {
      await productPage.checkCartItemHasText('3');
    });

    await step('Go to cart', async () => {
      await productPage.clickCart();
      await cartPage.checkCartHasText(constants.CART.TITLE);
    });

    await step('Check item amount displays correctly', async () => {
      await cartPage.checkItemCounterHasText('3');
    });

    await step('Check item total price displays correctly', async () => {
      await cartPage.checkCartTotalPriceHasValue(`$ ${itemPrice * 3}`);
    });
  });

  it('Filtering functionality', async () => {
    let itemTitle;
    await productPage.waitForItemByIndex(1, { timeout: 20000 });

    await step('Get item title', async () => {
      itemTitle = await productPage.getItemTitle(1);
    });

    await step('Select name filtering Name -> Descending', async () => {
      await productPage.clickItemFilter();
      await productPage.clickNameDescendingFilterOption();
    });

    await step('Check that items are sorted by filtering', async () => {
      expect(await productPage.getItemTitle(1)).not.toBe(itemTitle);
    });
  });

  it('Rate item functionality', async () => {
    await productPage.waitForItemByIndex(1);

    await step('Select first item', async () => {
      await productPage.rateItem(1, 3);
    });

    await step('Check modal window is displayed', async () => {
      await productPage.checkModalRatingHasText(constants.PRODUCT.SUCCESS_MESSAGE);
    });

    await step('Close modal window', async () => {
      await productPage.clickModalRatingContinueButton();
      await expect(productPage.modalRatingContinueButton).not.toBeDisplayed();
    });
  });
});
