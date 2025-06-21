import Elem from './Elem';

type Direction = 'up' | 'down' | 'left' | 'right';

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

  static async scrollUntilVisibleIntoBox(
    element: Elem,
    scrollContainerSelector: string,
    maxAttempts = 10
  ): Promise<void> {
    const container = await driver.$(scrollContainerSelector);
    const { width, height } = await container.getSize();
    const { x, y } = await container.getLocation();

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
            { type: 'pointerMove', duration: 0, x: x + width / 2, y: y + height * 0.8 },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 100 },
            { type: 'pointerMove', duration: 500, x: x + width / 2, y: y + height * 0.2 },
            { type: 'pause', duration: 200 },
            { type: 'pointerUp', button: 0 }
          ]
        }
      ]);

      await driver.pause(200);
    }

    if (!(await element.isDisplayed(1))) {
      throw new Error(
        `Element ${element} is not visible inside ${scrollContainerSelector} after ${maxAttempts} scrolls.`
      );
    }
  }

  static async scroll(
    element: Elem,
    scrollContainerSelector: string,
    maxAttempts = 10
  ): Promise<boolean> {
    const container = await driver.$(scrollContainerSelector);
    const { width, height } = await container.getSize();
    const { x, y } = await container.getLocation();

    const swipe = async (direction: 'up' | 'down', duration: number) => {
      const startY = direction === 'up' ? y + height * 0.8 : y + height * 0.2;
      const endY = direction === 'up' ? y + height * 0.2 : y + height * 0.8;

      await driver.performActions([
        {
          type: 'pointer',
          id: 'finger1',
          parameters: { pointerType: 'touch' },
          actions: [
            { type: 'pointerMove', duration: 0, x: x + width / 2, y: startY },
            { type: 'pointerDown', button: 0 },
            { type: 'pause', duration: 100 },
            { type: 'pointerMove', duration, x: x + width / 2, y: endY },
            { type: 'pause', duration: 100 },
            { type: 'pointerUp', button: 0 }
          ]
        }
      ]);
      await driver.pause(100);
    };

    // Первый проход вниз
    for (let i = 0; i < maxAttempts; i++) {
      if (await element.isDisplayed(1)) return true;
      await swipe('up', 500); // Скролл вниз
    }

    // Быстрый проход вверх
    for (let i = 0; i < maxAttempts * 2; i++) {
      if (await element.isDisplayed(1)) return true;
      await swipe('down', 50); // Быстрый скролл вверх
    }

    // Повторный проход вниз
    for (let i = 0; i < maxAttempts; i++) {
      if (await element.isDisplayed(1)) return true;
      await swipe('up', 500);
    }

    // Не найден
    return false;
  }
}

export default Gestures;
