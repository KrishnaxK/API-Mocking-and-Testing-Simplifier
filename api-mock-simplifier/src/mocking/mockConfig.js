const mockConfig = [
  {
    url: '/api/users',
    method: 'GET',
    response: { users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] },
    delay: 1000,
  },
  {
    url: '/api/orders',
    method: 'POST',
    response: { orderId: 123, status: 'success' },
    delay: 500,
  },
];

module.exports = { mockConfig };
