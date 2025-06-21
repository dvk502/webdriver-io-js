import 'dotenv/config';
import { WebDriverLogTypes } from '@wdio/types/build/Options';
// import { addIssueLinkToDescription } from "@reporter/AllureDecorators";
// import { generateAllureReport, removeAllureDirectories } from '@reporter/AllureReporter';

const path = require('path');
// const sharedState = require('@reporter/SharedState')
const logLevel = (process.env.LOG_LVL || 'silent') as WebDriverLogTypes;

export const config: WebdriverIO.Config = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true
    }
  },

  specFileRetries: Number(process.env.RETRIES) || 0,

  maxInstances: Number(process.env.MAX_INSTANCES) || 1,
  logLevels: {
    webdriver: logLevel
  },
  port: 4723,
  path: '/wd/hub',
  hostname: 'localhost',
  services: ['appium'],
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': `${process.env.DEVICE_NAME}`,
      'appium:udid': process.env.UDID || '',
      'appium:appPackage': `${process.env.APP}`,
      'appium:appActivity': `${process.env.APP}.MainActivity`,
      'appium:automationName': 'UiAutomator2',
      'appium:platformVersion': process.env.PLATFORM_VERSION, 
      'appium:autoGrantPermissions': true,
      'appium:ignoreUnimportantViews': true,
      'appium:ensureWebviewsHavePages': true,
      'appium:nativeWebScreenshot': true,
      'appium:newCommandTimeout': 3600,
      'appium:connectHardwareKeyboard': true
    }
  ],

  bail: 0,
  waitforTimeout: 30000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 0,

  suites: {
    orchard_all_test: ['./tests/*.spec.ts']
  },

  // reporters: [
  //   [
  //     'spec',
  //     {
  //       symbols: {
  //         passed: '[PASS]',
  //         failed: '[FAIL]'
  //       },
  //       onlyFailures: true,
  //       addConsoleLogs: true,
  //       realtimeReporting: true,
  //       showPreface: false
  //     }
  //   ]
  // ['allure', {
  //     outputDir: 'allure-results',
  //     disableWebdriverStepsReporting: true,
  //     disableWebdriverScreenshotsReporting: false,
  // }],
  // ],

  mochaOpts: {
    ui: 'bdd',
    timeout: 5 * 60 * 1000 // 5min
  }

  // async onPrepare() {
  //     removeAllureDirectories();
  // },

  //     async beforeTest(test) {
  //         sharedState.clearScreenshots();

  //         const testName = test.title;
  //         if (testName.includes('[ISSUE => ')) {
  //             const issueMatch = testName.match(/\[ISSUE => (\S+)]/);
  //             if (issueMatch) addIssueLinkToDescription(issueMatch[1]);
  //         }
  //     },

  //     async afterTest(test, context, { error }) {
  //         if (error) {
  //             const screenshot = await driver.takeScreenshot();
  //             sharedState.setScreenshot(test.title, screenshot)
  //         }
  //     },

  //     async onComplete() {
  //         await generateAllureReport();
  //     }
};
