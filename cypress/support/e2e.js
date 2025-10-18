//cypress/support/e2e.js
// The BrowserStack test observability reporter is only required when
// running tests through BrowserStack's CLI. When running locally this
// package may not be installed, which would cause a webpack compilation
// error. Wrap the require in a try/catch so local runs keep working.
try {
	// eslint-disable-next-line global-require
	require('browserstack-cypress-cli/bin/testObservability/cypress-browserstack-reporter');
} catch (err) {
	// Optional dependency missing — ignore so local Cypress runs don't fail.
	// If you need BrowserStack reporting, install the package and run via BrowserStack.
	// console.info('BrowserStack reporter not loaded:', err.message);
}

// Importa e registra os comandos do plugin cypress-xpath
require('cypress-xpath');

// Importa os comandos customizados do arquivo commands.js
import './commands';