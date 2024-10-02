const express = require('express');
const { initializeMocking } = require('mock-ease');

const app = express();
initializeMocking();

app.get('/api/users', (req, res) => {
  res.json({ message: 'Real API response here' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
