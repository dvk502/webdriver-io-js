global.productPage = require('#pages/productPage');
global.cartPage = require('#pages/cartPage');
global.webViewPage = require('#pages/webViewPage');
global.logInPage = require('#pages/LogInPage');
global.step = require('#commands/step');
global.constants = require('#utils/constants');

describe('Login tests', () => {
  it('Log In/Log Out functionality', async () => {
    await productPage.checkProductCatalogIsDisplayed();
    await productPage.clickAccordionMenu();
    await productPage.clickLogInButton();
    await logInPage.login();
    await productPage.clickAccordionMenu();
    await logInPage.logOut();
    await productPage.clickAccordionMenu();
    await productPage.checkLogInButtonVisible();
  });

  it('Login validation', async () => {
    await productPage.checkProductCatalogIsDisplayed();
    await productPage.clickAccordionMenu();
    await productPage.clickLogInButton();
    await logInPage.clickLoginButton();
    await logInPage.checkLoginUsernameErrorHasText(constants.LOGIN.USERNAME_REQUIRED_ERROR);
    await logInPage.fillUsernameInput(process.env.TEST_USERNAME);
    await logInPage.clickLoginButton();
    await logInPage.checkLoginPasswordErrorHasText(constants.LOGIN.PASSWORD_REQUIRED_ERROR);
  });
});
