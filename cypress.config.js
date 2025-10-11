const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: { charts: true, reportDir: 'cypress/reports', overwrite: true, html: true, json: true, timestamp: 'ddmmyyyy_HHMMss' },
});
