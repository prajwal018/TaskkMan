// tests/tasks.test.js
const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');

test('Should create a new task', async () => {
  await request(app)
    .post('/tasks')
    .send({
      title: 'Test Task',
      description: 'This is a test task.',
      status: 'pending',
    })
    .expect(201);
});
