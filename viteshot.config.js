/* eslint-disable no-undef */
const playwrightShooter = require('viteshot/shooters/playwright');
const playwright = require('playwright');

module.exports = {
  framework: {
    type: 'react',
  },
  shooter: playwrightShooter(playwright.chromium, {
    contexts: {
      laptop: {
        viewport: {
          width: 1366,
          height: 768,
        },
      },
      pixel2: playwright.devices['Pixel 2'],
    },
  }),
  filePathPattern: '**/*.screenshot.@(tsx|jsx)',
};
