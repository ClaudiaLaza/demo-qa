const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  scrollBehavior: 'center',
  defaultCommandTimeout: 15000,
  watchForFileChanges: false,
  video: false,
  screenshotOnRunFailure: true,
  chromeWebSecurity: false,
  defaultBrowser: 'chrome',
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    baseUrl: 'https://demoqa.com',
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      reporterEnabled: 'mochawesome',
      mochawesomeReporterOptions: {
        reportDir: 'cypress/reports/mocha',
        quite: true,
        overwrite: false,
        html: false,
        json: true,
      },
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
