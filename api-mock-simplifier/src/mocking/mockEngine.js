const { mockConfig } = require('./mockConfig');
const { delay } = require('../utils/delay');
const { schemaMocker } = require('./schemaMocker');

async function mockEngine(url, method = 'GET', body = null) {
  const mock = mockConfig.find((m) => m.url === url && m.method.toUpperCase() === method.toUpperCase());

  if (!mock) return null;  // No mock defined for this endpoint

  // Simulate network delay
  if (mock.delay) await delay(mock.delay);

  // Return either the response or dynamic schema-based data
  if (mock.schema) {
    return schemaMocker(mock.schema);  // generate based on schema
  }
  
  return mock.response || {};
}

module.exports = { mockEngine };
