const axios = require('axios');
const { mockEngine } = require('../mocking/mockEngine');

function setupAxiosInterceptor() {
  axios.interceptors.request.use(async (config) => {
    const mockedResponse = await mockEngine(config.url, config.method, config.data);
    if (mockedResponse) {
      return Promise.resolve({
        ...config,
        data: mockedResponse,
        status: mockedResponse.status || 200,
      });
    }
    return config;
  });
}

module.exports = { setupAxiosInterceptor };
