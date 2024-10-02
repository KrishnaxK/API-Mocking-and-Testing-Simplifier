
# API Mocking and Testing Simplifier

API Mocking and Testing Simplifier is a lightweight and flexible tool for mocking HTTP requests and testing APIs in Node.js projects. This package helps developers create API mocks for testing without hitting real endpoints, enabling faster and more isolated unit and integration tests.

## Features

- Mock HTTP requests for `GET`, `POST`, `PUT`, `DELETE`, etc.
- Supports custom headers and query parameters.
- Simple and flexible syntax for setting up API mocks.
- Easily switch between real and mocked APIs.
- Error handling for common HTTP status codes.
- Perfect for unit and integration testing with Jest.

## Installation

To install the package, use npm:

```bash
npm install api-mock-simplifier
```

Additionally, you need `axios` and `jest` for HTTP handling and testing:

```bash
npm install axios jest axios-mock-adapter
```

## Usage

Here’s how to use the API Mocking and Testing Simplifier in your tests:

### Setting up Mocks for HTTP Requests

The package simplifies API mocking by intercepting HTTP requests using `axios` and `axios-mock-adapter`.

```javascript
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

// Create a new mock instance
const mock = new MockAdapter(axios);

// Mocking a GET request to /api/users
mock.onGet('/api/users').reply(200, {
  users: [{ id: 1, name: 'Alice' }],
});

// Making a GET request using axios
axios.get('/api/users').then(response => {
  console.log(response.data.users); // [{ id: 1, name: 'Alice' }]
});
```

### Example: Jest Unit Test

You can use this package with Jest to mock APIs and perform tests.

```javascript
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

  test('should mock GET request to /api/users', async () => {
    mock.onGet('/api/users').reply(200, { users: [{ id: 1, name: 'Alice' }] });

    const response = await axios.get('/api/users');
    expect(response.data.users).toEqual([{ id: 1, name: 'Alice' }]);
  });

  test('should mock POST request to /api/users', async () => {
    const newUser = { id: 2, name: 'Bob' };
    mock.onPost('/api/users').reply(201, newUser);

    const response = await axios.post('/api/users', newUser);
    expect(response.status).toBe(201);
    expect(response.data).toEqual(newUser);
  });
});
```

### Mocking Different HTTP Methods

You can mock various HTTP methods like `POST`, `PUT`, and `DELETE`.

```javascript
// Mock POST request
mock.onPost('/api/users').reply(201, { id: 2, name: 'Bob' });

// Mock PUT request
mock.onPut('/api/users/2').reply(200, { id: 2, name: 'Bob Updated' });

// Mock DELETE request
mock.onDelete('/api/users/2').reply(204);
```

### Handling Errors

You can easily mock error responses, such as 404 or 500 status codes.

```javascript
// Mock 404 error for GET request
mock.onGet('/api/users/999').reply(404);

// Mock 500 error for POST request
mock.onPost('/api/users').reply(500);
```

### Switching Between Mocked and Real APIs

If you want to test using real APIs and switch back to mock APIs when necessary, you can reset or disable the mocks:

```javascript
// Disable all mocks
mock.restore();
```

## File Structure

Here’s the recommended file structure for organizing your project:

```
api-mock-simplifier/
│
├── src/
│   ├── interceptors/
│   │   ├── axiosInterceptor.js     # Axios interceptor for API requests
│   │   └── fetchInterceptor.js     # Fetch interceptor for API requests
│   ├── mocking/
│   │   ├── schemaMocker.js         # Schema-based mocking for API responses
│   │   └── mockEngine.js           # Core engine for mocking
│   └── index.js                    # Main entry point for setting up mocking
│
├── tests/
│   └── mockAPITest.spec.js         # Jest test cases for mocking APIs
│
├── package.json                    # NPM configuration file
└── README.md                       # Documentation
```

## Contributions

Contributions are welcome! Feel free to open issues or submit pull requests if you have suggestions, improvements, or bug fixes.

### To contribute:

1. Fork the repo.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.


### Key Sections Covered:
1. **Features**: Briefly describes the key capabilities of your package.
2. **Installation**: Explains how to install the package along with its dependencies.
3. **Usage**: Shows how to set up API mocks with `axios` and `axios-mock-adapter`.
4. **Examples**: Detailed examples for different HTTP methods and handling errors.
5. **File Structure**: Describes how the package is organized.
6. **Contributions**: Instructions for contributing to the project.


Feel free to adapt the content as per your project-specific needs!
