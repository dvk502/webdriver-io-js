const allure = require('@wdio/allure-reporter').default;

async function step(stepName, stepFunction) {
  allure.startStep(stepName);
  try {
    await stepFunction();
    allure.endStep('passed');
  } catch (error) {
    console.error(`Step "${stepName}" failed:`, error);

    try {
      const screenshotBase64 = await driver.takeScreenshot();
      allure.addAttachment(
        'Screenshot on failure',
        Buffer.from(screenshotBase64, 'base64'),
        'image/png'
      );
    } catch (screenshotError) {
      console.error('Failed to take screenshot:', screenshotError);
    }

    if (error.name && error.name.includes('AssertionError')) {
      allure.endStep('failed');
    } else {
      allure.endStep('broken');
    }

    throw error;
  }
}

module.exports = step;
