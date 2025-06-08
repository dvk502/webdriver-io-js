import Elem from './Elem';

class Gestures {
  static async scrollUntilVisible(element: Elem, maxAttempts = 10): Promise<void> {
    const { width, height } = await driver.getWindowSize();

    for (let i = 0; i < maxAttempts; i++) {
      if (await element.isDisplayed(1)) {
        return;
      }

      await driver.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: width / 2, y: height * 0.75 },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 100 },
            { type: 'pointerMove', duration: 400, x: width / 2, y: height * 0.25 },
            { type: 'pause', duration: 200 },
            { type: 'pointerUp', button: 0 }
          ]
        }
      ]);

      //   await driver.pause(1000);
    }

    if (!(await element.isDisplayed(1))) {
      throw new Error(`Element ${element} is not visible after ${maxAttempts} swipe attempts.`);
    }
  }
}

export default Gestures;
