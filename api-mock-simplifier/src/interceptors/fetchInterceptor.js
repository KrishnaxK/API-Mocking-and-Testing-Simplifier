const { mockEngine } = require('../mocking/mockEngine');

function setupFetchInterceptor() {
  const originalFetch = window.fetch;
  
  window.fetch = async (url, options = {}) => {
    const mockedResponse = await mockEngine(url, options.method || 'GET', options.body);
    if (mockedResponse) {
      return new Response(JSON.stringify(mockedResponse), {
        status: mockedResponse.status || 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return originalFetch(url, options);
  };
}

module.exports = { setupFetchInterceptor };
