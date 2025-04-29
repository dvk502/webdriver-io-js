# Mobile Automation Tests with WebdriverIO + Mocha + Appium

This project contains a mobile automation testing framework built with WebdriverIO, Mocha, and Appium. It supports Allure reporting, ESLint linting, and Prettier formatting to ensure a clean and maintainable codebase

## Table of Contents

- Project Structure
- Setup Instructions
- Running Tests
- Generating Allure Reports
- Linting and Formatting
- Environment Variables

## Project Structure

```
src/
├── apk/                                                # APK file for testing
│   └── app-debug.apk
├── commands/                                           # Custom helper commands
│   └── step.js
├── pages/                                              # Page Object Models
│   ├── cartPage.js
│   ├── prodcutPage.js
│   ├── loginPage.js
│   └── webViewPage.js
├── scripts/                                            # Utility scripts
│   └── clearReporter.sh
├── utils/                                              # Utility functions
│   ├── constants.js
│   └── helper.js

tests/
└── login.spec.js                                       # Tests for login area
└── cart.spec.js                                        # Tests for cart area
└── product.spec.js                                     # Test specifications
└── webView.spec.js                                     # Test specifications


.eslintrc, .eslintignore, .prettierrc, .prettierignore  # Linter and formatter configs
.env, .env.example                                      # Environment variable examples
wdio.conf.js                                            # WebdriverIO configuration
package.json                                            # Project metadata and scripts
```

## Setup Instructions

1. Install dependencies
   ```bash
   npm install
   ```
2. Configure environment variables:
   - Copy .env.example to .env
   - Fill in necessary values (e.g., device name, Appium server URL)

## Running Tests

Run all tests using:

```bash
npm run wdio:run
```

This will start the Appium server and execute the test suite.

## Generating Allure Reports

1. Run tests to collect Allure results:
   ```bash
   npm run wdio:run
   ```
2. Generate and open the Allure report:
   ```bash
   npm run allure:generate && npm run allure:open
   ```
   - Report results are stored under allure-results/
   - HTML reports are generated under allure-report/

## Linting and Formatting

- Lint the project:
  ```bash
  npm run lint
  ```
- Format files with Prettier:
  ```bash
  npm run prettier
  ```

## Environment Variables

The `.env` file contains configuration like:

```.dotenv
DEVICE_NAME=
PLATFORM_VERSION=
AUTOMATION_DRIVER_NAME=
LOG_LEVEL=info
RETRIES=1
TEST_USERNAME=
DEFAULT_TIMEOUT=15000
```

Refer to .env.example for a template
