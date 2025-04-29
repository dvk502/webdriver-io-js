global.productPage = require('#pages/productPage');
global.cartPage = require('#pages/cartPage');
global.webViewPage = require('#pages/webViewPage');
global.logInPage = require('#pages/LogInPage');
global.step = require('#commands/step');
global.constants = require('#utils/constants');

describe('WebView tests', () => {
  it('WebView functionality', async () => {
    const webViewUrl = 'https://www.youtube.com';

    await productPage.waitForItemByIndex();
    await productPage.clickAccordionMenu();
    await productPage.clickWebView();
    await webViewPage.fillUrlInput(webViewUrl);
    await webViewPage.clickGoToSideButton();
    await webViewPage.checkYoutubeContentDisplayed();
  });
});
