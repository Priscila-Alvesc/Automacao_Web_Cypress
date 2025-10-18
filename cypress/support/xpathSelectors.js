export const selectors = {
  loginEmail: '//*[@data-qa="login-email"]',
  loginPassword: '//*[@data-qa="login-password"]',
  loginButton: '//*[@data-qa="login-button"]',
  signupName: '//*[@data-qa="signup-name"]',
  signupEmail: '//*[@data-qa="signup-email"]',
  createAccount: '//*[@data-qa="create-account"]',
  contactName: '//*[@data-qa="name"]',
  contactEmail: '//*[@data-qa="email"]',
  contactSubject: '//*[@data-qa="subject"]',
  contactMessage: '//*[@data-qa="message"]',
  contactSubmit: '//*[@data-qa="submit-button"]',
};

// Optional BrowserStack observability helpers. Wrap in try/catch so local
// runs without the package installed don't fail webpack compilation.
try {
  // eslint-disable-next-line global-require
  require('browserstack-cypress-cli/bin/testObservability/cypress');
} catch (err) {
  // ignore optional dependency
}
