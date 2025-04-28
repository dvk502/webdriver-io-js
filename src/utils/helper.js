const Jimp = require('jimp');

async function getElementCenterColorFromScreen(element) {
  const location = await element.getLocation();
  const size = await element.getSize();

  const screenshot = await driver.takeScreenshot();
  const image = await Jimp.read(Buffer.from(screenshot, 'base64'));

  image.crop(location.x, location.y, size.width, size.height);

  const centerX = Math.floor(image.bitmap.width / 2);
  const centerY = Math.floor(image.bitmap.height / 2);

  const pixelColor = image.getPixelColor(centerX, centerY);
  return Jimp.intToRGBA(pixelColor);
}

module.exports = { getElementCenterColorFromScreen };
