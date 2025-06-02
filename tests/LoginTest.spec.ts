import { ApplicationScreens } from '@screens/ApplicationScreens';

describe('Login tests', () => {
  const screens = new ApplicationScreens();

  it('Positiv Login', async () => {
    await screens.login.inputEmailField('214');
    await screens.login.inputPasswordField('test');
    await screens.login.clickLoginButton();
    
    await screens.topAppBar.verifyTitleText('My Profile1');
    
  });
});
