const timeout = Number(process.env.DEFAULT_TIMEOUT)

class BasePage {

  /**
   * This function returns the item after waiting for the element to be displayed and enabled
   * @param element {WebdriverIO.Element}
   * @param options {Object}
   */
  async waitForElement(element, options = { timeout: timeout }) {
    return await element
      .waitForDisplayed({ timeout: options.timeout })
      .then(() => element.waitForEnabled({ timeout: options.timeout }));
  }

  /**
   * This function clicks on the specified element
   * @param element {WebdriverIO.Element}
   * @param options {Object}
   */
  async clickElement(element, options = { timeout: timeout }) {
    await this.waitForElement(element, options);
    await element.click();
  }

  /**
   * This function fills the input with the specified value
   * @param element {WebdriverIO.Element}
   * @param value {String}
   * @param options {Object}
   */
  async setInputValue(element, value, options = { timeout: timeout }) {
    await this.waitForElement(element, options);
    await element.setValue(value);
  }

  /**
   * This function waits until the item is displayed
   * @param element {WebdriverIO.Element}
   * @param options {Object}
   */
  async isElementDisplayed(element, options = { timeout: timeout }) {
    try {
      return await element.waitForDisplayed({ timeout: options.timeout });
    } catch {
      return false;
    }
  }

  /**
   * This function waits until the element is enabled
   * @param element {WebdriverIO.Element}
   * @param options {Object}
   */
  async isElementEnabled(element, options = { timeout: timeout }) {
    try {
      return await element.waitForEnabled({ timeout: options.timeout });
    } catch {
      return false;
    }
  }

  /**
   * This function returns the text value of specified element
   * @param element {WebdriverIO.Element}
   * @param options {Object}
   */
  async getElementText(element, options = { timeout: timeout }) {
    await this.waitForElement(element, options);
    return element.getText();
  }

  /**
   * This function expects element to have attribute equal to expected value
   * @param element {WebdriverIO.Element}
   * @param attribute {String}
   * @param options {Object}
   * @param expectedValue {Object}
   */
  async expectElementAttributeToEqual(
    element,
    attribute,
    expectedValue,
    options = { timeout: timeout }
  ) {
    await this.waitForElement(element, options);
    await expect(element).toHaveAttribute(attribute, expectedValue);
  }

  /**
   * This function expects the actual value to be equal to the expected value
   * @param actualValue {String}
   * @param expectedValue {String}
   */
  async expectElementNotToBe(actualValue, expectedValue) {
    await expect(actualValue).not.toBe(expectedValue);
  }
}

module.exports = BasePage;
