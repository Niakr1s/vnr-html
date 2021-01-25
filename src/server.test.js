const { startServer } = require('./server');

const server = startServer();

beforeAll(async () => {
  await server
})

test('1', () => {
  expect(5).toEqual(5);
})