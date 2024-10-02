const { faker } = require('@faker-js/faker');

function schemaMocker(schema) {
  // Example schema-based mock generation
  if (schema === 'user') {
    return {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
    };
  }
  // Add more schema mockers as needed
  return {};
}

module.exports = { schemaMocker };
