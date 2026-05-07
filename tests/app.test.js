const request = require('supertest');
const { app, todos } = require('../src/app');

// Clear todos before each test
beforeEach(() => {
    todos.length = 0;
});

test('GET /todos returns empty array initially', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
});

test('POST /todos adds a new todo', async () => {
    const res = await request(app)
        .post('/todos')
        .send({ task: 'Buy groceries' });
    expect(res.statusCode).toBe(201);
    expect(res.body.todos).toContain('Buy groceries');
});

test('DELETE /todos/:index removes a todo', async () => {
    todos.push('Buy groceries');
    const res = await request(app).delete('/todos/0');
    expect(res.statusCode).toBe(200);
    expect(res.body.todos).toHaveLength(0);
});