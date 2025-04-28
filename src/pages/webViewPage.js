class WebViewPage {
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
    await this.urlInput.setValue(text);
  }

  async clickGoToSideButton() {
    await this.goToSideButton.click();
  }

  async checkYoutubeContentDisplayed() {
    await expect(this.youtubeContent).toBeDisplayed();
  }
}

module.exports = new WebViewPage();
