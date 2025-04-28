global.catalogPage = require('../src/pages/catalogPage');
global.cartPage = require('../src/pages/cartPage');
global.webViewPage = require('../src/pages/webViewPage');
global.logInPage = require('../src/pages/LogInPage');
global.step = require('../src/commands/step');
const logger = require('../src/utils/logger');
const { getElementCenterColorFromScreen } = require('../src/utils/helper');

describe('Test scope', () => {
  const appPackage = 'com.saucelabs.mydemoapp.android';

  beforeEach(async () => {
    try {
      const appState = await driver.queryAppState(appPackage);

      if (appState !== 4) {
        // appState === 4 is app in foreground
        await driver.activateApp(appPackage);
        await driver.pause(1000);
      }
    } catch (error) {
      logger.warn('Failed to ensure app is running in foreground:', error.message);
    }
  });

  afterEach(async () => {
    try {
      await driver.execute('mobile: shell', {
        command: 'am',
        args: ['force-stop', appPackage]
      });
    } catch (error) {
      logger.warn('Failed to stop app:', error.message);
    }
  });

  it('Add item to shopping cart', async () => {
    await catalogPage.waitForItem(1);
    let itemPrice;

    await step('Get item price', async () => {
      itemPrice = await catalogPage.getItemPrice(1);
      logger.debug(`itemPrice: ${itemPrice}`);
    });

    await step('Select first item', async () => {
      await catalogPage.clickItem(1);
    });

    await step('Add the item to cart', async () => {
      await catalogPage.clickAddToCart();
    });

    await step('Check the cart amount is displayed correctly', async () => {
      await catalogPage.checkCartItemHasText('1');
    });

    await step('Increase the amount of the item', async () => {
      await catalogPage.clickAddItem();
      await catalogPage.checkItemHasText('2');
    });

    await step('Add the item to cart', async () => {
      await catalogPage.clickAddToCart();
    });

    await step('Check the cart amount is displayed correctly', async () => {
      await catalogPage.checkCartItemHasText('3');
    });

    await step('Go to cart', async () => {
      await catalogPage.clickCart();
      await cartPage.checkCartHasText('My Cart');
    });

    await step('Check item amount displays correctly', async () => {
      await cartPage.checkItemCounterHasText('3');
    });

    await step('Check item total price displays correctly', async () => {
      await cartPage.checkCartTotalPriceHasValue(`$ ${itemPrice * 3}`);
    });
  });

  it('Check shopping cart without adding items', async () => {
    await catalogPage.waitForItem(1);

    await step('Go to cart', async () => {
      await catalogPage.clickCart();
    });

    await step('Check shopping cart is empty', async () => {
      await cartPage.checkNoItemsTextDisplayed();
    });

    await step('Go to shopping catalog', async () => {
      await cartPage.clickGoShopping();
    });

    await step('Check user was redirected to catalog', async () => {
      await catalogPage.waitForItem(1);
      await catalogPage.checkProductCatalogIsVisible();
    });
  });

  it('Filtering functionality', async () => {
    await catalogPage.waitForItem(1);
    let itemTitle;

    await step('Get item title', async () => {
      itemTitle = await catalogPage.getItemTitle(1);
      logger.info(`itemTitle: ${itemTitle}`);
    });

    await step('Select name filtering Name -> Descending', async () => {
      await catalogPage.clickItemFilter();
      await catalogPage.clickNameDescendingFilterOption();
    });

    await step('Check that items are sorted by filtering', async () => {
      expect(await catalogPage.getItemTitle(1)).not.toBe(itemTitle);
    });
  });

  it('WebView functionality', async () => {
    const webViewUrl = 'https://www.youtube.com';

    await step('Open accordion menu', async () => {
      await catalogPage.waitForItem(1);
      await catalogPage.clickAccordionMenu();
    });

    await step('Go to web view button', async () => {
      await catalogPage.clickWebView();
    });

    await step('Fill input with url', async () => {
      await webViewPage.fillUrlInput(webViewUrl);
    });

    await step('Go to site', async () => {
      await webViewPage.clickGoToSideButton();
    });

    await step('Check youtube home icon is displayed', async () => {
      await webViewPage.checkYoutubeContentDisplayed();
    });
  });

  it('Log In/Log Out functionality', async () => {
    await catalogPage.checkProductCatalogIsVisible();

    await step('Open accordion menu', async () => {
      await catalogPage.clickAccordionMenu();
    });

    await step('Log in', async () => {
      await catalogPage.clickLogInButton();
    });

    await step('Login with a valid username/password', async () => {
      await logInPage.login();
    });

    await step('Open accordion menu', async () => {
      await catalogPage.clickAccordionMenu();
    });

    await step('Log out', async () => {
      await catalogPage.clickLogOutButton();
      await catalogPage.confirmLogOutModal();
    });

    await step('Open accordion menu', async () => {
      await catalogPage.clickAccordionMenu();
    });

    await step('Check "Log In button is displayed"', async () => {
      await catalogPage.checkLogInButtonVisible();
    });
  });

  it('Remove items from cart', async () => {
    await catalogPage.waitForItem(1);

    await step('Select first item', async () => {
      await catalogPage.clickItem(1);
    });

    await step('Add the item to cart', async () => {
      await catalogPage.clickAddToCart();
    });

    await step('Check the cart amount is displayed correctly', async () => {
      await catalogPage.checkCartItemHasText('1');
    });

    await step('Go to cart', async () => {
      await catalogPage.clickCart();
      await cartPage.checkCartHasText('My Cart');
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
    await catalogPage.waitForItem(1);

    await step('Select first item', async () => {
      await catalogPage.clickItem(1);
    });

    await step('Get color of Add to Cart button', async () => {
      activeColorButton = await getElementCenterColorFromScreen(catalogPage.addToCartButton);
    });

    await step('Decrease item qty', async () => {
      await catalogPage.clickDecreaseItemQtyButton();
    });

    await step('Check "Add to cart" button color changed after selecting 0 items', async () => {
      await catalogPage.checkColorIsNotEqual(activeColorButton);
    });
  });

  it('Rate item functionality', async () => {
    await catalogPage.waitForItem(1);

    await step('Select first item', async () => {
      await catalogPage.rateItem(1, 3);
    });

    await step('Check modal window is displayed', async () => {
      await catalogPage.checkModalRatingHasText('Thank you for submitting your review!');
    });

    await step('Close modal window', async () => {
      await catalogPage.clickModalRatingContinueButton();
      await expect(catalogPage.modalRatingContinueButton).not.toBeDisplayed();
    });
  });

  it('Login validation', async () => {
    await catalogPage.checkProductCatalogIsVisible();

    await step('Open accordion menu', async () => {
      await catalogPage.clickAccordionMenu();
    });

    await step('Log in', async () => {
      await catalogPage.clickLogInButton();
    });

    await step('Log in', async () => {
      await logInPage.clickLoginButton();
    });

    await step('Log in', async () => {
      await logInPage.checkLoginUsernameErrorHasText('Username is required');
    });

    await step('Fill username input', async () => {
      await logInPage.fillUsernameInput('q');
    });

    await step('Log in', async () => {
      await logInPage.clickLoginButton();
    });

    await step('Log in', async () => {
      await logInPage.checkLoginPasswordErrorHasText('Enter Password');
    });
  });
});
