global.BasePage = require('#pages/basePage');

class WebViewPage extends BasePage {
  get urlInput() {
    return driver.$('id=urlET');
  }
  get goToSideButton() {
    return driver.$('id=goBtn');
  }
  get youtubeContent() {
    return driver.$('//*[@text="Try searching to get started"]');
  }

  async fillUrlInput(text) {
    await step('Fill input with url', async () => {
      await this.setInputValue(this.urlInput, text);
    });
  }

  async clickGoToSideButton() {
    await step('Go to site', async () => {
      await this.clickElement(this.goToSideButton);
    });
  }

  async checkYoutubeContentDisplayed() {
    await step('Check youtube home icon is displayed', async () => {
      await this.isElementDisplayed(this.youtubeContent);
    });
  }
}

module.exports = new WebViewPage();
