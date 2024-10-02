const { resetMocks, mockAPI } = require('../index');

function setupJestMocks() {
  beforeEach(() => {
    resetMocks();
  });
}

function mockApiForJest(endpoint, method, response) {
  mockAPI(endpoint, { method, response });
}

module.exports = { setupJestMocks, mockApiForJest };
