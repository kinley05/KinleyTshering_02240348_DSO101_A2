const express = require('express');
const app = express();

app.use(express.json());

const todos = [];

// Add a todo
app.post('/todos', (req, res) => {
    const { task } = req.body;
    todos.push(task);
    res.status(201).json({ message: 'Todo added', todos });
});

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Delete a todo
app.delete('/todos/:index', (req, res) => {
    const index = parseInt(req.params.index);
    todos.splice(index, 1);
    res.json({ message: 'Todo deleted', todos });
});

module.exports = { app, todos };

// Only start server if run directly
if (require.main === module) {
    app.listen(3000, () => console.log('Server running on port 3000'));
}