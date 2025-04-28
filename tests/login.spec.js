global.productPage = require('#pages/productPage');
global.cartPage = require('#pages/cartPage');
global.webViewPage = require('#pages/webViewPage');
global.logInPage = require('#pages/LogInPage');
global.step = require('#commands/step');
global.constants = require('#utils/constants');
const dotenv = require('dotenv');

dotenv.config();

describe('Login tests', () => {
  it('Log In/Log Out functionality', async () => {
    await productPage.checkProductCatalogIsVisible();

    await step('Open accordion menu', async () => {
      await productPage.clickAccordionMenu();
    });

    await step('Log in', async () => {
      await productPage.clickLogInButton();
    });

    await step('Login with a valid username/password', async () => {
      await logInPage.login();
    });

    await step('Open accordion menu', async () => {
      await productPage.clickAccordionMenu();
    });

    await step('Log out', async () => {
      await productPage.clickLogOutButton();
      await productPage.confirmLogOutModal();
    });

    await step('Open accordion menu', async () => {
      await productPage.clickAccordionMenu();
    });

    await step('Check "Log In button is displayed"', async () => {
      await productPage.checkLogInButtonVisible();
    });
  });

  it('Login validation', async () => {
    await productPage.checkProductCatalogIsVisible();

    await step('Open accordion menu', async () => {
      await productPage.clickAccordionMenu();
    });

    await step('Log in', async () => {
      await productPage.clickLogInButton();
    });

    await step('Log in', async () => {
      await logInPage.clickLoginButton();
    });

    await step('Log in', async () => {
      await logInPage.checkLoginUsernameErrorHasText(constants.LOGIN.USERNAME_REQUIRED_ERROR);
    });

    await step('Fill username input', async () => {
      await logInPage.fillUsernameInput(process.env.TEST_USERNAME);
    });

    await step('Log in', async () => {
      await logInPage.clickLoginButton();
    });

    await step('Log in', async () => {
      await logInPage.checkLoginPasswordErrorHasText(constants.LOGIN.PASSWORD_REQUIRED_ERROR);
    });
  });
});
