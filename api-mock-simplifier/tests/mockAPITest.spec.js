const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Initialize the mock adapter before each test
let mock;
beforeEach(() => {
  mock = new MockAdapter(axios);
});

// Reset the mock after each test
afterEach(() => {
  mock.reset();
});

describe('API Mocking Tests', () => {
  test('should mock GET request to /api/users', async () => {
    mock.onGet('/api/users').reply(200, {
      users: [{ id: 1, name: 'Alice' }],
    });

    const response = await axios.get('/api/users');

    expect(response.status).toBe(200);
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

  test('should mock PUT request to /api/users/2', async () => {
    const updatedUser = { id: 2, name: 'Bob Updated' };
    mock.onPut('/api/users/2').reply(200, updatedUser);

    const response = await axios.put('/api/users/2', updatedUser);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(updatedUser);
  });

  test('should mock DELETE request to /api/users/2', async () => {
    mock.onDelete('/api/users/2').reply(204);

    const response = await axios.delete('/api/users/2');

    expect(response.status).toBe(204);
  });

  test('should mock multiple responses for GET request to /api/users', async () => {
    const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    mock.onGet('/api/users').replyOnce(200, users);

    const response1 = await axios.get('/api/users');
    expect(response1.data).toEqual(users);

    // You can set up different responses for the same endpoint
    const newUsers = [{ id: 3, name: 'Charlie' }];
    mock.onGet('/api/users').replyOnce(200, newUsers);

    const response2 = await axios.get('/api/users');
    expect(response2.data).toEqual(newUsers);
  });

  test('should handle custom headers in GET request', async () => {
    // Set up the mock without specifying headers in the onGet call
    mock.onGet('/api/users').reply((config) => {
      // Check if the Authorization header is set correctly
      if (config.headers.Authorization === 'Bearer token') {
        return [200, { users: [{ id: 1, name: 'Alice' }] }];
      } else {
        return [401]; // Return unauthorized if the header doesn't match
      }
    });

    // Send the request with custom headers
    const response = await axios.get('/api/users', {
      headers: {
        Authorization: 'Bearer token',
      }
    });

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.data.users).toEqual([{ id: 1, name: 'Alice' }]);
  });

  test('should handle query parameters in GET request', async () => {
    mock.onGet('/api/users', { params: { page: 2 } }).reply(200, {
      users: [{ id: 1, name: 'Alice' }],
      page: 2
    });

    const response = await axios.get('/api/users', {
      params: { page: 2 }
    });

    expect(response.status).toBe(200);
    expect(response.data.page).toBe(2);
    expect(response.data.users).toEqual([{ id: 1, name: 'Alice' }]);
  });
});
