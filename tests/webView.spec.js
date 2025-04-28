global.productPage = require('#pages/productPage');
global.cartPage = require('#pages/cartPage');
global.webViewPage = require('#pages/webViewPage');
global.logInPage = require('#pages/LogInPage');
global.step = require('#commands/step');
global.constants = require('#utils/constants');

describe('WebView tests', () => {
  it('WebView functionality', async () => {
    const webViewUrl = 'https://www.youtube.com';

    await step('Open accordion menu', async () => {
      await productPage.waitForItemByIndex(1);
      await productPage.clickAccordionMenu();
    });

    await step('Go to web view button', async () => {
      await productPage.clickWebView();
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
});
