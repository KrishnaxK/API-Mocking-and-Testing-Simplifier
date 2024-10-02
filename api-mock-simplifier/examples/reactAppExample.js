const React = require('react');
const { useEffect, useState } = require('react');
const axios = require('axios');
const { initializeMocking } = require('mock-ease');

initializeMocking();

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

module.exports = Users;
