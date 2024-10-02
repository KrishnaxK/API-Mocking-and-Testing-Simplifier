const { setupAxiosInterceptor } = require('./interceptors/axiosInterceptor');
const { setupFetchInterceptor } = require('./interceptors/fetchInterceptor');
const { mockConfig } = require('./mocking/mockConfig');

function mockAPI(url, config) {
  mockConfig.push({
    url,
    method: config.method || 'GET',
    response: config.response || {},
    delay: config.delay || 0,
  });
}

function resetMocks() {
  mockConfig.length = 0;
}

function initializeMocking(mode = 'development') {
  if (mode === 'development') {
    setupAxiosInterceptor();
    setupFetchInterceptor();
  }
}

module.exports = { mockAPI, resetMocks, initializeMocking };
