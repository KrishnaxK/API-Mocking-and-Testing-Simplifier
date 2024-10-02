function logRequest(url, method, response) {
  console.log(`Mocked API Request -> URL: ${url}, Method: ${method}, Response:`, response);
}

module.exports = { logRequest };
