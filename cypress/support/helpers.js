export function getPass(){
    return '12345'
}

// Optional BrowserStack observability helpers. Wrap in try/catch so local
// runs without the package installed don't fail webpack compilation.
try {
    // eslint-disable-next-line global-require
    require('browserstack-cypress-cli/bin/testObservability/cypress');
} catch (err) {
    // ignore optional dependency
}
