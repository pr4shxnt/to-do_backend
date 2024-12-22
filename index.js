// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0/test');

// Add task
app.post('/add', (req, res) => {
  const task = req.body.task;

  TodoModel.create({ task: task })
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err));
});

// Get all tasks
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err));
});

// Mark task as completed
app.put('/update/:id', (req, res) => {
  TodoModel.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  )
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err));
});

// Delete task
app.delete('/delete/:id', (req, res) => {
  TodoModel.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Task deleted' }))
    .catch(err => res.status(400).json(err));
});

app.listen(5000, () => {
  console.log("Running at 5000");
});
