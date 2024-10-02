const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('API Mocking Tests', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  // GET request tests
  test('should mock GET request to /api/users', async () => {
    mock.onGet('/api/users').reply(200, {
      users: [{ id: 1, name: 'Alice' }],
    });

    const response = await axios.get('/api/users');
    expect(response.data.users).toEqual([{ id: 1, name: 'Alice' }]);
  });

  test('should handle 404 error for GET request to /api/users/999', async () => {
    mock.onGet('/api/users/999').reply(404);

    try {
      await axios.get('/api/users/999');
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  // POST request tests
  test('should mock POST request to /api/users', async () => {
    const newUser = { id: 2, name: 'Bob' };
    mock.onPost('/api/users').reply(201, newUser);

    const response = await axios.post('/api/users', newUser);
    expect(response.status).toBe(201);
    expect(response.data).toEqual(newUser);
  });

  test('should handle 500 error for POST request to /api/users', async () => {
    mock.onPost('/api/users').reply(500);

    try {
      await axios.post('/api/users', { name: 'Charlie' });
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });

  // PUT request tests
  test('should mock PUT request to /api/users/2', async () => {
    const updatedUser = { id: 2, name: 'Bob Updated' };
    mock.onPut('/api/users/2').reply(200, updatedUser);

    const response = await axios.put('/api/users/2', updatedUser);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(updatedUser);
  });

  // DELETE request tests
  test('should mock DELETE request to /api/users/2', async () => {
    mock.onDelete('/api/users/2').reply(204);

    const response = await axios.delete('/api/users/2');
    expect(response.status).toBe(204);
  });

  // Multiple responses for the same endpoint
  test('should mock multiple responses for GET request to /api/users', async () => {
    mock.onGet('/api/users').replyOnce(200, {
      users: [{ id: 1, name: 'Alice' }],
    });

    let response = await axios.get('/api/users');
    expect(response.data.users).toEqual([{ id: 1, name: 'Alice' }]);

    mock.onGet('/api/users').reply(200, {
      users: [{ id: 2, name: 'Bob' }],
    });

    response = await axios.get('/api/users');
    expect(response.data.users).toEqual([{ id: 2, name: 'Bob' }]);
  });

  // Test custom headers
  test('should handle custom headers in GET request', async () => {
    mock.onGet('/api/users', {
      headers: {
        Authorization: 'Bearer token',
        // Include any other headers that Axios might add
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Axios/0.27.2'
      }
    }).reply(200, {
      users: [{ id: 1, name: 'Alice' }],
    });
  
    const response = await axios.get('/api/users', {
      headers: {
        Authorization: 'Bearer token',
        // Include any other headers that you expect
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Axios/0.27.2'
      }
    });

  // Test query parameters
  test('should handle query parameters in GET request', async () => {
    mock.onGet('/api/users', { params: { active: true } }).reply(200, {
      users: [{ id: 1, name: 'Alice', active: true }],
    });

    const response = await axios.get('/api/users', { params: { active: true } });
    expect(response.data.users).toEqual([{ id: 1, name: 'Alice', active: true }]);
  });
});