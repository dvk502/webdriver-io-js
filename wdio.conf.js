const dotenv = require('dotenv');
const path = require('path');
require('module-alias/register');

const timeout = Number(process.env.DEFAULT_TIMEOUT)

dotenv.config();

exports.config = {
  runner: 'local',
  hostname: '127.0.0.1',
  port: 3000,
  specs: ['./tests/**/*.js'],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': `${process.env.DEVICE_NAME}`,
      'appium:platformVersion': `${process.env.PLATFORM_VERSION}`,
      'appium:automationName': `${process.env.AUTOMATION_DRIVER_NAME}`,
      'appium:app': path.join(__dirname, 'src/apk', 'app-debug.apk'),
      'appium:disableIdLocatorAutocompletion': false,
      'appium:autoAcceptAlerts': true,
      'appium:newCommandTimeout': 300
    }
  ],
  logLevel: process.env.LOG_LEVEL,
  bail: 0,
  path: '/',
  services: [
    [
      'appium',
      {
        args: {
          address: '127.0.0.1',
          port: 3000,
          'allow-insecure': 'chromedriver_autodownload,adb_shell'
        },
        command: 'appium'
      }
    ]
  ],
  waitforTimeout: timeout,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: [
    [
      'spec',
      {
        symbols: {
          passed: '[PASS]',
          failed: '[FAIL]'
        },
        onlyFailures: true,
        addConsoleLogs: true,
        realtimeReporting: true,
        showPreface: false
      }
    ],
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true
      }
    ]
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 90000,
    retries: Number(process.env.RETRIES) || 0
  },
  beforeTest: async function (test) {
    const appPackage = 'com.saucelabs.mydemoapp.android';
    try {
      const appState = await driver.queryAppState(appPackage);

      if (appState !== 4) {
        // appState === 4 is app in foreground
        await driver.activateApp(appPackage);
        await driver.pause(1000);
      }
    } catch (error) {
      console.warn('Failed to ensure app is running in foreground:', error.message);
    }
  },

  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    const appPackage = 'com.saucelabs.mydemoapp.android';
    try {
      await driver.execute('mobile: shell', {
        command: 'am',
        args: ['force-stop', appPackage]
      });
    } catch (error) {
      console.warn('Failed to stop app:', error.message);
    }
  }
};
